import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MonthlyTrend {
  month: string;
  vlu: number;
  flu: number;
  renovation: number;
  other: number;
}

interface Props {
  data: MonthlyTrend[];
}

export function BarrierMonthlyTrendChart({ data }: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Månadsvis utveckling (senaste 12 mån)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="vlu" name="VLU" fill="hsl(var(--primary))" stackId="a" />
              <Bar dataKey="flu" name="FLU" fill="hsl(var(--destructive))" stackId="a" />
              <Bar dataKey="renovation" name="Renovering" fill="hsl(220, 70%, 55%)" stackId="a" />
              <Bar dataKey="other" name="Övrigt" fill="hsl(var(--muted-foreground))" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
