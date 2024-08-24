"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Rectangle,
  XAxis,
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
import { formatDollar } from "@/lib/utils";
import { useCandidateSummary } from "@/app/hooks/useCandidateSummary";
import { FinancialSummarySkeleton } from "../global/financial-summary-skeleton";

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
} satisfies ChartConfig;

interface Props {
  openSecretsCID: string;
}

interface ChartData {
  name: string;
  amount: number;
  fill: string;
  formattedAmount: string;
}

export default function FinancialSummary({ openSecretsCID }: Props) {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const { candSummary, isLoading } = useCandidateSummary(openSecretsCID);

  useEffect(() => {
    if (candSummary) {
      const _chartData: ChartData[] = [
        {
          name: "cash_on_hand",
          amount: parseInt(candSummary.cash_on_hand),
          fill: "var(--color-cash_on_hand)",
          formattedAmount: formatDollar(parseInt(candSummary.cash_on_hand)),
        },
        {
          name: "debt",
          amount: parseInt(candSummary.debt),
          fill: "var(--color-debt)",
          formattedAmount: formatDollar(parseInt(candSummary.debt)),
        },
        {
          name: "spent",
          amount: parseInt(candSummary.spent),
          fill: "var(--color-spent)",
          formattedAmount: formatDollar(parseInt(candSummary.spent)),
        },
      ];
      setChartData(_chartData);
    }
  }, [candSummary]);

  if (isLoading) {
    return <FinancialSummarySkeleton />;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Summary</CardTitle>
        <CardDescription>
          <div>{`Cycle: ${candSummary?.cycle}`}</div>
          <div>{`Next Election: ${candSummary?.next_election}`}</div>
        </CardDescription>
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
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div
                      style={{
                        backgroundColor: "white",
                        padding: "5px",
                        border: "1px solid #ccc",
                      }}
                    >
                      <p>{`${label} : ${formatDollar(
                        Number(payload[0].value)
                      )}`}</p>
                    </div>
                  );
                }
                return null;
              }}
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
                dataKey="amount"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => formatDollar(value)}
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
