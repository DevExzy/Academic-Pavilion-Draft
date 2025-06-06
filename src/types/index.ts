export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  department: string;
  level: string;
  status: "active" | "graduated" | "probation";
  enrollmentDate: string;
  graduationDate?: string;
  cgpa: number;
  avatar?: string;
}

export interface Result {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  level: string;
  semester: string;
  academicYear: string;
  courses: CourseResult[];
  cgpa: number;
  status: "real-time" | "senate-approved";
  approvedBy?: string;
  approvedDate?: string;
}

export interface CourseResult {
  courseCode: string;
  courseTitle: string;
  creditUnits: number;
  grade: string;
  gradePoint: number;
}

export interface Admission {
  id: string;
  applicationNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  program: string;
  applicationDate: string;
  status: "pending" | "admitted" | "rejected";
  admissionDate?: string;
  score: number;
}

export interface NYSCRecord {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  batchYear: string;
  callUpNumber: string;
  primaryAssignment: string;
  state: string;
  status: "mobilized" | "serving" | "completed" | "exempted";
  serviceYear: string;
}

export interface AcademicScholar {
  id: string;
  studentId: string;
  studentName: string;
  department: string;
  level: string;
  scholarshipType: string;
  amount: number;
  academicYear: string;
  cgpa: number;
  status: "active" | "suspended" | "completed";
  awardDate: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  department?: string;
  avatar?: string;
  lastLogin: string;
  status: "active" | "inactive";
}

export interface UserRole {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: string;
}

export interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  graduatedStudents: number;
  probationStudents: number;
  pendingAdmissions: number;
  totalScholarships: number;
  totalRevenue: number;
  newEnrollments: number;
}
