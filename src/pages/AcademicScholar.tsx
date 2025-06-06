import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MoreHorizontal,
  Search,
  Eye,
  Edit,
  Award,
  Plus,
  Pause,
  Play,
} from "lucide-react";
import {
  mockAcademicScholars,
  departments,
  levels,
  academicYears,
} from "@/lib/mock-data";
import { AcademicScholar } from "@/types";

const getStatusBadge = (status: AcademicScholar["status"]) => {
  switch (status) {
    case "active":
      return <Badge variant="default">Active</Badge>;
    case "suspended":
      return <Badge variant="destructive">Suspended</Badge>;
    case "completed":
      return <Badge variant="secondary">Completed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const scholarshipTypes = [
  "Merit-based",
  "Need-based",
  "Sports Excellence",
  "Academic Excellence",
  "Minority Scholarship",
  "Research Grant",
  "International Exchange",
];

export default function AcademicScholar() {
  const [scholars, setScholars] =
    useState<AcademicScholar[]>(mockAcademicScholars);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("");

  const filteredScholars = scholars.filter((scholar) => {
    const matchesSearch =
      `${scholar.studentName} ${scholar.studentId} ${scholar.scholarshipType}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      !statusFilter ||
      statusFilter === "all" ||
      scholar.status === statusFilter;
    const matchesType =
      !typeFilter ||
      typeFilter === "all" ||
      scholar.scholarshipType === typeFilter;
    const matchesDepartment =
      !departmentFilter ||
      departmentFilter === "all" ||
      scholar.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesType && matchesDepartment;
  });
  const handleSuspendScholarship = (scholar: AcademicScholar) => {
    const updatedScholars = scholars.map((s) =>
      s.id === scholar.id ? { ...s, status: "suspended" as const } : s,
    );
    setScholars(updatedScholars);
  };

  const handleReactivateScholarship = (scholar: AcademicScholar) => {
    const updatedScholars = scholars.map((s) =>
      s.id === scholar.id ? { ...s, status: "active" as const } : s,
    );
    setScholars(updatedScholars);
  };

  const activeCount = scholars.filter((s) => s.status === "active").length;
  const suspendedCount = scholars.filter(
    (s) => s.status === "suspended",
  ).length;
  const completedCount = scholars.filter(
    (s) => s.status === "completed",
  ).length;
  const totalAmount = scholars
    .filter((s) => s.status === "active")
    .reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Academic Scholarships
          </h1>
          <p className="text-muted-foreground">
            Manage academic scholarship awards and recipients
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Award Scholarship
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-green-600">{activeCount}</div>
          <p className="text-sm text-muted-foreground">Active Scholarships</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-red-600">
            {suspendedCount}
          </div>
          <p className="text-sm text-muted-foreground">Suspended</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-gray-600">
            {completedCount}
          </div>
          <p className="text-sm text-muted-foreground">Completed</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-blue-600">
            ₦{(totalAmount / 1000000).toFixed(1)}M
          </div>
          <p className="text-sm text-muted-foreground">Total Active Amount</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search scholarships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Scholarship Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {scholarshipTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Scholarships Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Scholarship Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>CGPA</TableHead>
              <TableHead>Academic Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredScholars.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center text-muted-foreground"
                >
                  No scholarships found
                </TableCell>
              </TableRow>
            ) : (
              filteredScholars.map((scholar) => (
                <TableRow key={scholar.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{scholar.studentName}</div>
                      <div className="text-sm text-muted-foreground">
                        {scholar.studentId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{scholar.department}</TableCell>
                  <TableCell>{scholar.level}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      {scholar.scholarshipType}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    ₦{scholar.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{scholar.cgpa.toFixed(2)}</div>
                  </TableCell>
                  <TableCell>{scholar.academicYear}</TableCell>
                  <TableCell>{getStatusBadge(scholar.status)}</TableCell>
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
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Scholarship
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {scholar.status === "active" ? (
                          <DropdownMenuItem
                            onClick={() => handleSuspendScholarship(scholar)}
                            className="text-red-600"
                          >
                            <Pause className="mr-2 h-4 w-4" />
                            Suspend Scholarship
                          </DropdownMenuItem>
                        ) : scholar.status === "suspended" ? (
                          <DropdownMenuItem
                            onClick={() => handleReactivateScholarship(scholar)}
                            className="text-green-600"
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Reactivate Scholarship
                          </DropdownMenuItem>
                        ) : null}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
