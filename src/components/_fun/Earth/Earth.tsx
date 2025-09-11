"use client";

// Libraries
import { Vector3, MathUtils, NoToneMapping } from "three";
import { Mesh } from "three";
import { useRef, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OrbitControls as IOrbitControlsProps } from "three-stdlib";
import { motion } from "motion/react";

// Components
import Nebula from "./Nebula/Nebula";
import Starfield from "./Starfield/Starfield";
import AtmosphereMesh from "./AtmosphereMesh/AtmosphereMesh";
import EarthMaterial from "./EarthMaterial/EarthMaterial";
import ShootingStar from "./ShootingStar/ShootingStar";
import Satellite from "./Satellite/Satellite";
import MarkersLayer from "./MarkersLayer/MarkersLayer";

import { useTravelContext } from "@/hooks/useTravelContext";

// Prevents rerendering of starfield and nebula to keep them in the same locations.
const MemoizedStarfield = memo(Starfield);
const MemoizedNebula = memo(Nebula);

/**
 * Renders a rotating Earth mesh with atmosphere, markers and day/night cycle.
 * Creates the Earth mesh with options to show a day/night version and a high quality version.
 *
 * @param {{ earthSettings: IEarthSettingsProps }} props
 * @returns {JSX.Element} A <mesh /> element containing the Earth mesh.
 */
const EarthMesh = () => {
  const earthMeshRef = useRef<Mesh | null>(null);

  const { earthSettings } = useTravelContext();

  const {
    startRotation,
    showDayNight,
    showAtmosphere,
    hideMarkers,
    showHighQuality,
  } = earthSettings;

  // Autorotates earth when enabled
  useFrame(() => {
    if (!earthMeshRef.current) return;

    if (startRotation) {
      earthMeshRef.current.rotation.y += 0.002;
    }
  });

  const atmosphereRadius = 1.5 * 1.02;

  return (
    <mesh ref={earthMeshRef}>
      <icosahedronGeometry args={[1.5, 32]} />
      <EarthMaterial
        showDayNight={showDayNight}
        showHighQuality={showHighQuality}
      />
      {showAtmosphere && <AtmosphereMesh radius={atmosphereRadius} />}
      {!hideMarkers && <MarkersLayer earthMeshRef={earthMeshRef} />}
    </mesh>
  );
};

/**
 * A custom implementation of OrbitControls that changes the camera speed based on the camera distance to the earth.
 * The closer the camera is to the earth, the slower the camera speed is.
 *
 * @returns A JSX element that renders OrbitControls.
 */
const CustomOrbitControls = () => {
  const orbitControlsRef = useRef<IOrbitControlsProps | null>(null);

  useFrame(() => {
    if (orbitControlsRef.current) {
      const distance = orbitControlsRef.current.object.position.length();

      // Camera speed thresholds and distances
      const closeDistanceThreshold = 1.6;
      const farDistanceThreshold = 5;
      const closeSpeed = 0.08;
      const farSpeed = 0.8;

      // Adjusts speed based on camera distance
      if (distance < 1.7) {
        // Slow camera speed when very close
        orbitControlsRef.current.rotateSpeed = 0.03;
      } else if (distance > 5) {
        // Fast camera speed when very far
        orbitControlsRef.current.rotateSpeed = 0.8;
      } else {
        // Formulate to calculate camera speed when between the close and far distance thresholds.
        orbitControlsRef.current.rotateSpeed = MathUtils.clamp(
          MathUtils.mapLinear(
            distance,
            closeDistanceThreshold,
            farDistanceThreshold,
            closeSpeed,
            farSpeed
          ),
          closeSpeed,
          farSpeed
        );
      }
    }
  });

  // Exposing orbitControls to parent
  useThree((state) => {
    state.controls = orbitControlsRef.current;
  });

  return (
    <OrbitControls
      ref={orbitControlsRef}
      makeDefault
      enablePan={false}
      dampingFactor={0.1}
      rotateSpeed={0.5}
      minDistance={1.6}
      maxDistance={1500}
    />
  );
};

/**
 * This component renders a canvas with an interactive globe.
 * The globe contains a starfield, nebula, mesh, shooting star, and satellite.
 * Most of of the components are able to be toggled on/off.
 * The globe can be toggled to show day/night.
 * The globe can be minimized.
 */
export const Earth = () => {
  const { earthSettings } = useTravelContext();

  const { minimizeEarth, showShootingStar, showSatellite } = earthSettings;

  const defaultCameraPosition = new Vector3(-3, 3, 1); // Default position looking at Europe

  return (
    <motion.div
      initial={{ height: minimizeEarth ? 0 : "500px" }}
      animate={{ height: minimizeEarth ? 0 : "500px" }}
    >
      <Canvas
        gl={{ toneMapping: NoToneMapping }}
        style={{ background: "#000" }}
        camera={{ position: defaultCameraPosition, fov: 50 }} //
      >
        <EarthMesh />
        <hemisphereLight args={[0xffffff, 0x000000, 1.0]} />
        <MemoizedNebula />
        <MemoizedStarfield />
        {showSatellite && <Satellite />}
        {showShootingStar && <ShootingStar />}
        <CustomOrbitControls />
        <ambientLight intensity={1.7} />
        <directionalLight position={[10, 10, 5]} intensity={0.7} />
      </Canvas>
    </motion.div>
  );
};

export default Earth;
