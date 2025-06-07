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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreHorizontal, Search, Eye } from "lucide-react";
import { departments } from "@/lib/mock-data";

interface NYSCEligibleStudent {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  level: string;
  cgpa: number;
  graduationDate?: string;
  age: number;
  citizenship: string;
  isEligible: boolean;
  eligibilityReason: string;
}

const mockNYSCStudents: NYSCEligibleStudent[] = [
  {
    id: "1",
    studentId: "CSC/2020/001",
    studentName: "Adewale Johnson",
    department: "Computer Science",
    level: "400",
    cgpa: 4.2,
    graduationDate: "2024-05-15",
    age: 24,
    citizenship: "Nigerian",
    isEligible: true,
    eligibilityReason: "Meets all requirements",
  },
  {
    id: "2",
    studentId: "ENG/2020/045",
    studentName: "Chioma Okafor",
    department: "Engineering",
    level: "400",
    cgpa: 3.8,
    graduationDate: "2024-05-15",
    age: 23,
    citizenship: "Nigerian",
    isEligible: true,
    eligibilityReason: "Meets all requirements",
  },
  {
    id: "3",
    studentId: "BUS/2020/078",
    studentName: "Emeka Nnamdi",
    department: "Business Administration",
    level: "400",
    cgpa: 3.2,
    graduationDate: "2024-05-15",
    age: 29,
    citizenship: "Nigerian",
    isEligible: true,
    eligibilityReason: "Meets all requirements",
  },
  {
    id: "4",
    studentId: "MAT/2020/012",
    studentName: "Fatima Hassan",
    department: "Mathematics",
    level: "400",
    cgpa: 2.1,
    graduationDate: "2024-05-15",
    age: 25,
    citizenship: "Nigerian",
    isEligible: false,
    eligibilityReason: "CGPA below minimum requirement (2.5)",
  },
  {
    id: "5",
    studentId: "LAW/2019/003",
    studentName: "Olumide Adebayo",
    department: "Law",
    level: "500",
    cgpa: 3.9,
    graduationDate: "2024-07-20",
    age: 31,
    citizenship: "Nigerian",
    isEligible: false,
    eligibilityReason: "Above age limit (30 years)",
  },
  {
    id: "6",
    studentId: "MED/2019/089",
    studentName: "Blessing Uche",
    department: "Medicine",
    level: "600",
    cgpa: 4.5,
    graduationDate: "2024-08-30",
    age: 26,
    citizenship: "Nigerian",
    isEligible: true,
    eligibilityReason: "Meets all requirements",
  },
  {
    id: "7",
    studentId: "PHY/2020/034",
    studentName: "David Brown",
    department: "Physics",
    level: "400",
    cgpa: 3.7,
    graduationDate: "2024-05-15",
    age: 26,
    citizenship: "American",
    isEligible: false,
    eligibilityReason: "Non-Nigerian citizen",
  },
  {
    id: "8",
    studentId: "AGR/2020/056",
    studentName: "Amina Yusuf",
    department: "Agriculture",
    level: "400",
    cgpa: 2.8,
    graduationDate: "2024-05-15",
    age: 27,
    citizenship: "Nigerian",
    isEligible: true,
    eligibilityReason: "Meets all requirements",
  },
];

const getEligibilityBadge = (isEligible: boolean) => {
  return isEligible ? (
    <Badge variant="default">Eligible</Badge>
  ) : (
    <Badge variant="destructive">Not Eligible</Badge>
  );
};

export default function NYSC() {
  const [students] = useState<NYSCEligibleStudent[]>(mockNYSCStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");

  const eligibleStudents = students.filter((student) => student.isEligible);
  const notEligibleStudents = students.filter((student) => !student.isEligible);

  const filterStudents = (studentList: NYSCEligibleStudent[]) => {
    return studentList.filter((student) => {
      const matchesSearch = `${student.studentName} ${student.studentId}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesDepartment =
        !departmentFilter ||
        departmentFilter === "all" ||
        student.department === departmentFilter;

      return matchesSearch && matchesDepartment;
    });
  };

  const filteredEligibleStudents = filterStudents(eligibleStudents);
  const filteredNotEligibleStudents = filterStudents(notEligibleStudents);

  const StudentTable = ({
    students,
    showEligibilityReason = false,
  }: {
    students: NYSCEligibleStudent[];
    showEligibilityReason?: boolean;
  }) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>CGPA</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Graduation Date</TableHead>
            <TableHead>Eligibility Status</TableHead>
            {showEligibilityReason && <TableHead>Reason</TableHead>}
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={showEligibilityReason ? 9 : 8}
                className="text-center text-muted-foreground"
              >
                No students found
              </TableCell>
            </TableRow>
          ) : (
            students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{student.studentName}</div>
                    <div className="text-sm text-muted-foreground">
                      {student.studentId}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{student.department}</TableCell>
                <TableCell>{student.level}</TableCell>
                <TableCell>
                  <div className="font-medium">{student.cgpa.toFixed(2)}</div>
                </TableCell>
                <TableCell>{student.age} years</TableCell>
                <TableCell>
                  {student.graduationDate
                    ? new Date(student.graduationDate).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>{getEligibilityBadge(student.isEligible)}</TableCell>
                {showEligibilityReason && (
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {student.eligibilityReason}
                    </div>
                  </TableCell>
                )}
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">NYSC Eligibility</h1>
        <p className="text-muted-foreground">
          View students eligible and not eligible for National Youth Service
          Corps
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-green-600">
            {eligibleStudents.length}
          </div>
          <p className="text-sm text-muted-foreground">Eligible Students</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-red-600">
            {notEligibleStudents.length}
          </div>
          <p className="text-sm text-muted-foreground">Not Eligible Students</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-blue-600">
            {students.length}
          </div>
          <p className="text-sm text-muted-foreground">
            Total Students Reviewed
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
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

      {/* Eligibility Tabs */}
      <Tabs defaultValue="eligible" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="eligible">
            Eligible Students ({filteredEligibleStudents.length})
          </TabsTrigger>
          <TabsTrigger value="not-eligible">
            Not Eligible Students ({filteredNotEligibleStudents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="eligible" className="space-y-4">
          <div className="rounded-lg border p-4 bg-green-50">
            <h3 className="font-semibold text-green-800 mb-2">
              NYSC Eligibility Criteria
            </h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Nigerian citizen</li>
              <li>• Age 30 years and below at graduation</li>
              <li>• Minimum CGPA of 2.5</li>
              <li>• Completed degree program</li>
            </ul>
          </div>
          <StudentTable students={filteredEligibleStudents} />
        </TabsContent>

        <TabsContent value="not-eligible" className="space-y-4">
          <div className="rounded-lg border p-4 bg-red-50">
            <h3 className="font-semibold text-red-800 mb-2">
              Common Ineligibility Reasons
            </h3>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Above age limit (over 30 years)</li>
              <li>• CGPA below minimum requirement (below 2.5)</li>
              <li>• Non-Nigerian citizenship</li>
              <li>• Medical exemption</li>
            </ul>
          </div>
          <StudentTable
            students={filteredNotEligibleStudents}
            showEligibilityReason={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
