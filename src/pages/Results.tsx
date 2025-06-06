import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResultsSearch,
  SearchFilters,
} from "@/components/results/ResultsSearch";
import {
  ResultsTable,
  ResultDetailDialog,
} from "@/components/results/ResultsTable";
import { mockResults } from "@/lib/mock-data";
import { Result } from "@/types";

export default function Results() {
  const [results, setResults] = useState<Result[]>(mockResults);
  const [filteredResults, setFilteredResults] = useState<Result[]>(mockResults);
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);
  const [showResultDialog, setShowResultDialog] = useState(false);

  const handleSearch = (filters: SearchFilters) => {
    let filtered = results;

    // Filter by search term
    if (filters.searchTerm) {
      filtered = filtered.filter(
        (result) =>
          result.studentName
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          result.studentId
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()),
      );
    }

    // Filter by department
    if (filters.department && filters.department !== "all") {
      filtered = filtered.filter(
        (result) => result.department === filters.department,
      );
    }

    // Filter by level
    if (filters.level && filters.level !== "all") {
      filtered = filtered.filter((result) => result.level === filters.level);
    }

    // Filter by semester
    if (filters.semester && filters.semester !== "all") {
      filtered = filtered.filter(
        (result) => result.semester === filters.semester,
      );
    }

    // Filter by academic year
    if (filters.academicYear && filters.academicYear !== "all") {
      filtered = filtered.filter(
        (result) => result.academicYear === filters.academicYear,
      );
    }

    setFilteredResults(filtered);
  };

  const handleViewResult = (result: Result) => {
    setSelectedResult(result);
    setShowResultDialog(true);
  };

  const handleDownloadResult = (result: Result) => {
    console.log("Download result:", result);
    // Implement download logic
  };

  const handleApproveResult = (result: Result) => {
    console.log("Approve result:", result);
    // Implement approve logic
    const updatedResults = results.map((r) =>
      r.id === result.id
        ? {
            ...r,
            status: "senate-approved" as const,
            approvedBy: "Current User",
            approvedDate: new Date().toISOString(),
          }
        : r,
    );
    setResults(updatedResults);
    setFilteredResults(updatedResults);
  };

  const realTimeResults = filteredResults.filter(
    (result) => result.status === "real-time",
  );
  const senateApprovedResults = filteredResults.filter(
    (result) => result.status === "senate-approved",
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Results</h1>
        <p className="text-muted-foreground">
          Search and manage student academic results
        </p>
      </div>

      <ResultsSearch onSearch={handleSearch} />

      <Tabs defaultValue="real-time" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="real-time">
            Real-time Results ({realTimeResults.length})
          </TabsTrigger>
          <TabsTrigger value="senate-approved">
            Senate Approved Results ({senateApprovedResults.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="real-time" className="space-y-4">
          <ResultsTable
            results={realTimeResults}
            onViewResult={handleViewResult}
            onDownloadResult={handleDownloadResult}
            onApproveResult={handleApproveResult}
          />
        </TabsContent>

        <TabsContent value="senate-approved" className="space-y-4">
          <ResultsTable
            results={senateApprovedResults}
            onViewResult={handleViewResult}
            onDownloadResult={handleDownloadResult}
          />
        </TabsContent>
      </Tabs>

      {selectedResult && (
        <ResultDetailDialog
          result={selectedResult}
          open={showResultDialog}
          onOpenChange={setShowResultDialog}
        />
      )}
    </div>
  );
}
