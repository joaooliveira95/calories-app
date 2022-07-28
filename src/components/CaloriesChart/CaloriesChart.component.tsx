import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { IFood } from "../../interfaces/food.interface";

interface ICaloriesChart {
  foodEntries: any;
}

export default function CaloriesChart({ foodEntries }: ICaloriesChart) {
  console.log(foodEntries);
  const data = foodEntries.map((item: any) => [item.date.getTime(), item.sum]);
  console.log("data", data);
  const options = {
    title: {
      text: "Total Calories Per Day",
    },

    yAxis: {
      title: {
        text: "Calories (kcal)",
      },
      plotLines: [
        {
          color: "red",
          dashStyle: "solid",
          value: 2100,
          width: 2,
        },
      ],
    },
    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%Y-%m-%d}",
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: [
      {
        name: "Calories per Day",
        data: data,
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 300,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
