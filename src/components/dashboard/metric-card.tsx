import type { Metric } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface MetricCardProps {
  metric: Metric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const Icon = metric.icon;
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-fadeIn">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {metric.title}
        </CardTitle>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl sm:text-3xl font-bold font-heading text-foreground">{metric.value}</div>
        {metric.trend && (
          <p className={cn(
            "text-xs text-muted-foreground mt-1",
            metric.trend.startsWith('+') ? 'text-green-500' : metric.trend.startsWith('-') ? 'text-red-500' : ''
          )}>
            {metric.trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
