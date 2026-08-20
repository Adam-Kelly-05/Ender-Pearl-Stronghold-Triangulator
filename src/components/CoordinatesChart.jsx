import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables, ChartDataLabels);
export default function CoordinatesChart(
  x1,
  z1,
  x2,
  z2,
  strongholdX,
  strongholdZ,
) {
  // Create a scatter plot of the throws and the stronghold location
  Chart.register(...registerables);
  Chart.getChart("coordsChart")?.destroy();
  const coordsChart = new Chart("coordsChart", {
    type: "scatter",
    data: {
      datasets: [
        {
          data: [
            { x: x1, y: z1, label: "Throw 1" },
            { x: strongholdX, y: strongholdZ, label: "Stronghold" },
            { x: x2, y: z2, label: "Throw 2" },
          ],
          showLine: true,
          borderColor: "blue",
          pointBackgroundColor: ["green", "gray", "green"],
          pointRadius: [7, 11, 7],
        },
      ],
    },
    options: {
      aspectRatio: 1,
      plugins: {
        legend: { display: false },
        datalabels: { align: "top" },
      },
      scales: {
        x: {
          min: Math.min(x1, strongholdX, x2, 0) - 100,
          max: Math.max(x1, strongholdX, x2, 0) + 100,
          grid: {
            color(ctx) {
              if (ctx.tick.value === 0) return "oklch(55.1% 0.027 264.364)";
              return "oklch(21.8% 0.008 223.9)";
            },
          },
        },
        y: {
          min: Math.min(z1, strongholdZ, z2, 0) - 100,
          max: Math.max(z1, strongholdZ, z2, 0) + 100,
          grid: {
            color(ctx) {
              if (ctx.tick.value === 0) return "oklch(55.1% 0.027 264.364)";
              return "oklch(21.8% 0.008 223.9)";
            },
          },
        },
      },
    },
  });

  return coordsChart;
}
