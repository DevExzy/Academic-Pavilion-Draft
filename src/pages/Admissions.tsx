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
import { MoreHorizontal, Search, Check, X, Eye, UserPlus } from "lucide-react";
import { mockAdmissions, departments } from "@/lib/mock-data";
import { Admission } from "@/types";

const getStatusBadge = (status: Admission["status"]) => {
  switch (status) {
    case "pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "admitted":
      return <Badge variant="default">Admitted</Badge>;
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function Admissions() {
  const [admissions, setAdmissions] = useState<Admission[]>(mockAdmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("");

  const filteredAdmissions = admissions.filter((admission) => {
    const matchesSearch =
      `${admission.firstName} ${admission.lastName} ${admission.applicationNumber} ${admission.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || admission.status === statusFilter;
    const matchesDepartment =
      !departmentFilter || admission.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleApprove = (admission: Admission) => {
    const updatedAdmissions = admissions.map((a) =>
      a.id === admission.id
        ? {
            ...a,
            status: "admitted" as const,
            admissionDate: new Date().toISOString().split("T")[0],
          }
        : a,
    );
    setAdmissions(updatedAdmissions);
  };

  const handleReject = (admission: Admission) => {
    const updatedAdmissions = admissions.map((a) =>
      a.id === admission.id ? { ...a, status: "rejected" as const } : a,
    );
    setAdmissions(updatedAdmissions);
  };

  const pendingCount = admissions.filter((a) => a.status === "pending").length;
  const admittedCount = admissions.filter(
    (a) => a.status === "admitted",
  ).length;
  const rejectedCount = admissions.filter(
    (a) => a.status === "rejected",
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admissions</h1>
          <p className="text-muted-foreground">
            Manage student admission applications
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          New Application
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-orange-600">
            {pendingCount}
          </div>
          <p className="text-sm text-muted-foreground">Pending Applications</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-green-600">
            {admittedCount}
          </div>
          <p className="text-sm text-muted-foreground">Admitted Students</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
          <p className="text-sm text-muted-foreground">Rejected Applications</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
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
            <SelectItem value="">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="admitted">Admitted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Admissions Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application #</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Application Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAdmissions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-muted-foreground"
                >
                  No applications found
                </TableCell>
              </TableRow>
            ) : (
              filteredAdmissions.map((admission) => (
                <TableRow key={admission.id}>
                  <TableCell className="font-mono">
                    {admission.applicationNumber}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {admission.firstName} {admission.lastName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {admission.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{admission.department}</TableCell>
                  <TableCell>{admission.program}</TableCell>
                  <TableCell>
                    <div className="font-medium">{admission.score}%</div>
                  </TableCell>
                  <TableCell>
                    {new Date(admission.applicationDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{getStatusBadge(admission.status)}</TableCell>
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
                          View Application
                        </DropdownMenuItem>
                        {admission.status === "pending" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleApprove(admission)}
                              className="text-green-600"
                            >
                              <Check className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleReject(admission)}
                              className="text-red-600"
                            >
                              <X className="mr-2 h-4 w-4" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
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
