import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  type: "success" | "warning" | "info";
}

const mockActivities: Activity[] = [
  {
    id: "1",
    user: "John Doe",
    action: "Result submitted",
    target: "CSC301 Final Exam",
    timestamp: "2 minutes ago",
    type: "success",
  },
  {
    id: "2",
    user: "Jane Smith",
    action: "Profile updated",
    target: "Student Profile",
    timestamp: "15 minutes ago",
    type: "info",
  },
  {
    id: "3",
    user: "Mike Johnson",
    action: "Application submitted",
    target: "Scholarship Application",
    timestamp: "1 hour ago",
    type: "info",
  },
  {
    id: "4",
    user: "Sarah Williams",
    action: "Payment overdue",
    target: "Tuition Fee",
    timestamp: "2 hours ago",
    type: "warning",
  },
];

const getBadgeVariant = (type: Activity["type"]) => {
  switch (type) {
    case "success":
      return "default";
    case "warning":
      return "destructive";
    case "info":
      return "secondary";
    default:
      return "outline";
  }
};

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest activities across the university
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt={activity.user} />
                <AvatarFallback>
                  {activity.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.action} - {activity.target}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <Badge variant={getBadgeVariant(activity.type)}>
                  {activity.type}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
