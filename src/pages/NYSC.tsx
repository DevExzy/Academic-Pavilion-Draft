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
import { MoreHorizontal, Search, Eye, Download, Plus } from "lucide-react";
import { mockNYSCRecords, departments } from "@/lib/mock-data";
import { NYSCRecord } from "@/types";

const getStatusBadge = (status: NYSCRecord["status"]) => {
  switch (status) {
    case "mobilized":
      return <Badge variant="secondary">Mobilized</Badge>;
    case "serving":
      return <Badge variant="default">Serving</Badge>;
    case "completed":
      return <Badge variant="outline">Completed</Badge>;
    case "exempted":
      return <Badge variant="destructive">Exempted</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "FCT",
];

export default function NYSC() {
  const [nyscRecords, setNyscRecords] = useState<NYSCRecord[]>(mockNYSCRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [batchYearFilter, setBatchYearFilter] = useState<string>("all");

  const filteredRecords = nyscRecords.filter((record) => {
    const matchesSearch =
      `${record.studentName} ${record.studentId} ${record.callUpNumber}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      !statusFilter || statusFilter === "all" || record.status === statusFilter;
    const matchesState =
      !stateFilter || stateFilter === "all" || record.state === stateFilter;
    const matchesBatchYear =
      !batchYearFilter ||
      batchYearFilter === "all" ||
      record.batchYear === batchYearFilter;

    return matchesSearch && matchesStatus && matchesState && matchesBatchYear;
  });
  const mobilizedCount = nyscRecords.filter(
    (r) => r.status === "mobilized",
  ).length;
  const servingCount = nyscRecords.filter((r) => r.status === "serving").length;
  const completedCount = nyscRecords.filter(
    (r) => r.status === "completed",
  ).length;
  const exemptedCount = nyscRecords.filter(
    (r) => r.status === "exempted",
  ).length;

  const batchYears = Array.from(
    new Set(nyscRecords.map((r) => r.batchYear)),
  ).sort();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">NYSC Records</h1>
        <p className="text-muted-foreground">
          Manage National Youth Service Corps records
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-blue-600">
            {mobilizedCount}
          </div>
          <p className="text-sm text-muted-foreground">Mobilized</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-green-600">
            {servingCount}
          </div>
          <p className="text-sm text-muted-foreground">Currently Serving</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-gray-600">
            {completedCount}
          </div>
          <p className="text-sm text-muted-foreground">Completed Service</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-orange-600">
            {exemptedCount}
          </div>
          <p className="text-sm text-muted-foreground">Exempted</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search NYSC records..."
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
            <SelectItem value="mobilized">Mobilized</SelectItem>
            <SelectItem value="serving">Serving</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="exempted">Exempted</SelectItem>
          </SelectContent>
        </Select>
        <Select value={stateFilter} onValueChange={setStateFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All States" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            {nigerianStates.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={batchYearFilter} onValueChange={setBatchYearFilter}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Batch Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {batchYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* NYSC Records Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Call-up Number</TableHead>
              <TableHead>Primary Assignment</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Batch Year</TableHead>
              <TableHead>Service Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center text-muted-foreground"
                >
                  No NYSC records found
                </TableCell>
              </TableRow>
            ) : (
              filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{record.studentName}</div>
                      <div className="text-sm text-muted-foreground">
                        {record.studentId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell className="font-mono">
                    {record.callUpNumber}
                  </TableCell>
                  <TableCell>{record.primaryAssignment}</TableCell>
                  <TableCell>{record.state}</TableCell>
                  <TableCell>{record.batchYear}</TableCell>
                  <TableCell>{record.serviceYear}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
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
                          <Download className="mr-2 h-4 w-4" />
                          Download Certificate
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
    </div>
  );
}
