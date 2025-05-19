import { Button } from '@/components/ui/button';
import CoverageChart from './(dashboard-components)/CoverageChart';
import OptimizationProgress from './(dashboard-components)/OptimizationProgress';
import { DownloadCloud } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your CloudWise dashboard. Overview of your cloud environment.
          </p>
        </div>
        <Button variant="default" size="lg">
          <DownloadCloud className="mr-2 h-5 w-5" />
          Generate Recommendations
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CoverageChart />
        <OptimizationProgress />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for additional dashboard widgets */}
        {[1,2,3].map((i) => (
            <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 min-h-[150px] flex flex-col justify-center items-center">
                <h3 className="text-lg font-semibold mb-2">Widget {i}</h3>
                <p className="text-sm text-muted-foreground">Future content placeholder.</p>
            </div>
        ))}
      </div>
    </div>
  );
}
