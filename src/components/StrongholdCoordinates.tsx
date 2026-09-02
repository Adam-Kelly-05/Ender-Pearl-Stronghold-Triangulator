import type { StrongholdInput } from "@/src/types/Coordinates";

export default function StrongholdComponents({
  x1,
  x2,
  z1,
  z2,
  angle1,
  angle2,
}: StrongholdInput) {
  // Convert angles from degrees to radians
  const rad1 = (angle1 * Math.PI) / 180;
  const rad2 = (angle2 * Math.PI) / 180;

  // Calculate the direction vectors
  const dx1 = -Math.sin(rad1);
  const dz1 = Math.cos(rad1);
  const dx2 = -Math.sin(rad2);
  const dz2 = Math.cos(rad2);

  // Calculate the intersection point of the two lines
  const c1 = dz1 * x1 + -dx1 * z1;
  const c2 = dz2 * x2 + -dx2 * z2;

  // Calculate the stronghold coordinates
  const denominator = dz1 * -dx2 - dz2 * -dx1;
  const strongholdX = (-dx1 * c2 - -dx2 * c1) / denominator;
  const strongholdZ = (dz2 * c1 - dz1 * c2) / denominator;

  // Calculate the distance from the second throw to the stronghold
  const distance = Math.sqrt(
    Math.pow(strongholdX - x2, 2) + Math.pow(strongholdZ - z2, 2),
  );

  // Return the results as an object
  return {
    stronghold: [Math.round(strongholdX), Math.round(strongholdZ)],
    distance: Math.round(distance),
    strongholdNether: [
      Math.round(strongholdX / 8),
      Math.round(strongholdZ / 8),
    ],
    distanceNether: Math.round(distance / 8),
  };
}
