export type Particle = {
  size: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
};

const seededUnit = (seed: number) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const round = (value: number) => Number(value.toFixed(3));

export const createParticles = (count: number): Particle[] =>
  Array.from({ length: count }, (_, index) => {
    const seed = index + count * 101;

    return {
      size: round(seededUnit(seed + 1) * 2.4 + 1),
      left: round(seededUnit(seed + 2) * 100),
      top: round(seededUnit(seed + 3) * 100),
      duration: round(seededUnit(seed + 4) * 14 + 14),
      delay: round(seededUnit(seed + 5) * 10),
    };
  });
