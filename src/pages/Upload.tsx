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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Upload as UploadIcon,
  FileText,
  Users,
  CheckCircle,
  AlertCircle,
  Download,
  Trash2,
  Eye,
} from "lucide-react";
import { departments, levels, semesters, academicYears } from "@/lib/mock-data";

interface UploadFile {
  id: string;
  name: string;
  type: "results" | "admissions";
  size: string;
  uploadDate: string;
  status: "uploading" | "completed" | "failed";
  progress: number;
  metadata?: {
    department?: string;
    level?: string;
    semester?: string;
    academicYear?: string;
    recordCount?: number;
  };
}

const mockUploadHistory: UploadFile[] = [
  {
    id: "1",
    name: "computer_science_400_results_2023.xlsx",
    type: "results",
    size: "2.1 MB",
    uploadDate: "2024-01-15",
    status: "completed",
    progress: 100,
    metadata: {
      department: "Computer Science",
      level: "400",
      semester: "First",
      academicYear: "2023/2024",
      recordCount: 150,
    },
  },
  {
    id: "2",
    name: "admission_list_2024.csv",
    type: "admissions",
    size: "856 KB",
    uploadDate: "2024-01-10",
    status: "completed",
    progress: 100,
    metadata: {
      recordCount: 450,
    },
  },
];

export default function Upload() {
  const [uploadHistory, setUploadHistory] =
    useState<UploadFile[]>(mockUploadHistory);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Results upload form state
  const [resultsFormData, setResultsFormData] = useState({
    department: "",
    level: "",
    semester: "",
    academicYear: "",
    description: "",
  });

  // Admissions upload form state
  const [admissionsFormData, setAdmissionsFormData] = useState({
    academicYear: "",
    description: "",
  });

  const handleFileUpload = async (
    file: File,
    type: "results" | "admissions",
    metadata: any,
  ) => {
    if (!file) return;

    const newUploadFile: UploadFile = {
      id: Date.now().toString(),
      name: file.name,
      type,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      uploadDate: new Date().toISOString().split("T")[0],
      status: "uploading",
      progress: 0,
      metadata,
    };

    setUploadHistory([newUploadFile, ...uploadHistory]);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setUploadProgress(i);
      setUploadHistory((prev) =>
        prev.map((item) =>
          item.id === newUploadFile.id
            ? {
                ...item,
                progress: i,
                status: i === 100 ? "completed" : "uploading",
              }
            : item,
        ),
      );
    }

    setIsUploading(false);
    setUploadProgress(0);
  };

  const handleResultsUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file, "results", {
        ...resultsFormData,
        recordCount: Math.floor(Math.random() * 200) + 50, // Mock record count
      });
    }
  };

  const handleAdmissionsUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file, "admissions", {
        ...admissionsFormData,
        recordCount: Math.floor(Math.random() * 500) + 100, // Mock record count
      });
    }
  };

  const handleDeleteUpload = (id: string) => {
    setUploadHistory(uploadHistory.filter((item) => item.id !== id));
  };

  const getStatusIcon = (status: UploadFile["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "uploading":
        return <UploadIcon className="h-4 w-4 text-blue-600 animate-pulse" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: UploadFile["type"]) => {
    return type === "results" ? (
      <FileText className="h-4 w-4 text-blue-600" />
    ) : (
      <Users className="h-4 w-4 text-green-600" />
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload</h1>
        <p className="text-muted-foreground">
          Upload results and admission lists to the system
        </p>
      </div>

      <Tabs defaultValue="results" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="results">Upload Results</TabsTrigger>
          <TabsTrigger value="admissions">Upload Admissions</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Upload Results
              </CardTitle>
              <CardDescription>
                Upload student examination results in Excel or CSV format
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={resultsFormData.department}
                    onValueChange={(value) =>
                      setResultsFormData({
                        ...resultsFormData,
                        department: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
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
                  <Select
                    value={resultsFormData.level}
                    onValueChange={(value) =>
                      setResultsFormData({ ...resultsFormData, level: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level} Level
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select
                    value={resultsFormData.semester}
                    onValueChange={(value) =>
                      setResultsFormData({
                        ...resultsFormData,
                        semester: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map((semester) => (
                        <SelectItem key={semester} value={semester}>
                          {semester} Semester
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="academicYear">Academic Year</Label>
                  <Select
                    value={resultsFormData.academicYear}
                    onValueChange={(value) =>
                      setResultsFormData({
                        ...resultsFormData,
                        academicYear: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select academic year" />
                    </SelectTrigger>
                    <SelectContent>
                      {academicYears.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add any additional notes about this upload..."
                  value={resultsFormData.description}
                  onChange={(e) =>
                    setResultsFormData({
                      ...resultsFormData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="results-file">Upload Results File</Label>
                <Input
                  id="results-file"
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleResultsUpload}
                  disabled={isUploading}
                />
                <p className="text-sm text-muted-foreground">
                  Accepted formats: Excel (.xlsx, .xls) or CSV (.csv)
                </p>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Upload Admission List
              </CardTitle>
              <CardDescription>
                Upload admission lists in Excel or CSV format
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="admission-academic-year">Academic Year</Label>
                  <Select
                    value={admissionsFormData.academicYear}
                    onValueChange={(value) =>
                      setAdmissionsFormData({
                        ...admissionsFormData,
                        academicYear: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select academic year" />
                    </SelectTrigger>
                    <SelectContent>
                      {academicYears.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admission-description">
                  Description (Optional)
                </Label>
                <Textarea
                  id="admission-description"
                  placeholder="Add any additional notes about this admission list..."
                  value={admissionsFormData.description}
                  onChange={(e) =>
                    setAdmissionsFormData({
                      ...admissionsFormData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admissions-file">Upload Admission List</Label>
                <Input
                  id="admissions-file"
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleAdmissionsUpload}
                  disabled={isUploading}
                />
                <p className="text-sm text-muted-foreground">
                  Accepted formats: Excel (.xlsx, .xls) or CSV (.csv)
                </p>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Upload History */}
      <Card>
        <CardHeader>
          <CardTitle>Upload History</CardTitle>
          <CardDescription>View and manage your recent uploads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uploadHistory.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No uploads yet
              </div>
            ) : (
              uploadHistory.map((upload) => (
                <div
                  key={upload.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getTypeIcon(upload.type)}
                    <div>
                      <div className="font-medium">{upload.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {upload.size} •{" "}
                        {new Date(upload.uploadDate).toLocaleDateString()}
                        {upload.metadata?.recordCount && (
                          <span> • {upload.metadata.recordCount} records</span>
                        )}
                      </div>
                      {upload.metadata?.department && (
                        <div className="text-sm text-muted-foreground">
                          {upload.metadata.department} • {upload.metadata.level}{" "}
                          • {upload.metadata.semester} •{" "}
                          {upload.metadata.academicYear}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(upload.status)}
                    <span className="text-sm capitalize">{upload.status}</span>
                    <div className="flex gap-1 ml-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUpload(upload.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upload Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Results File Format</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • Include columns: Student ID, Student Name, Course Code,
                  Grade
                </li>
                <li>• Use standard grade format (A, B, C, D, E, F)</li>
                <li>• Ensure no duplicate entries</li>
                <li>• Maximum file size: 10MB</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Admission List Format</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • Include columns: Full Name, Email, Department, Program
                </li>
                <li>• Use valid email addresses</li>
                <li>• Ensure department names match system</li>
                <li>• Maximum file size: 10MB</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
