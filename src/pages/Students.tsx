import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { StudentTabs } from "@/components/students/StudentTabs";
import { mockStudents } from "@/lib/mock-data";
import { Student } from "@/types";

export default function Students() {
  const [students] = useState<Student[]>(mockStudents);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            Manage student records and information
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      <StudentTabs
        students={students}
        onViewStudent={handleViewStudent}
        onEditStudent={handleEditStudent}
        onDeleteStudent={handleDeleteStudent}
      />
    </div>
  );
}
