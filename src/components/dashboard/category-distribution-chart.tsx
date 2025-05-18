
"use client"

import { Pie, PieChart, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import type { CategoryDistributionItem } from "@/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface CategoryDistributionChartProps {
  data: CategoryDistributionItem[];
}

// Updated chartConfig for new colors and categories
const chartConfig = {
  electronics: { label: "Electronics", color: "hsl(var(--pie-category-red))" },
  clothing: { label: "Clothing", color: "hsl(var(--pie-category-purple))" },
  groceries: { label: "Groceries", color: "hsl(var(--pie-category-black))" },
} satisfies ChartConfig


export function CategoryDistributionChart({ data }: CategoryDistributionChartProps) {
  return (
    <Card className="shadow-lg flex flex-col hover:shadow-xl transition-all duration-300 hover:scale-[1.01] animate-fadeIn">
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
