import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--destructive))',
  'hsl(220, 70%, 55%)',
  'hsl(280, 60%, 55%)',
  'hsl(35, 90%, 55%)',
  'hsl(160, 60%, 45%)',
  'hsl(var(--muted-foreground))',
];

interface Props {
  data: { category: string; label: string; count: number }[];
}

export function BarrierCategoryChart({ data }: Props) {
  // Shorten labels for chart
  const shortLabels: Record<string, string> = {
    'VLU - Vakant ledig uthyrningsbar': 'VLU',
    'FLU - Förvaltarens ledig uthyrningsbar': 'FLU',
    'Renovering innan inflytt': 'Ren. innan',
    'Renovering efter inflytt': 'Ren. efter',
    'Skada': 'Skada',
    'Underhåll': 'Underhåll',
    'Övrigt': 'Övrigt',
  };

  const chartData = data.map(d => ({
    ...d,
    shortLabel: shortLabels[d.label] || d.label,
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Spärrar per orsakkategori</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="shortLabel"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ shortLabel, count }) => `${shortLabel}: ${count}`}
                labelLine={false}
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [value, 'Antal']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
