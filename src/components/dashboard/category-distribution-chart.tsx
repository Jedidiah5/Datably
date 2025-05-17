"use client"

import { Pie, PieChart, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import type { CategoryDistributionItem } from "@/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface CategoryDistributionChartProps {
  data: CategoryDistributionItem[];
}

const chartConfig = {
  items: {
    label: "Items", // A generic label, specific labels come from data
  },
  // Define colors for categories to match the 'fill' properties in mockCategoryDistributionData
  electronics: { label: "Electronics", color: "hsl(var(--chart-1))" }, // Maroon
  clothing: { label: "Clothing", color: "hsl(var(--chart-3))" },    // Orange/Yellow
  groceries: { label: "Groceries", color: "hsl(var(--chart-4))" },  // Green
  books: { label: "Books", color: "hsl(var(--chart-5))" },       // Blue
} satisfies ChartConfig


export function CategoryDistributionChart({ data }: CategoryDistributionChartProps) {
  return (
    <Card className="shadow-lg flex flex-col">
      <CardHeader>
        <CardTitle className="font-heading">Category Distribution</CardTitle>
        <CardDescription>Sales distribution by product category</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
         <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent nameKey="name" />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
