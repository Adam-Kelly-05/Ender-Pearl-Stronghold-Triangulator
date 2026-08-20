"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StrongholdComponents from "../components/StrongholdCoordinates";
import CoordinatesChart from "../components/CoordinatesChart";

export default function Home() {
  // State variables for the user inputs and calculated results
  const [x1, setX1] = useState("");
  const [z1, setZ1] = useState("");
  const [angle1, setAngle1] = useState("");
  const [x2, setX2] = useState("");
  const [z2, setZ2] = useState("");
  const [angle2, setAngle2] = useState("");

  const [stronghold, setStronghold] = useState("");
  const [distance, setDistance] = useState("");
  const [strongholdNether, setStrongholdNether] = useState("");
  const [distanceNether, setDistanceNether] = useState("");

  function calculateStrongholdLocation() {
    const strongholdResult = StrongholdComponents({
      x1,
      x2,
      z1,
      z2,
      angle1,
      angle2,
    });

    // Update the state with the calculated stronghold coordinates and distance
    setStronghold(
      `X: ${strongholdResult.stronghold[0]}, Z: ${strongholdResult.stronghold[1]}`,
    );
    setDistance(`${strongholdResult.distance} blocks`);
    setStrongholdNether(
      `X: ${strongholdResult.strongholdNether[0]}, Z: ${strongholdResult.strongholdNether[1]}`,
    );
    setDistanceNether(`${strongholdResult.distanceNether} blocks`);

    // Render the chart with the calculated coordinates
    CoordinatesChart(
      Number(x1),
      Number(z1),
      Number(x2),
      Number(z2),
      strongholdResult.stronghold[0],
      strongholdResult.stronghold[1],
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold">
        Ender Pearl Stronghold Triangulator
      </h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Coordinates</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Form for inputting the coordinates and angles of the two ender pearl throws */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              calculateStrongholdLocation();
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="1X">Ender Pearl 1 X:</Label>
                <Input
                  type="number"
                  step="any"
                  id="1X"
                  value={x1}
                  onChange={(e) => setX1(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="2X">Ender Pearl 2 X:</Label>
                <Input
                  type="number"
                  step="any"
                  id="2X"
                  value={x2}
                  onChange={(e) => setX2(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="1Z">Ender Pearl 1 Z:</Label>
                <Input
                  type="number"
                  step="any"
                  id="1Z"
                  value={z1}
                  onChange={(e) => setZ1(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="2Z">Ender Pearl 2 Z:</Label>
                <Input
                  type="number"
                  step="any"
                  id="2Z"
                  value={z2}
                  onChange={(e) => setZ2(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="1Angle">Ender Pearl 1 Angle:</Label>
                <Input
                  type="number"
                  step="any"
                  id="1Angle"
                  value={angle1}
                  onChange={(e) => setAngle1(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="2Angle">Ender Pearl 2 Angle:</Label>
                <Input
                  type="number"
                  step="any"
                  id="2Angle"
                  value={angle2}
                  onChange={(e) => setAngle2(e.target.value)}
                />
              </div>
            </div>
            <Button
              type="submit"
              id="submit"
              className="mt-6 w-full border-1 border-primary"
            >
              Calculate Stronghold Location
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Display the calculated stronghold coordinates and distance */}
      <Card className="w-full">
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <p className="text-lg">Overworld</p>
            <p className="text-lg">Nether</p>
            <p className="grid gap-2">Stronghold Location: {stronghold}</p>
            <p className="grid gap-2">
              Stronghold Location: {strongholdNether}
            </p>
            <p className="grid gap-2">Distance from Throw 2: {distance}</p>
            <p className="grid gap-2">
              Distance from Throw 2: {distanceNether}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Display the chart of the ender pearl throws and the calculated stronghold location */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <canvas
            id="coordsChart"
            className="w-full rounded-lg border aspect-square"
          ></canvas>
        </CardContent>
      </Card>
    </main>
  );
}
