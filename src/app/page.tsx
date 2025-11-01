import { Breadcrumb } from "@/app/components/dashboard/breadcrumb";
import { WelcomeCard } from "@/app/components/dashboard/welcome-card";
import { StatsGrid } from "@/app/components/dashboard/stats-grid";
import { OverviewCarousel } from "@/app/components/dashboard/overview-carousel";
import { DailyMomentCard } from "@/app/components/dashboard/daily-moment-card";
import { StarPerformersCard } from "@/app/components/dashboard/star-performers-card";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Breadcrumb />
        </div>
      </div>

      <WelcomeCard />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <StatsGrid />
        </div>
        <div className="lg:col-span-1">
          <OverviewCarousel />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <DailyMomentCard />
        </div>
        <div className="lg:col-span-3">
          <StarPerformersCard />
        </div>
      </div>
    </div>
  );
}
