"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { UserGrowthItem } from "@/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface UserGrowthChartProps {
  data: UserGrowthItem[];
}

const chartConfig = {
  users: {
    label: "New Users",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] animate-fadeIn">
      <CardHeader>
        <CardTitle className="font-heading">User Growth</CardTitle>
        <CardDescription>Monthly new user acquisitions</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
               <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Legend />
              <Bar dataKey="users" fill="var(--color-users)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
