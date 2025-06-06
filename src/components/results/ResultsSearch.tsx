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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { departments, levels, semesters, academicYears } from "@/lib/mock-data";

export interface SearchFilters {
  searchTerm: string;
  department: string;
  level: string;
  semester: string;
  academicYear: string;
  searchType: "individual" | "department" | "level";
}

interface ResultsSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

export function ResultsSearch({ onSearch }: ResultsSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: "",
    department: "all",
    level: "all",
    semester: "all",
    academicYear: "all",
    searchType: "individual",
  });

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    const resetFilters: SearchFilters = {
      searchTerm: "",
      department: "all",
      level: "all",
      semester: "all",
      academicYear: "all",
      searchType: "individual",
    };
    setFilters(resetFilters);
    onSearch(resetFilters);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Search Results
        </CardTitle>
        <CardDescription>
          Search for student results by individual, department, or level
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="searchType">Search Type</Label>
            <Select
              value={filters.searchType}
              onValueChange={(value: SearchFilters["searchType"]) =>
                handleFilterChange("searchType", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select search type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual Student</SelectItem>
                <SelectItem value="department">By Department</SelectItem>
                <SelectItem value="level">By Level</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="searchTerm">
              {filters.searchType === "individual"
                ? "Student Name/ID"
                : "Search Term"}
            </Label>
            <Input
              id="searchTerm"
              placeholder={
                filters.searchType === "individual"
                  ? "Enter student name or ID..."
                  : "Enter search term..."
              }
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              value={filters.department}
              onValueChange={(value) => handleFilterChange("department", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
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
            <Select
              value={filters.level}
              onValueChange={(value) => handleFilterChange("level", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
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

          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Select
              value={filters.semester}
              onValueChange={(value) => handleFilterChange("semester", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
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
              value={filters.academicYear}
              onValueChange={(value) =>
                handleFilterChange("academicYear", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select academic year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {academicYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSearch} className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search Results
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
