import {
  Student,
  Result,
  Admission,
  NYSCRecord,
  AcademicScholar,
  User,
  UserRole,
  DashboardStats,
  CourseResult,
} from "@/types";

export const mockStudents: Student[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    studentId: "STU001",
    department: "Computer Science",
    level: "400",
    status: "active",
    enrollmentDate: "2021-09-01",
    cgpa: 4.2,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@university.edu",
    studentId: "STU002",
    department: "Engineering",
    level: "300",
    status: "active",
    enrollmentDate: "2022-09-01",
    cgpa: 3.8,
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.johnson@alumni.university.edu",
    studentId: "STU003",
    department: "Business Administration",
    level: "400",
    status: "graduated",
    enrollmentDate: "2020-09-01",
    graduationDate: "2024-05-15",
    cgpa: 3.9,
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@university.edu",
    studentId: "STU004",
    department: "Mathematics",
    level: "200",
    status: "probation",
    enrollmentDate: "2023-09-01",
    cgpa: 2.1,
  },
];

export const mockCourseResults: CourseResult[] = [
  {
    courseCode: "CSC301",
    courseTitle: "Data Structures and Algorithms",
    creditUnits: 3,
    grade: "A",
    gradePoint: 4.0,
  },
  {
    courseCode: "CSC302",
    courseTitle: "Database Management Systems",
    creditUnits: 3,
    grade: "B+",
    gradePoint: 3.5,
  },
];

export const mockResults: Result[] = [
  {
    id: "1",
    studentId: "STU001",
    studentName: "John Doe",
    department: "Computer Science",
    level: "400",
    semester: "First",
    academicYear: "2023/2024",
    courses: mockCourseResults,
    cgpa: 4.2,
    status: "senate-approved",
    approvedBy: "Prof. Adams",
    approvedDate: "2024-01-15",
  },
  {
    id: "2",
    studentId: "STU002",
    studentName: "Jane Smith",
    department: "Engineering",
    level: "300",
    semester: "First",
    academicYear: "2023/2024",
    courses: mockCourseResults,
    cgpa: 3.8,
    status: "real-time",
  },
];

export const mockAdmissions: Admission[] = [
  {
    id: "1",
    applicationNumber: "APP001",
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@email.com",
    department: "Computer Science",
    program: "Bachelor of Science",
    applicationDate: "2024-01-15",
    status: "pending",
    score: 85,
  },
  {
    id: "2",
    applicationNumber: "APP002",
    firstName: "Lisa",
    lastName: "Wilson",
    email: "lisa.wilson@email.com",
    department: "Engineering",
    program: "Bachelor of Engineering",
    applicationDate: "2024-01-20",
    status: "admitted",
    admissionDate: "2024-02-01",
    score: 92,
  },
];

export const mockNYSCRecords: NYSCRecord[] = [
  {
    id: "1",
    studentId: "STU003",
    studentName: "Mike Johnson",
    department: "Business Administration",
    batchYear: "2024",
    callUpNumber: "BA/24/001",
    primaryAssignment: "Ministry of Education",
    state: "Lagos",
    status: "serving",
    serviceYear: "2024/2025",
  },
];

export const mockAcademicScholars: AcademicScholar[] = [
  {
    id: "1",
    studentId: "STU001",
    studentName: "John Doe",
    department: "Computer Science",
    level: "400",
    scholarshipType: "Merit-based",
    amount: 500000,
    academicYear: "2023/2024",
    cgpa: 4.2,
    status: "active",
    awardDate: "2023-09-01",
  },
];

export const mockUserRoles: UserRole[] = [
  {
    id: "1",
    name: "Super Admin",
    permissions: [
      { id: "1", name: "Manage Users", resource: "users", action: "manage" },
      { id: "2", name: "View Students", resource: "students", action: "view" },
      {
        id: "3",
        name: "Manage Results",
        resource: "results",
        action: "manage",
      },
    ],
  },
  {
    id: "2",
    name: "Academic Officer",
    permissions: [
      { id: "2", name: "View Students", resource: "students", action: "view" },
      { id: "4", name: "View Results", resource: "results", action: "view" },
    ],
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    firstName: "Admin",
    lastName: "User",
    email: "admin@university.edu",
    role: mockUserRoles[0],
    lastLogin: "2024-01-20T10:00:00Z",
    status: "active",
  },
  {
    id: "2",
    firstName: "Academic",
    lastName: "Officer",
    email: "academic@university.edu",
    role: mockUserRoles[1],
    department: "Academic Affairs",
    lastLogin: "2024-01-19T14:30:00Z",
    status: "active",
  },
];

export const mockDashboardStats: DashboardStats = {
  totalStudents: 15420,
  activeStudents: 12350,
  graduatedStudents: 2870,
  probationStudents: 200,
  pendingAdmissions: 450,
  totalScholarships: 120,
  totalRevenue: 2500000000,
  newEnrollments: 3200,
};

export const departments = [
  "Computer Science",
  "Engineering",
  "Business Administration",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Medicine",
  "Law",
  "Education",
  "Agriculture",
  "Arts",
];

export const levels = ["100", "200", "300", "400", "500", "600"];

export const semesters = ["First", "Second"];

export const academicYears = [
  "2023/2024",
  "2022/2023",
  "2021/2022",
  "2020/2021",
];
