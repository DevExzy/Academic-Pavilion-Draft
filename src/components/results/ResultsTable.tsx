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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoreHorizontal, Eye, Download, CheckCircle } from "lucide-react";
import { Result } from "@/types";

interface ResultsTableProps {
  results: Result[];
  onViewResult?: (result: Result) => void;
  onDownloadResult?: (result: Result) => void;
  onApproveResult?: (result: Result) => void;
}

const getStatusBadge = (status: Result["status"]) => {
  switch (status) {
    case "real-time":
      return <Badge variant="secondary">Real-time</Badge>;
    case "senate-approved":
      return <Badge variant="default">Senate Approved</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function ResultsTable({
  results,
  onViewResult,
  onDownloadResult,
  onApproveResult,
}: ResultsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Academic Year</TableHead>
            <TableHead>CGPA</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center text-muted-foreground"
              >
                No results found
              </TableCell>
            </TableRow>
          ) : (
            results.map((result) => (
              <TableRow key={result.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{result.studentName}</div>
                    <div className="text-sm text-muted-foreground">
                      {result.studentId}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{result.department}</TableCell>
                <TableCell>{result.level}</TableCell>
                <TableCell>{result.semester}</TableCell>
                <TableCell>{result.academicYear}</TableCell>
                <TableCell>
                  <div className="font-medium">{result.cgpa.toFixed(2)}</div>
                </TableCell>
                <TableCell>{getStatusBadge(result.status)}</TableCell>
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
                      <DropdownMenuItem onClick={() => onViewResult?.(result)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDownloadResult?.(result)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Transcript
                      </DropdownMenuItem>
                      {result.status === "real-time" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onApproveResult?.(result)}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve Result
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
  );
}

interface ResultDetailDialogProps {
  result: Result;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResultDetailDialog({
  result,
  open,
  onOpenChange,
}: ResultDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Result Details - {result.studentName}</DialogTitle>
          <DialogDescription>
            {result.academicYear} {result.semester} Semester Results
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">Student Information</h4>
              <p className="text-sm text-muted-foreground">
                Student ID: {result.studentId}
              </p>
              <p className="text-sm text-muted-foreground">
                Department: {result.department}
              </p>
              <p className="text-sm text-muted-foreground">
                Level: {result.level}
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Academic Performance</h4>
              <p className="text-sm text-muted-foreground">
                CGPA: {result.cgpa.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                Status: {getStatusBadge(result.status)}
              </p>
              {result.approvedBy && (
                <p className="text-sm text-muted-foreground">
                  Approved by: {result.approvedBy}
                </p>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Course Results</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Code</TableHead>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Credit Units</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Grade Point</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.courses.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono">
                      {course.courseCode}
                    </TableCell>
                    <TableCell>{course.courseTitle}</TableCell>
                    <TableCell>{course.creditUnits}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{course.grade}</Badge>
                    </TableCell>
                    <TableCell>{course.gradePoint.toFixed(1)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
