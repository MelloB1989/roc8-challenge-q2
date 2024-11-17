"use client";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { useDashStore } from "@/app/states/dashboard";

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

const chartConfig = {
  total: {
    label: "Total",
  },
  a: {
    label: "A",
    color: "hsl(var(--chart-1))",
  },
  b: {
    label: "B",
    color: "hsl(var(--chart-2))",
  },
  c: {
    label: "C",
    color: "hsl(var(--chart-3))",
  },
  d: {
    label: "D",
    color: "hsl(var(--chart-4))",
  },
  e: {
    label: "E",
    color: "hsl(var(--chart-5))",
  },
  f: {
    label: "F",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function Component({
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { filters, barData, setLineFeature } = useDashStore();
  return (
    <Card className={props?.className}>
      <CardHeader>
        <CardTitle>Roc8</CardTitle>
        <CardDescription>
          {filters.date_start + " - " + filters.date_end}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={barData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="feature"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="total" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="total"
              layout="vertical"
              radius={5}
              onClick={(e: any) => {
                setLineFeature(e.feature.toLowerCase());
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">Made by MelloB</div>
      </CardFooter>
    </Card>
  );
}
