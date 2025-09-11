import { Vector3, TextureLoader, ShaderMaterial } from "three";
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";

const defaultSunDirection = new Vector3(-2, 0.5, 1.5).normalize();

/**
 * The following variables vs, fs, and simpleFs are used in rendering the EarthMaterial component.
 * Do not edit.
 */
const vs = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform sampler2D elevTexture;

    void main() {
      // Position
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * viewMatrix * modelPosition;

      // Model normal
      vec3 modelNormal = (modelMatrix * vec4(normal, 0.0)).xyz;

      // Varyings
      vUv = uv;
      vNormal = modelNormal;
      vPosition = modelPosition.xyz;
    }
  `;

const fs = `
    uniform sampler2D dayTexture;
    uniform sampler2D nightTexture;
    uniform sampler2D cloudsTexture;
    uniform vec3 sunDirection;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec3 viewDirection = normalize(vPosition - cameraPosition);
      vec3 normal = normalize(vNormal);
      vec3 color = vec3(0.0);

      // Sun orientation
      float sunOrientation = dot(sunDirection, normal);

      // Day / night color
      float dayMix = smoothstep(- 0.25, 0.5, sunOrientation);
      vec3 dayColor = texture(dayTexture, vUv).rgb;
      vec3 nightColor = texture(nightTexture, vUv).rgb;
      color = mix(nightColor, dayColor, dayMix);

      // Specular cloud color
      vec2 specularCloudsColor = texture(cloudsTexture, vUv).rg;

      // Clouds
      float cloudsMix = smoothstep(0.0, 1.0, specularCloudsColor.g);
      cloudsMix *= dayMix;
      color = mix(color, vec3(1.0), cloudsMix);

      // Specular
      vec3 reflection = reflect(- sunDirection, normal);
      float specular = - dot(reflection, viewDirection);
      // specular = max(specular, 0.0);
      // specular = pow(specular, 0.5);
      // specular *= specularCloudsColor.r;
      // color += specular * 0.5;
      
      // Final color
      gl_FragColor = vec4(color, 1.0);
    }
  `;

const simpleFs = `
    uniform sampler2D dayTexture;
    varying vec2 vUv;

    void main() {
      vec3 dayColor = texture2D(dayTexture, vUv).rgb;
      gl_FragColor = vec4(dayColor, 1.0);
    }
  `;

const SimpleDayNightEarthMat = (sunDirection = defaultSunDirection) => {
  const map = useLoader(TextureLoader, "/earth/textures/earth-daymap.jpg");
  const nightMap = useLoader(
    TextureLoader,
    "/earth/textures/earth-nightmap.jpg"
  );
  const cloudsMap = useLoader(
    TextureLoader,
    "/earth/textures/earth-clouds.jpg"
  );

  const dayNightUniform = {
    dayTexture: { value: map },
    nightTexture: { value: nightMap },
    cloudsTexture: { value: cloudsMap },
    sunDirection: { value: sunDirection },
  };

  const material = new ShaderMaterial({
    uniforms: dayNightUniform,
    vertexShader: vs,
    fragmentShader: fs,
  });

  return material;
};

const SimpleEarthMat = (sunDirection = defaultSunDirection) => {
  const map = useLoader(TextureLoader, "/earth/textures/earth-daymap.jpg");

  const simpleUniform = {
    dayTexture: { value: map },
    sunDirection: { value: sunDirection },
  };

  const material = new ShaderMaterial({
    uniforms: simpleUniform,
    vertexShader: vs,
    fragmentShader: simpleFs,
  });

  return material;
};

const HighQualityEarthMat = (sunDirection = defaultSunDirection) => {
  const map = useLoader(TextureLoader, "/earth/textures/earth-daymap-4k.jpg");

  const simpleUniform = {
    dayTexture: { value: map },
    sunDirection: { value: sunDirection },
  };

  const material = new ShaderMaterial({
    uniforms: simpleUniform,
    vertexShader: vs,
    fragmentShader: simpleFs,
  });

  return material;
};

const HighQualityDayNightEarthMat = (sunDirection = defaultSunDirection) => {
  const map = useLoader(TextureLoader, "/earth/textures/earth-daymap-4k.jpg");

  const nightMap = useLoader(
    TextureLoader,
    "/earth/textures/earth-nightmap.jpg"
  );
  const cloudsMap = useLoader(
    TextureLoader,
    "/earth/textures/earth-clouds.jpg"
  );

  const dayNightUniform = {
    dayTexture: { value: map },
    nightTexture: { value: nightMap },
    cloudsTexture: { value: cloudsMap },
    sunDirection: { value: sunDirection },
  };

  const material = new ShaderMaterial({
    uniforms: dayNightUniform,
    vertexShader: vs,
    fragmentShader: fs,
  });

  return material;
};

/**
 * Creates a material for rendering an Earth globe.
 * @param {{sunDirection?: THREE.Vector3, showDayNight: boolean}} props
 * @param {THREE.Vector3} [props.sunDirection] The direction of the sun, default is a vector pointing from the Earth to the Sun in real life.
 * @param {boolean} props.showDayNight Whether to show a day/night cycle on the globe, default is true.
 * @param {boolean} props.showHighQuality Whether to use high quality shaders, default is false.
 * @returns {JSX.Element} A `<primitive />` element with the material as its object.
 */
const EarthMaterial = ({
  sunDirection = defaultSunDirection,
  showDayNight = false,
  showHighQuality = false,
}: {
  sunDirection?: Vector3;
  showDayNight: boolean;
  showHighQuality: boolean;
}) => {
  const material = useMemo(() => {
    switch (true) {
      // Simple textures, no day/night
      case !showHighQuality && !showDayNight:
        return SimpleEarthMat(sunDirection);

      // Simple textures, with day/night
      case !showHighQuality && showDayNight:
        return SimpleDayNightEarthMat(sunDirection);

      // High quality textures, no day/night
      case showHighQuality && !showDayNight:
        return HighQualityEarthMat(sunDirection);

      // High quality textures, with day/night
      case showHighQuality && showDayNight:
        return HighQualityDayNightEarthMat(sunDirection);

      default:
        return SimpleEarthMat(sunDirection);
    }
  }, [sunDirection, showDayNight, showHighQuality]);

  return <primitive object={material} />;
};

export default EarthMaterial;
