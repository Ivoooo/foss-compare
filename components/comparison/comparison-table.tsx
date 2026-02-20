"use client";

import React, { useState, useMemo, useEffect } from "react";
import { SoftwareTool, CategorySection, FeatureStatus } from "@/types/software";
import { calculateFeatureScore } from "@/lib/comparison-utils";
import { FeatureStatusCell } from "./feature-status-cell";
import { GitHubPopularitySection } from "./github-popularity-section";
import { ComparisonFilter } from "./comparison-filter";
import { ChevronDown, ChevronRight, Github, ExternalLink, Search, X } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ComparisonTableProps {
  data: SoftwareTool[];
  sections: CategorySection[];
}

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce((acc, part) => (acc as Record<string, unknown>)?.[part], obj);
}

export function ComparisonTable({ data, sections }: ComparisonTableProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Set<string>>(new Set());

  const toggleCategory = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleFilterChange = (filterId: string) => {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(filterId)) {
        next.delete(filterId);
      } else {
        next.add(filterId);
      }
      return next;
    });
  };

  const handleResetFilters = () => {
    setFilters(new Set());
  };

  const filteredData = useMemo(() => {
    return data.filter((tool) => {
      // Check filters
      for (const filterId of filters) {
        const status = getNestedValue(tool, filterId);
        // "Yes" and "Paid" are considered match.
        // FeatureStatus can be string or object.
        // We consider "Yes" and "Paid" as satisfying the requirement.
        // We could also consider "Partial" depending on strictness, but let's stick to positive affirmation.
        let statusStr = "";
        if (typeof status === "string") {
            statusStr = status;
        } else if (status && typeof status === "object" && "status" in status) {
            const statusObj = status as Record<string, unknown>;
            if (typeof statusObj.status === "string") {
                statusStr = statusObj.status;
            }
        }

        if (statusStr !== "Yes" && statusStr !== "Paid") {
          return false;
        }
      }
      return true;
    });
  }, [data, filters]);

  useEffect(() => {
    // Only search/expand if query is at least 2 characters
    if (searchQuery.length < 2) return;

    const lowerQuery = searchQuery.toLowerCase();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setExpandedSections(() => {
      const next = new Set<string>();

      // Check GitHub section
      if (
        "github popularity".includes(lowerQuery) ||
        "stars".includes(lowerQuery) ||
        "forks".includes(lowerQuery) ||
        "last commit".includes(lowerQuery) ||
        "license".includes(lowerQuery) ||
        "open source".includes(lowerQuery)
      ) {
        next.add("github");
      }

      sections.forEach((section) => {
        const sectionMatch = section.label.toLowerCase().includes(lowerQuery);
        const itemsMatch = section.items.some((item) =>
          item.label.toLowerCase().includes(lowerQuery)
        );

        if (sectionMatch || itemsMatch) {
          next.add(section.id);
        }
      });

      return next;
    });
  }, [searchQuery, sections]);

  const isMatch = (text: string) => {
    if (!searchQuery || searchQuery.length < 2) return false;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  // Calculate maximum stars and forks for relative popularity
  const { maxStars, maxForks } = useMemo(() => {
    let maxS = 0;
    let maxF = 0;
    filteredData.forEach(tool => {
      if (tool.githubStats) {
        if (tool.githubStats.stars > maxS) maxS = tool.githubStats.stars;
        if (tool.githubStats.forks > maxF) maxF = tool.githubStats.forks;
      }
    });
    return { maxStars: maxS, maxForks: maxF };
  }, [filteredData]);

  return (
    <div className="w-full border rounded-lg shadow-sm bg-background flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 flex items-center gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search features or tools..."
            className="pl-9 pr-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <ComparisonFilter
          sections={sections}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          matchCount={filteredData.length}
        />
      </div>
      <div className="overflow-auto relative h-full">
        {filteredData.length === 0 ? (
           <div className="flex flex-col items-center justify-center p-10 text-center h-full">
             <h3 className="text-lg font-semibold">No matching tools found</h3>
             <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
             <button
                onClick={handleResetFilters}
                className="mt-4 text-primary hover:underline"
             >
               Clear all filters
             </button>
           </div>
        ) : (
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-xs uppercase bg-muted/90 sticky top-0 z-40 backdrop-blur-md shadow-sm">
            <tr>
              <th className="px-4 md:px-6 py-4 font-medium text-muted-foreground w-64 min-w-[200px] sticky left-0 z-50 bg-background/95 backdrop-blur-md border-b border-r shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                Category
              </th>
              {filteredData.map((tool) => (
                <th
                  key={tool.id}
                  className={cn(
                    "px-4 md:px-6 py-4 font-bold text-base min-w-[220px] border-b bg-muted/50 align-top transition-colors",
                    isMatch(tool.name) && "bg-yellow-100 dark:bg-yellow-900/40"
                  )}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Link href={tool.website} target="_blank" className="hover:underline flex items-center gap-1 transition-colors hover:text-primary">
                        {tool.name} <ExternalLink className="h-3 w-3 opacity-50" />
                      </Link>
                      {tool.repository && (
                        <Link href={tool.repository} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-background/50">
                           <Github className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                    {tool.notes && (
                      <div className="hidden md:block text-xs font-normal text-muted-foreground normal-case">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="max-w-[180px] truncate cursor-help">
                                {tool.notes}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs text-wrap">{tool.notes}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* GitHub Popularity Section */}
          <GitHubPopularitySection
            data={filteredData}
            maxStars={maxStars}
            maxForks={maxForks}
            isOpen={expandedSections.has("github")}
            onToggle={() => toggleCategory("github")}
          />

          {/* Feature Sections */}
          {sections.map((section) => (
            <tbody key={section.id} className="border-b last:border-0">
              <tr
                className="cursor-pointer group transition-colors hover:bg-muted"
                onClick={() => toggleCategory(section.id)}
              >
                <td
                  className={cn(
                    "sticky left-0 z-30 bg-background group-hover:bg-muted border-r px-4 md:px-6 py-4 font-medium flex items-center gap-2 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] transition-colors",
                    isMatch(section.label) && "bg-yellow-100 dark:bg-yellow-900/40"
                  )}
                >
                  {expandedSections.has(section.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  {section.label}
                </td>
                {filteredData.map((tool) => {
                  const sectionFeatures: Record<string, FeatureStatus | undefined> = {};
                  section.items.forEach(item => {
                      sectionFeatures[item.key] = getNestedValue(tool, item.key) as FeatureStatus | undefined;
                  });

                  const { score, total } = calculateFeatureScore(sectionFeatures);
                  return (
                    <td key={tool.id} className="px-4 md:px-6 py-4 font-medium">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "font-mono text-xs px-2 py-0.5 rounded-full",
                          score === total ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                          score > total / 2 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                          "bg-muted text-muted-foreground"
                        )}>
                          {score}/{total}
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
              {expandedSections.has(section.id) && section.items.map((item) => (
                <tr key={item.key} className="bg-muted/5 group/row hover:bg-muted/20 dark:hover:bg-muted/30 transition-colors">
                  <td
                    className={cn(
                      "sticky left-0 z-20 bg-background/95 backdrop-blur-sm border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors",
                      isMatch(item.label) && "bg-yellow-100 dark:bg-yellow-900/40"
                    )}
                  >
                    {item.label}
                  </td>
                  {filteredData.map((tool) => {
                    const status = getNestedValue(tool, item.key) as FeatureStatus;
                    return (
                      <td key={tool.id} className="px-4 md:px-6 py-3 bg-muted/5 group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors">
                        <FeatureStatusCell status={status} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
        )}
      </div>
    </div>
  );
}
