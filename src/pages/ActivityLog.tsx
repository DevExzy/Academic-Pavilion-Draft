import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ClipboardList,
  Search,
  Download,
  Filter,
  MoreHorizontal,
  Eye,
  UserPlus,
  Upload,
  FileText,
  Users,
  Settings,
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
} from "lucide-react";

interface ActivityLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  status: "success" | "warning" | "error" | "info";
  category:
    | "student"
    | "result"
    | "admission"
    | "user"
    | "system"
    | "upload"
    | "nysc";
}

const mockActivityLogs: ActivityLogEntry[] = [
  {
    id: "1",
    timestamp: "2024-01-20T14:30:00Z",
    userId: "admin001",
    userName: "Admin User",
    userRole: "Super Admin",
    action: "Created",
    resource: "Student Record",
    details: "Added new student: Adewale Johnson (CSC/2024/001)",
    ipAddress: "192.168.1.10",
    userAgent: "Chrome/120.0",
    status: "success",
    category: "student",
  },
  {
    id: "2",
    timestamp: "2024-01-20T14:15:00Z",
    userId: "acad001",
    userName: "Dr. Sarah Wilson",
    userRole: "Academic Officer",
    action: "Uploaded",
    resource: "Results",
    details:
      "Uploaded Computer Science 400L First Semester results (150 students)",
    ipAddress: "192.168.1.25",
    userAgent: "Firefox/121.0",
    status: "success",
    category: "result",
  },
  {
    id: "3",
    timestamp: "2024-01-20T13:45:00Z",
    userId: "admin001",
    userName: "Admin User",
    userRole: "Super Admin",
    action: "Approved",
    resource: "Admission",
    details: "Approved admission for Chioma Okafor (App ID: APP2024001)",
    ipAddress: "192.168.1.10",
    userAgent: "Chrome/120.0",
    status: "success",
    category: "admission",
  },
  {
    id: "4",
    timestamp: "2024-01-20T13:30:00Z",
    userId: "acad002",
    userName: "Prof. Michael Adebayo",
    userRole: "Academic Officer",
    action: "Failed Upload",
    resource: "Results",
    details: "Failed to upload Mathematics results - Invalid file format",
    ipAddress: "192.168.1.30",
    userAgent: "Chrome/120.0",
    status: "error",
    category: "result",
  },
  {
    id: "5",
    timestamp: "2024-01-20T12:20:00Z",
    userId: "admin001",
    userName: "Admin User",
    userRole: "Super Admin",
    action: "Created",
    resource: "User Role",
    details:
      "Created new role: Department Coordinator with limited permissions",
    ipAddress: "192.168.1.10",
    userAgent: "Chrome/120.0",
    status: "success",
    category: "user",
  },
  {
    id: "6",
    timestamp: "2024-01-20T11:45:00Z",
    userId: "reg001",
    userName: "John Registrar",
    userRole: "Registrar",
    action: "Updated",
    resource: "Student Status",
    details: "Changed student status to graduated for 25 students",
    ipAddress: "192.168.1.15",
    userAgent: "Edge/120.0",
    status: "success",
    category: "student",
  },
  {
    id: "7",
    timestamp: "2024-01-20T11:20:00Z",
    userId: "sys001",
    userName: "System",
    userRole: "System",
    action: "Backup",
    resource: "Database",
    details: "Automated daily database backup completed successfully",
    ipAddress: "127.0.0.1",
    userAgent: "System/1.0",
    status: "info",
    category: "system",
  },
  {
    id: "8",
    timestamp: "2024-01-20T10:30:00Z",
    userId: "admin001",
    userName: "Admin User",
    userRole: "Super Admin",
    action: "Rejected",
    resource: "Admission",
    details:
      "Rejected admission for insufficient documents (App ID: APP2024045)",
    ipAddress: "192.168.1.10",
    userAgent: "Chrome/120.0",
    status: "warning",
    category: "admission",
  },
  {
    id: "9",
    timestamp: "2024-01-20T10:00:00Z",
    userId: "nysc001",
    userName: "NYSC Coordinator",
    userRole: "NYSC Officer",
    action: "Updated",
    resource: "NYSC Eligibility",
    details: "Reviewed and updated NYSC eligibility for 45 graduating students",
    ipAddress: "192.168.1.40",
    userAgent: "Safari/17.0",
    status: "success",
    category: "nysc",
  },
  {
    id: "10",
    timestamp: "2024-01-20T09:15:00Z",
    userId: "acad001",
    userName: "Dr. Sarah Wilson",
    userRole: "Academic Officer",
    action: "Uploaded",
    resource: "Admission List",
    details: "Uploaded 2024/2025 admission list (500 applicants)",
    ipAddress: "192.168.1.25",
    userAgent: "Firefox/121.0",
    status: "success",
    category: "upload",
  },
];

const getStatusIcon = (status: ActivityLogEntry["status"]) => {
  switch (status) {
    case "success":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-orange-600" />;
    case "error":
      return <XCircle className="h-4 w-4 text-red-600" />;
    case "info":
      return <Clock className="h-4 w-4 text-blue-600" />;
    default:
      return null;
  }
};

const getStatusBadge = (status: ActivityLogEntry["status"]) => {
  switch (status) {
    case "success":
      return <Badge variant="default">Success</Badge>;
    case "warning":
      return <Badge variant="secondary">Warning</Badge>;
    case "error":
      return <Badge variant="destructive">Error</Badge>;
    case "info":
      return <Badge variant="outline">Info</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getCategoryIcon = (category: ActivityLogEntry["category"]) => {
  switch (category) {
    case "student":
      return <Users className="h-4 w-4 text-blue-600" />;
    case "result":
      return <FileText className="h-4 w-4 text-green-600" />;
    case "admission":
      return <UserPlus className="h-4 w-4 text-purple-600" />;
    case "user":
      return <Shield className="h-4 w-4 text-orange-600" />;
    case "system":
      return <Settings className="h-4 w-4 text-gray-600" />;
    case "upload":
      return <Upload className="h-4 w-4 text-indigo-600" />;
    case "nysc":
      return <ClipboardList className="h-4 w-4 text-teal-600" />;
    default:
      return <ClipboardList className="h-4 w-4" />;
  }
};

export default function ActivityLog() {
  const [activities] = useState<ActivityLogEntry[]>(mockActivityLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [userFilter, setUserFilter] = useState<string>("all");

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      !statusFilter ||
      statusFilter === "all" ||
      activity.status === statusFilter;
    const matchesCategory =
      !categoryFilter ||
      categoryFilter === "all" ||
      activity.category === categoryFilter;
    const matchesUser =
      !userFilter || userFilter === "all" || activity.userRole === userFilter;

    return matchesSearch && matchesStatus && matchesCategory && matchesUser;
  });

  const adminActivities = filteredActivities.filter(
    (activity) =>
      activity.userRole.toLowerCase().includes("admin") ||
      activity.userRole === "Super Admin",
  );

  const roleBasedActivities = filteredActivities.filter(
    (activity) =>
      !activity.userRole.toLowerCase().includes("admin") &&
      activity.userRole !== "Super Admin" &&
      activity.userRole !== "System",
  );

  const uniqueRoles = Array.from(
    new Set(activities.map((activity) => activity.userRole)),
  );

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  };

  const ActivityTable = ({
    activities,
  }: {
    activities: ActivityLogEntry[];
  }) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Resource</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground"
              >
                No activities found
              </TableCell>
            </TableRow>
          ) : (
            activities.map((activity) => {
              const { date, time } = formatTimestamp(activity.timestamp);
              return (
                <TableRow key={activity.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt={activity.userName} />
                        <AvatarFallback>
                          {activity.userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{activity.userName}</div>
                        <div className="text-sm text-muted-foreground">
                          {activity.userRole}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(activity.category)}
                      <span className="font-medium">{activity.action}</span>
                    </div>
                  </TableCell>
                  <TableCell>{activity.resource}</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate" title={activity.details}>
                      {activity.details}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(activity.status)}
                      {getStatusBadge(activity.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{date}</div>
                      <div className="text-sm text-muted-foreground">
                        {time}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity Log</h1>
          <p className="text-muted-foreground">
            Track all activities performed by administrators and assigned roles
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-blue-600">
            {filteredActivities.length}
          </div>
          <p className="text-sm text-muted-foreground">Total Activities</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-green-600">
            {filteredActivities.filter((a) => a.status === "success").length}
          </div>
          <p className="text-sm text-muted-foreground">Successful Actions</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-red-600">
            {filteredActivities.filter((a) => a.status === "error").length}
          </div>
          <p className="text-sm text-muted-foreground">Failed Actions</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-orange-600">
            {filteredActivities.filter((a) => a.status === "warning").length}
          </div>
          <p className="text-sm text-muted-foreground">Warnings</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="result">Results</SelectItem>
                  <SelectItem value="admission">Admissions</SelectItem>
                  <SelectItem value="user">User Management</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="upload">Uploads</SelectItem>
                  <SelectItem value="nysc">NYSC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">User Role</label>
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {uniqueRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">
            All Activities ({filteredActivities.length})
          </TabsTrigger>
          <TabsTrigger value="admin">
            Admin Activities ({adminActivities.length})
          </TabsTrigger>
          <TabsTrigger value="roles">
            Role-based Activities ({roleBasedActivities.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <ActivityTable activities={filteredActivities} />
        </TabsContent>

        <TabsContent value="admin" className="space-y-4">
          <div className="rounded-lg border p-4 bg-blue-50">
            <h3 className="font-semibold text-blue-800 mb-2">
              Administrator Activities
            </h3>
            <p className="text-sm text-blue-700">
              Activities performed by system administrators with full access
              privileges.
            </p>
          </div>
          <ActivityTable activities={adminActivities} />
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <div className="rounded-lg border p-4 bg-green-50">
            <h3 className="font-semibold text-green-800 mb-2">
              Role-based User Activities
            </h3>
            <p className="text-sm text-green-700">
              Activities performed by users with specific assigned roles and
              limited permissions.
            </p>
          </div>
          <ActivityTable activities={roleBasedActivities} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
