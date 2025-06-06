import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentTable } from "./StudentTable";
import { Student } from "@/types";

interface StudentTabsProps {
  students: Student[];
  onViewStudent?: (student: Student) => void;
  onEditStudent?: (student: Student) => void;
  onDeleteStudent?: (student: Student) => void;
}

export function StudentTabs({
  students,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
}: StudentTabsProps) {
  const activeStudents = students.filter(
    (student) => student.status === "active",
  );
  const graduatedStudents = students.filter(
    (student) => student.status === "graduated",
  );
  const probationStudents = students.filter(
    (student) => student.status === "probation",
  );

  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="active">
          Active Students ({activeStudents.length})
        </TabsTrigger>
        <TabsTrigger value="graduated">
          Graduated Students ({graduatedStudents.length})
        </TabsTrigger>
        <TabsTrigger value="probation">
          Probation Students ({probationStudents.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="active" className="space-y-4">
        <StudentTable
          students={activeStudents}
          onViewStudent={onViewStudent}
          onEditStudent={onEditStudent}
          onDeleteStudent={onDeleteStudent}
        />
      </TabsContent>

      <TabsContent value="graduated" className="space-y-4">
        <StudentTable
          students={graduatedStudents}
          onViewStudent={onViewStudent}
          onEditStudent={onEditStudent}
          onDeleteStudent={onDeleteStudent}
        />
      </TabsContent>

      <TabsContent value="probation" className="space-y-4">
        <StudentTable
          students={probationStudents}
          onViewStudent={onViewStudent}
          onEditStudent={onEditStudent}
          onDeleteStudent={onDeleteStudent}
        />
      </TabsContent>
    </Tabs>
  );
}
