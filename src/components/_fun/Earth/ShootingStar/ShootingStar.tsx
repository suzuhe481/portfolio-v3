import { Vector3, Mesh, Camera } from "three";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Trail } from "@react-three/drei";

function getRandomStartEndPositions(camera: Camera) {
  // Pick a random offset from the camera's view direction
  const forward = new Vector3();
  camera.getWorldDirection(forward); // normalized direction

  // Random sideways offset (to make variety)
  const right = new Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
  const up = new Vector3(0, 1, 0).applyQuaternion(camera.quaternion);

  const sidewaysOffset = right.multiplyScalar((Math.random() - 0.5) * 20);
  const upOffset = up.multiplyScalar((Math.random() - 0.5) * 20);

  // Start position: a bit ahead of the camera, but offset
  const startPos = camera.position
    .clone()
    .add(forward.clone().multiplyScalar(50)) // 50 units in front
    .add(sidewaysOffset)
    .add(upOffset);

  // Target position: further along the forward vector
  const targetPos = startPos.clone().add(forward.clone().multiplyScalar(-100)); // flies across view

  return { startPos, targetPos };
}

/**
 * Generates shooting stars moving in random directions.
 *
 * @returns {React.ReactElement} A React element representing a shooting star.
 */
const ShootingStar = () => {
  const ref = useRef<Mesh | null>(null);
  const { camera } = useThree();

  let { startPos, targetPos } = getRandomStartEndPositions(camera);

  const currPos = new Vector3().copy(startPos);

  const starTimeDuration = 2;
  let elapsedTime = -1;

  // Assigns a random start and end position to assign as the path
  // for the shooting star to travel along
  useFrame((_, delta) => {
    if (!ref.current) return;

    const { position } = ref.current;

    elapsedTime += delta;
    currPos.lerpVectors(startPos, targetPos, elapsedTime / starTimeDuration);
    position.copy(currPos);
    if (elapsedTime >= starTimeDuration) {
      const newPositions = getRandomStartEndPositions(camera);

      startPos = newPositions.startPos;
      targetPos = newPositions.targetPos;
      currPos.copy(startPos);
      position.copy(startPos);

      elapsedTime = -1;
    }
  });

  return (
    <Trail
      width={0.5}
      color={0xffffff}
      length={1}
      attenuation={(width) => width * Math.random()}
    >
      <mesh ref={ref} position={startPos}>
        <sphereGeometry args={[0.03, 32]} />
        <meshBasicMaterial />
      </mesh>
    </Trail>
  );
};

export default ShootingStar;
