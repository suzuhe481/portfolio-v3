import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { Trail } from "@react-three/drei";

/**
 * Generates a satellite moving in a circle around the Earth.
 *
 * @returns {React.ReactElement} A React element representing a satellite.
 */
const Satellite = () => {
  const shootingStarRef = useRef<Mesh | null>(null);
  const radius = 2.05;
  let currentTime = 0;

  useFrame((_, delta) => {
    if (shootingStarRef.current == null) return;
    currentTime += delta * 2;

    shootingStarRef.current.position.x = Math.cos(currentTime) * radius;
    shootingStarRef.current.position.z = Math.sin(currentTime) * radius;
  });

  return (
    <Trail width={0.3} color={0xff9900} length={3} attenuation={(val) => val}>
      <mesh ref={shootingStarRef} position-y={0.15}>
        <sphereGeometry args={[0.02, 4]} />
        <meshStandardMaterial color={"orange"} />
      </mesh>
    </Trail>
  );
};

export default Satellite;
