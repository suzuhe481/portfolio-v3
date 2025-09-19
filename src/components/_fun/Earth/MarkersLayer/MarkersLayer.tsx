"use client";

import { Vector3, Group, Mesh, Camera } from "three";
import {
  useState,
  useEffect,
  useRef,
  useMemo,
  RefObject,
  CSSProperties,
} from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls as IOrbitControlsProps } from "three-stdlib";
import { Html } from "@react-three/drei";
import { motion, useMotionValue } from "framer-motion";
import { useTravelContext } from "@/hooks/useTravelContext";

import { travelData } from "@/data/travelData";
import { IEarthMarker } from "@/types";

const DOUBLE_CLICK_DELAY = 300; // Delay between click and double click, in ms.

export const MarkersLayer = ({
  earthMeshRef,
}: {
  earthMeshRef: RefObject<Mesh | null>;
}) => {
  const { camera, controls } = useThree<{
    camera: Camera;
    controls: IOrbitControlsProps;
  }>();

  // Initializes which markers are visible depending on current zoom level
  const [visibleMarkers, setVisibleMarkers] = useState<IEarthMarker[] | []>(
    () => {
      const distance = camera.position.length();

      if (distance > 10) {
        return [];
      } else if (distance > 3) {
        return travelData.groups;
      } else {
        return [...travelData.cities];
      }
    }
  );

  // Adds event listener to handle which markers when zoom level changes
  useEffect(() => {
    if (!controls) return;

    // Handles which markers are visible depending on current zoom level
    const handleZoomChange = () => {
      const distance = camera.position.length();

      if (distance > 10) {
        setVisibleMarkers([]);
      } else if (distance > 3) {
        setVisibleMarkers(travelData.groups);
      } else {
        setVisibleMarkers([...travelData.cities]);
      }
    };

    controls.addEventListener("change", handleZoomChange);

    return () => {
      controls.removeEventListener("change", handleZoomChange);
    };
  }, [camera, controls]);

  return (
    <>
      {visibleMarkers.map((marker, i) => (
        <SvgMarker key={i} earthMeshRef={earthMeshRef} marker={marker} />
      ))}
    </>
  );
};

export default MarkersLayer;

/**
 * Converts a latitude and longitude pair to a THREE.Vector3 on the surface of a sphere,
 * given a radius.
 *
 * @param {number} lat - The latitude in degrees.
 * @param {number} lng - The longitude in degrees.
 * @param {number} radius - The radius of the sphere.
 * @returns {Vector3} A THREE.Vector3 representing the point on the sphere.
 */
function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180); // latitude to polar
  const theta = (lng + 180) * (Math.PI / 180); // longitude to azimuth

  return new Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    -radius * Math.sin(phi) * Math.sin(theta)
  );
}

const SvgMarker = ({
  earthMeshRef,
  marker,
}: {
  earthMeshRef: RefObject<Mesh | null>;
  marker: IEarthMarker;
}) => {
  const earthRadius = 1.5;
  const { lat, lng, type } = marker;

  const { camera, controls } = useThree<{
    camera: Camera;
    controls: IOrbitControlsProps;
  }>();

  // Refs
  const markerRef = useRef<Group>(null!);
  const markerSvgRef = useRef<HTMLDivElement | null>(null);
  const clickTimerRef = useRef<NodeJS.Timeout>(null);

  // Context values
  const { updateCountry, updateLocation } = useTravelContext();

  // States
  const [isHovered, setIsHovered] = useState(false);

  const opacity = useMotionValue(0);

  // Position before rotation
  const localPos = useMemo(() => {
    return latLngToVector3(lat, lng, earthRadius);
  }, [lat, lng]);

  // Gets the #earth-container element.
  // This gets used in the marker component so that it is contained within the bounds of the earth container
  // and not the entire page.
  const earthContainer = document.querySelector("#earth-container");

  // Controls the opacity of the marker depending on whether it's in view.
  // Fades the marker when approaching edges of earth.
  useFrame(() => {
    if (!earthMeshRef || !earthMeshRef.current || !markerRef.current) return;

    // Transform to world position based on Earth’s current rotation
    const worldPos = localPos
      .clone()
      .applyMatrix4(earthMeshRef.current.matrixWorld);

    // Dot product to check if marker is on visible side
    const dot = worldPos
      .clone()
      .normalize()
      .dot(camera.position.clone().normalize());

    const minOpacityThreshold = 0.5; // Opacity 0
    const maxOpacityThreshold = 0.6; // Opacity 1

    // Mapping dot product into an opacity range
    let alpha =
      (dot - minOpacityThreshold) / (maxOpacityThreshold - minOpacityThreshold);
    alpha = Math.min(Math.max(alpha, 0), 1);

    // Setting opacity with motionValue
    opacity.set(alpha);
  });

  // Updates stored location and country in travelContext.
  function handleMarkerClick() {
    // Clears current timer if it exists.
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }

    // Single click action performed after double click delay.
    clickTimerRef.current = setTimeout(() => {
      if (!isHovered) return;

      // Location Click - update country
      if (marker.type === "city") {
        const location = marker.name;
        updateLocation(location);

        const country = marker.parent;

        if (country !== undefined) {
          updateCountry(country);
        }
      }
      // Country Click - zoom in
      else {
        centerWorldOnMarker(camera, controls, markerRef);
      }
    }, DOUBLE_CLICK_DELAY);
  }

  // Centers the camera on the marker if double click is performed within the delay time.
  function handleMarkerDoubleClick() {
    // Cancel single click action
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }

    centerWorldOnMarker(camera, controls, markerRef);
  }

  // Returns a tailwind class string of a random color.
  function getRandomColor() {
    const randomColor = ["red", "white", "blue", "green"][
      Math.round(Math.random() * 3)
    ];

    switch (randomColor) {
      case "red":
        return "text-red-500";
      case "white":
        return "text-white";
      case "blue":
        return "text-sky-500";
      case "green":
        return "text-emerald-500";
      default:
        return "text-white";
    }
  }

  // useMemo required to avoid color changing on every render.
  const markerColor = useMemo(() => {
    return getRandomColor();
  }, []);

  const handleClickOutsideMarker = (event: MouseEvent) => {
    const target = event.target as Node;

    // If icon is clicked while modal is open,
    // Modal remains open.
    // Reason: Without this, modal will flash when clicking the icon.
    if (
      isHovered &&
      markerSvgRef.current &&
      markerSvgRef.current.contains(target)
    ) {
      // Does nothing
    }
    // If anywhere else on the page is clicked that isn't inside the menu, close the menu.
    else if (
      isHovered &&
      markerSvgRef.current &&
      !markerSvgRef.current.contains(target)
    ) {
      setIsHovered(false);
    }
  };

  // Adds/removes event listener for closing the Marker Modal on outside button click.
  useEffect(() => {
    const controller = new AbortController();

    document.addEventListener("mousedown", handleClickOutsideMarker, {
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  });

  return (
    <group ref={markerRef} position={localPos}>
      <Html
        center
        portal={
          earthContainer
            ? (earthContainer as unknown as RefObject<HTMLElement>)
            : undefined
        }
        zIndexRange={isHovered ? [500, 500] : [0, 0]}
      >
        <motion.div
          ref={markerSvgRef}
          style={{ cursor: "pointer", opacity }}
          onClick={handleMarkerClick}
          onDoubleClick={handleMarkerDoubleClick}
          whileHover={{ scale: 1.2 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onTapStart={() => {
            setTimeout(() => setIsHovered(true), 100);
          }}
          onTapCancel={() => setIsHovered(false)}
        >
          <MarkerIcon
            className={`relative z-10 ${markerColor} ${
              type === "group" ? "w-10" : "w-6"
            }`}
          />
        </motion.div>
      </Html>
      {/* The MarkerTitle is still absolutely positioned relative to the MarkerIcon
      because both Htmls share the same <group> and position. 
      An Html is anchored to the 3D position of its parent (<group>).
      So when projected into screen space, both Htmls are positioned at the same spot.
      But the absolute styles on MarkerTitle adjusts it's position. */}
      {isHovered && <MarkerTitle marker={marker} />}
    </group>
  );
};

interface ISVGProps {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const MarkerIcon = ({ className, style }: ISVGProps) => (
  <svg viewBox="-4 0 36 36" className={className} style={style}>
    <path
      fill="currentColor"
      d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"
    ></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>
);

/**
 * Displays a title for a marker on marker hover.
 *
 * @param {{ marker: IEarthMarker }} props
 * @returns {JSX.Element}
 */
const MarkerTitle = ({ marker }: { marker: IEarthMarker }) => {
  // Gets the #earth-container element.
  // This gets used in the marker component so that it is contained within the bounds of the earth container
  // and not the entire page.
  const earthContainer = document.querySelector("#earth-container");

  let location;
  let country;
  let title;

  if (marker.type === "city") {
    location = marker.name;
    country = marker.parent;
    title = `${location}, ${country}`;
  } else {
    country = marker.name;
    title = country;
  }

  return (
    <Html
      portal={
        earthContainer
          ? (earthContainer as unknown as RefObject<HTMLElement>)
          : undefined
      }
      // Will be a higher z index that the zIndexRange of the SvgMarker to
      // prevent it being hidden by other markers.
      zIndexRange={[1000, 1000]}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className={`absolute px-3 py-1 text-md border-b-1 left-1/2 -translate-x-1/2 font-bold border-slate-400 text-slate-600 bg-slate-100 rounded-lg shadow-md whitespace-nowrap bottom-full mb-2`}
      >
        {title}
      </motion.div>
    </Html>
  );
};

/**
 * Centers and slightly zooms in the camera on the marker by interpolating smoothly to a
 * position on the sphere.
 *
 * @param {Camera} camera - The THREE.Camera instance.
 * @param {IOrbitControlsProps} controls - The THREE.OrbitControls instance.
 * @param {RefObject<Group>} markerRef - The THREE.Group reference of the marker.
 */
function centerWorldOnMarker(
  camera: Camera,
  controls: IOrbitControlsProps,
  markerRef: RefObject<Group>
) {
  if (!markerRef.current) return;

  // World position of the marker
  const markerWorldPos = new Vector3();
  markerRef.current.getWorldPosition(markerWorldPos);

  // Vector from target (earth center) to marker
  const target = controls.target.clone(); // should be (0,0,0)
  const dirToMarker = markerWorldPos.clone().sub(target).normalize();

  // Distance from camera to target
  const radius = camera.position.distanceTo(target);

  // Zoom factor
  const zoomFactor = 0.8;

  // Compute desired camera position on sphere
  const desiredCameraPos = dirToMarker
    .multiplyScalar(radius * zoomFactor)
    .add(target);

  // Animate camera position
  // Instead of instant jump, interpolate smoothly
  let t = 0;
  function animate() {
    t += 0.04; // adjust speed
    camera.position.lerp(desiredCameraPos, t);
    camera.lookAt(target);
    controls.update();

    if (t < 1) requestAnimationFrame(animate);
  }
  animate();
}
