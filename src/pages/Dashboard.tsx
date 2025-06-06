import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  GraduationCap,
  AlertTriangle,
  UserPlus,
  Award,
  DollarSign,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { mockDashboardStats } from "@/lib/mock-data";

export default function Dashboard() {
  const stats = mockDashboardStats;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the University Management Portal
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value={stats.totalStudents}
          description="Currently enrolled students"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Active Students"
          value={stats.activeStudents}
          description="Students in good standing"
          icon={GraduationCap}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Probation Students"
          value={stats.probationStudents}
          description="Students needing attention"
          icon={AlertTriangle}
          trend={{ value: -5, isPositive: false }}
        />
        <StatsCard
          title="Pending Admissions"
          value={stats.pendingAdmissions}
          description="Applications awaiting review"
          icon={UserPlus}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Scholarships"
          value={stats.totalScholarships}
          description="Active scholarship recipients"
          icon={Award}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Revenue"
          value={`₦${(stats.totalRevenue / 1000000).toFixed(1)}M`}
          description="Total revenue this year"
          icon={DollarSign}
          trend={{ value: 18, isPositive: true }}
        />
        <StatsCard
          title="New Enrollments"
          value={stats.newEnrollments}
          description="This academic year"
          icon={TrendingUp}
          trend={{ value: 25, isPositive: true }}
        />
        <StatsCard
          title="Graduated"
          value={stats.graduatedStudents}
          description="Total graduates"
          icon={GraduationCap}
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button variant="outline" className="justify-start">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Student
            </Button>
            <Button variant="outline" className="justify-start">
              <GraduationCap className="mr-2 h-4 w-4" />
              Upload Results
            </Button>
            <Button variant="outline" className="justify-start">
              <Award className="mr-2 h-4 w-4" />
              Award Scholarship
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Event
            </Button>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <RecentActivity />
        </div>
      </div>

      {/* Academic Calendar & Announcements */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Academic Calendar</CardTitle>
            <CardDescription>Upcoming important dates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mid-semester Exams</p>
                  <p className="text-sm text-muted-foreground">
                    March 15-22, 2024
                  </p>
                </div>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Registration Deadline</p>
                  <p className="text-sm text-muted-foreground">
                    March 30, 2024
                  </p>
                </div>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Final Examinations</p>
                  <p className="text-sm text-muted-foreground">
                    May 10-24, 2024
                  </p>
                </div>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Important notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-orange-200 bg-orange-50 rounded-lg">
                <p className="font-medium text-orange-800">Payment Reminders</p>
                <p className="text-sm text-orange-600">
                  450 students have pending tuition payments
                </p>
              </div>
              <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-800">Course Registration</p>
                <p className="text-sm text-blue-600">
                  1,200 students have completed course registration
                </p>
              </div>
              <div className="p-3 border border-green-200 bg-green-50 rounded-lg">
                <p className="font-medium text-green-800">System Update</p>
                <p className="text-sm text-green-600">
                  Portal maintenance scheduled for this weekend
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
