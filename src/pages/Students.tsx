import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StudentTabs } from "@/components/students/StudentTabs";
import { mockStudents, departments, levels } from "@/lib/mock-data";
import { Student } from "@/types";
import { Search, Filter } from "lucide-react";

export default function Students() {
  const [students] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");

  const handleViewStudent = (student: Student) => {
    console.log("View student:", student);
    // Implement view student logic
  };

  const handleEditStudent = (student: Student) => {
    console.log("Edit student:", student);
    // Implement edit student logic
  };

  const handleDeleteStudent = (student: Student) => {
    console.log("Delete student:", student);
    // Implement delete student logic
  };

  // Filter students based on search term, department, and level
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      `${student.firstName} ${student.lastName} ${student.studentId} ${student.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesDepartment =
      !departmentFilter ||
      departmentFilter === "all" ||
      student.department === departmentFilter;
    const matchesLevel =
      !levelFilter || levelFilter === "all" || student.level === levelFilter;

    return matchesSearch && matchesDepartment && matchesLevel;
  });

  // Get counts for each status based on filtered results
  const getFilteredCounts = () => {
    const active = filteredStudents.filter((s) => s.status === "active").length;
    const graduated = filteredStudents.filter(
      (s) => s.status === "graduated",
    ).length;
    const probation = filteredStudents.filter(
      (s) => s.status === "probation",
    ).length;
    return { active, graduated, probation };
  };

  const counts = getFilteredCounts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Students</h1>
        <p className="text-muted-foreground">
          View and manage student records and information
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-blue-600">
            {counts.active}
          </div>
          <p className="text-sm text-muted-foreground">Active Students</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-green-600">
            {counts.graduated}
          </div>
          <p className="text-sm text-muted-foreground">Graduated Students</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-orange-600">
            {counts.probation}
          </div>
          <p className="text-sm text-muted-foreground">Probation Students</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription>
            Search and filter students by various criteria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger>
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

            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level} Level
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <StudentTabs
        students={filteredStudents}
        onViewStudent={handleViewStudent}
        onEditStudent={handleEditStudent}
        onDeleteStudent={handleDeleteStudent}
      />
    </div>
  );
}
