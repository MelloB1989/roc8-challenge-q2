"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
  desktop: {
    label: "a",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Component({
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { filters, lineData, lineFeature } = useDashStore();
  return (
    <Card className={props?.className}>
      <CardHeader>
        <CardTitle>Feature: {lineFeature}</CardTitle>
        <CardDescription>
          {filters.date_start + " - " + filters.date_end}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={lineData[lineFeature]}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="value"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">Made by MelloB</div>
      </CardFooter>
    </Card>
  );
}
