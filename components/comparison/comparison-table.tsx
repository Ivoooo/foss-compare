"use client";

import React from "react";
import { SoftwareTool, CategorySection, FeatureStatus } from "@/lib/schemas";
import { calculateFeatureScore } from "@/lib/comparison-utils";
import { FeatureStatusCell } from "./feature-status-cell";
import { ProjectStatsSection } from "./project-stats-section";
import { ComparisonFilter } from "./comparison-filter";
import { ChevronDown, ChevronRight, ExternalLink, Search, X, Pin, PinOff, Github } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { cn, getNestedValue } from "@/lib/utils";
import { useComparisonTable } from "./use-comparison-table";
import { Button } from "@/components/ui/button";

interface ComparisonTableProps {
  data: SoftwareTool[];
  sections: CategorySection[];
}

export function ComparisonTable({ data, sections }: ComparisonTableProps) {
  const {
    searchQuery,
    setSearchQuery,
    filters,
    handleFilterChange,
    handleResetFilters,
    filteredData,
    toggleCategory,
    isSectionExpanded,
    isMatch,
    maxStars,
    maxForks,
    pinnedTools,
    togglePin,
  } = useComparisonTable({ data, sections });

  // CSS variables for responsive widths
  // Desktop: 256px (Category) + 240px (Tool)
  // Mobile: 140px (Category) + 180px (Tool)
  const catWidth = 240; // Reduced desktop width slightly for better fit
  const toolWidth = 220; // Reduced desktop width slightly
  const mobileCatWidth = 140;
  const mobileToolWidth = 180;

  return (
    <div className="w-full border rounded-lg bg-background flex flex-col flex-1 min-h-0 overflow-hidden">
      <div className="p-4 border-b bg-background flex items-center gap-4 shrink-0">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            type="text"
            placeholder="Search features or tools..."
            aria-label="Search features or tools"
            className="pl-9 pr-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
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

      <div className="flex-1 min-h-0 relative overflow-hidden flex flex-col">
        <div className="overflow-auto relative flex-1 min-h-0 scrollbar-thin scrollbar-thumb-muted">
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
            <table
              className="text-sm text-left border-separate border-spacing-0 table-fixed min-w-full isolate"
              style={{
                "--cat-w": `${catWidth}px`,
                "--tool-w": `${toolWidth}px`,
                "--m-cat-w": `${mobileCatWidth}px`,
                "--m-tool-w": `${mobileToolWidth}px`
              } as React.CSSProperties}
            >
              <colgroup>
                <col className="w-[var(--m-cat-w)] md:w-[var(--cat-w)]" />
                {filteredData.map((tool) => (
                  <col key={tool.id} className="w-[var(--m-tool-w)] md:w-[var(--tool-w)]" />
                ))}
              </colgroup>
              <thead className="text-xs uppercase bg-muted sticky top-0 z-40">
                <tr>
                  <th scope="col" className="px-4 md:px-6 py-4 font-medium text-muted-foreground bg-background border-b border-r">
                    Category
                  </th>
                  {filteredData.map((tool) => {
                    const isPinned = pinnedTools.has(tool.id);

                    return (
                      <th
                        key={tool.id}
                        scope="col"
                        className={cn(
                          "px-4 md:px-6 py-4 font-bold text-base border-b bg-muted/50 align-top transition-colors relative group",
                          isMatch(tool.name) && "bg-yellow-100 dark:bg-yellow-900/40"
                        )}
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 truncate">
                              <Link href={tool.website} target="_blank" className="hover:underline flex items-center gap-1 hover:text-primary truncate">
                                {tool.name} <ExternalLink className="h-3 w-3 shrink-0 opacity-50" aria-hidden="true" />
                              </Link>
                              {tool.repository && (
                                <Link
                                  href={tool.repository}
                                  target="_blank"
                                  className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                                  aria-label="View on GitHub"
                                >
                                  <Github className="h-4 w-4" aria-hidden="true" />
                                </Link>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={cn(
                                "h-7 w-7 shrink-0 transition-opacity",
                                isPinned ? "text-primary opacity-100" : "text-muted-foreground opacity-40 hover:opacity-100"
                              )}
                              onClick={() => togglePin(tool.id)}
                              aria-label={isPinned ? `Unpin ${tool.name}` : `Pin ${tool.name}`}
                            >
                              {isPinned ? <Pin className="h-3.5 w-3.5 fill-current" aria-hidden="true" /> : <PinOff className="h-3.5 w-3.5" aria-hidden="true" />}
                            </Button>
                          </div>
                        </div>
                      </th>
                    )
                  })}
                </tr>
              </thead>

              <ProjectStatsSection
                data={filteredData}
                maxStars={maxStars}
                maxForks={maxForks}
                pinnedTools={pinnedTools}
                isOpen={isSectionExpanded("project-stats")}
                onToggle={() => toggleCategory("project-stats")}
                isMatch={isMatch}
              />

              {sections.map((section) => (
                <tbody key={section.id} className="border-b last:border-0">
                  <tr
                    className="group transition-colors hover:bg-muted cursor-pointer"
                    onClick={() => toggleCategory(section.id)}
                  >
                    <th
                      scope="row"
                      className={cn(
                        "bg-background group-hover:bg-muted border-r p-0 font-medium border-b",
                        isMatch(section.label) && "bg-yellow-100 dark:bg-yellow-900/40"
                      )}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCategory(section.id);
                        }}
                        className="w-full h-full flex items-center gap-2 px-4 md:px-6 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                        aria-expanded={isSectionExpanded(section.id)}
                      >
                        {isSectionExpanded(section.id) ? (
                          <ChevronDown className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        )}
                        {section.label}
                      </button>
                    </th>
                    {filteredData.map((tool) => {
                      const sectionFeatures: Record<string, FeatureStatus | undefined> = {};
                      section.items.forEach(item => {
                        sectionFeatures[item.key] = getNestedValue(tool, item.key) as FeatureStatus | undefined;
                      });

                      const { score, total } = calculateFeatureScore(sectionFeatures);

                      return (
                        <td
                          key={tool.id}
                          className={cn(
                            "px-4 md:px-6 py-4 font-medium border-b"
                          )}
                        >
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
                  {isSectionExpanded(section.id) && section.items.map((item) => (
                    <tr key={item.key} className="bg-muted/5 group/row hover:bg-muted/20 transition-colors">
                      <th
                        scope="row"
                        className={cn(
                          "bg-background border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground font-normal text-left group-hover/row:bg-muted transition-colors border-b",
                          isMatch(item.label) && "bg-yellow-100 dark:bg-yellow-900/40"
                        )}
                      >
                        {item.label}
                      </th>
                      {filteredData.map((tool) => {
                        const status = getNestedValue(tool, item.key) as FeatureStatus;

                        return (
                          <td
                            key={tool.id}
                            className={cn(
                              "px-4 md:px-6 py-3 bg-muted/5 group-hover/row:bg-muted/20 transition-colors border-b"
                            )}
                          >
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
    </div>
  );
}
