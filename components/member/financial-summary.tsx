"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

// const chartData = [
//   { name: "cash_on_hand", amount: "22", fill: "var(--color-cash_on_hand)" },
//   { name: "debt", amount: 200, fill: "var(--color-debt)" },
//   { name: "spent", amount: 187, fill: "var(--color-spent)" },
//   { name: "total", amount: 187, fill: "var(--color-total)" },
// ];

const chartConfig = {
  amount: {
    label: "Amount",
  },
  cash_on_hand: {
    label: "Cash on hand",
    color: "hsl(var(--chart-3))",
  },
  debt: {
    label: "Debt",
    color: "hsl(var(--chart-1))",
  },
  spent: {
    label: "Spent",
    color: "hsl(var(--chart-2))",
  },
  total: {
    label: "Total",
    color: "hsl(var(--chart-3))",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  //   label: {
  //     color: "hsl(var(--background))",
  //   },
} satisfies ChartConfig;

interface Props {
  openSecretsCID: string;
}

interface ChartData {
  name: string;
  amount: number;
  fill: string;
}

export default function FinancialSummary({ openSecretsCID }: Props) {
  const [candSummary, setCandSummary] = useState<SummaryAttributes>();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Fetch data from open secrets
  useEffect(() => {
    console.log("CID: ", openSecretsCID);
    const fetchCandidateSummary = async () => {
      try {
        let response = await fetch(
          `/api/opensecrets/candidates/${openSecretsCID}`
        );
        let data: CandSummaryObject = await response.json();
        console.log(
          "Open secrets summary: ",
          data.response.summary["@attributes"]
        );
        setCandSummary(data.response.summary["@attributes"]);
      } catch (error) {
        console.error("Error fetching current members: ", error);
      }
    };
    if (openSecretsCID) fetchCandidateSummary();
  }, [openSecretsCID]);

  useEffect(() => {
    if (candSummary) {
      console.log("cashOnHand", candSummary);
      const _chartData: ChartData[] = [
        {
          name: "cash_on_hand",
          amount: parseInt(candSummary.cash_on_hand),
          fill: "var(--color-cash_on_hand)",
        },
        {
          name: "debt",
          amount: parseInt(candSummary.debt),
          fill: "var(--color-debt)",
        },
        {
          name: "spent",
          amount: parseInt(candSummary.spent),
          fill: "var(--color-spent)",
        },
        // {
        //   name: "total",
        //   amount: candSummary.total,
        //   fill: "var(--color-total)",
        // },
      ];
      setChartData(_chartData);
    }
  }, [candSummary]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Summary</CardTitle>
        <CardDescription>{`Cycle: ${candSummary?.cycle}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="amount"
              strokeWidth={2}
              radius={8}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {`Source: ${candSummary?.origin}`}
        </div>
        <div className="leading-none text-muted-foreground">
          {`Last Updated: ${candSummary?.last_updated}`}
        </div>
      </CardFooter>
    </Card>
  );
}
