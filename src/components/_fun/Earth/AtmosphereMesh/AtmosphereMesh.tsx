import { Color, AdditiveBlending } from "three";

/**
 * The following variables vs and fs are used in rendering the AtmosphereMesh component.
 * Do not edit.
 */
const vs = `
  uniform float fresnelBias;
  uniform float fresnelScale;
  uniform float fresnelPower;
  
  varying float vReflectionFactor;
  
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  
    vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
  
    vec3 I = worldPosition.xyz - cameraPosition;
  
    vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );
  
    gl_Position = projectionMatrix * mvPosition;
  }
  `;

const fs = `
  uniform vec3 color1;
  uniform vec3 color2;
  
  varying float vReflectionFactor;
  
  void main() {
    float f = clamp( vReflectionFactor, 0.0, 1.0 );
    gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
  }
  `;

function getFresnelShaderArgs({
  rimHex = 0x0088ff,
  facingHex = 0x000000,
} = {}) {
  const uniforms = {
    color1: { value: new Color(rimHex) },
    color2: { value: new Color(facingHex) },
    fresnelBias: { value: 0.1 },
    fresnelScale: { value: 1.0 },
    fresnelPower: { value: 4.0 },
  };

  const args = {
    uniforms: uniforms,
    vertexShader: vs,
    fragmentShader: fs,
    transparent: true,
    blending: AdditiveBlending,
    // wireframe: true,
  };
  return args;
}

/**
 * A mesh that renders a sphere with a Fresnel shader effect.
 *
 * The Fresnel shader takes two colors, rimHex and facingHex, and calculates a
 * gradient between them based on the angle of incidence of the camera relative
 * to the surface normal of the sphere. The result is a rim lit effect that gives
 * the sphere a subtle glow.
 *
 * @param {number} [rimHex=0x0088ff] The color of the rim of the sphere.
 * @param {number} [facingHex=0x000000] The color of the facing side of the sphere.
 * @param {number} [radius=2.03] The radius of the sphere.
 *
 * @example
 * <AtmosphereMesh rimHex={0x0088ff} facingHex={0x000000} />
 */
const AtmosphereMesh = ({
  rimHex,
  facingHex,
  radius = 2.03,
}: {
  rimHex?: number;
  facingHex?: number;
  radius?: number;
}) => {
  const args = getFresnelShaderArgs({ rimHex, facingHex });

  return (
    <mesh>
      <icosahedronGeometry args={[radius, 32]} />
      <shaderMaterial {...args} />
    </mesh>
  );
};

export default AtmosphereMesh;
