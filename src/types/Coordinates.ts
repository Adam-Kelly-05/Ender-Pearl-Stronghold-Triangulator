export type Coordinates = {
  x1: number;
  x2: number;
  z1: number;
  z2: number;
};

export type StrongholdInput = Coordinates & {
  angle1: number;
  angle2: number;
};

export type StrongholdResult = Coordinates & {
  strongholdX: number;
  strongholdZ: number;
};
