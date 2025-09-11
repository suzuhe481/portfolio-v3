import {
  TextureLoader,
  Color,
  Vector3,
  SpriteMaterial,
  Sprite,
  Group,
} from "three";

const loader = new TextureLoader();

function getSprite({
  hasFog,
  color,
  opacity,
  path,
  pos,
  size,
}: {
  hasFog: boolean;
  color: Color;
  opacity: number;
  path: string;
  pos: Vector3;
  size: number;
}) {
  const spriteMat = new SpriteMaterial({
    color,
    fog: hasFog,
    map: loader.load(path),
    transparent: true,
    opacity,
  });
  spriteMat.color.offsetHSL(0, 0, Math.random() * 0.2 - 0.1);
  const sprite = new Sprite(spriteMat);
  sprite.position.set(pos.x, -pos.y, pos.z);
  size += Math.random() - 0.5;
  sprite.scale.set(size, size, size);
  sprite.material.rotation = 0;
  return sprite;
}

function getSprites({
  hasFog = true,
  hue = 0.65,
  numSprites = 8,
  opacity = 0.2,
  path = "/earth/rad-grad.png",
  radius = 10,
  sat = 0.5,
  size = 24,
  z = -10.5,
} = {}) {
  const layerGroup = new Group();

  for (let i = 0; i < numSprites; i += 1) {
    const angle = (i / numSprites) * Math.PI * 2;
    const pos = new Vector3(
      Math.cos(angle) * Math.random() * radius,
      Math.sin(angle) * Math.random() * radius,
      z + Math.random()
    );

    const color = new Color().setHSL(hue, 1, sat);
    const sprite = getSprite({ hasFog, color, opacity, path, pos, size });
    layerGroup.add(sprite);
  }
  return layerGroup;
}

/**
 * A 3D layer of glowing, rounded, and rotating nebula-like sprites,
 * with a radial gradient texture.
 *
 * @param {Object} props
 * @param {number} [props.numSprites=8] Number of sprites.
 * @param {number} [props.radius=10] Distance from origin.
 * @param {number} [props.z=-10.5] Z position.
 * @param {number} [props.size=24] Sprite size.
 * @param {number} [props.opacity=0.2] Sprite opacity.
 * @param {string} [props.path="/earth/rad-grad.png"] Path to sprite texture.
 * @returns {ReactElement} A 'primitive' element containing the sprites.
 */
const Nebula = () => {
  const sprites = getSprites({
    numSprites: 8,
    radius: 10,
    z: -10.5,
    size: 24,
    opacity: 0.2,
    path: "/earth/rad-grad.png",
  });

  return <primitive object={sprites} />;
};

export default Nebula;
