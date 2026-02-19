"use client";

import React, { useState } from "react";
import { SoftwareTool, CategorySection, FeatureStatus } from "@/types/software";
import {
  calculateFeatureScore,
  getGitHubPopularityStatus,
  getStarsEmote,
  getForksEmote,
  getActivityEmote,
  getLicenseColor
} from "@/lib/comparison-utils";
import { FeatureStatusCell } from "./feature-status-cell";
import { ChevronDown, ChevronRight, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ComparisonTableProps {
  data: SoftwareTool[];
  sections: CategorySection[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

export function ComparisonTable({ data, sections }: ComparisonTableProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  return (
    <div className="w-full border rounded-lg shadow-sm bg-background flex flex-col">
      <div className="overflow-auto relative max-h-[80vh]">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-xs uppercase bg-muted/90 sticky top-0 z-40 backdrop-blur-md shadow-sm">
            <tr>
              <th className="px-4 md:px-6 py-4 font-medium text-muted-foreground w-64 min-w-[200px] sticky left-0 z-50 bg-background/95 backdrop-blur-md border-b border-r shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                Category
              </th>
              {data.map((tool) => (
                <th key={tool.id} className="px-4 md:px-6 py-4 font-bold text-base min-w-[220px] border-b bg-muted/50">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 justify-between">
                      <Link href={tool.website} target="_blank" className="hover:underline flex items-center gap-1 transition-colors hover:text-primary">
                        {tool.name} <ExternalLink className="h-3 w-3 opacity-50" />
                      </Link>
                      {tool.repository && (
                        <Link href={tool.repository} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-background/50">
                           <Github className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                    <div className="text-xs font-normal text-muted-foreground normal-case line-clamp-2 h-8">
                      {tool.description}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* GitHub Popularity Section */}
          <tbody className="border-b last:border-0">
            <tr
              className="cursor-pointer group transition-colors hover:bg-muted"
              onClick={() => toggleCategory("github")}
            >
              <td className="sticky left-0 z-30 bg-background group-hover:bg-muted border-r px-4 md:px-6 py-4 font-medium flex items-center gap-2 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] transition-colors">
                {openCategory === "github" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                GitHub Popularity
              </td>
              {data.map((tool) => (
                <td key={tool.id} className="px-4 md:px-6 py-4">
                  <span className="font-medium">{getGitHubPopularityStatus(tool)}</span>
                </td>
              ))}
            </tr>
            {openCategory === "github" && (
              <>
                <tr className="bg-muted/5 group/row">
                  <td className="sticky left-0 z-20 bg-background/95 backdrop-blur-sm border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">Stars</td>
                  {data.map((tool) => (
                    <td key={tool.id} className="px-4 md:px-6 py-3 bg-muted/5 group-hover/row:bg-muted/10 transition-colors">
                      {tool.githubStats ? (
                          <div className="flex items-center gap-2">
                              <Github className="h-3 w-3 opacity-70" />
                              <span>{tool.githubStats.stars.toLocaleString()}</span>
                              <span>{getStarsEmote(tool.githubStats.stars)}</span>
                          </div>
                      ) : "-"}
                    </td>
                  ))}
                </tr>
                <tr className="bg-muted/5 group/row">
                  <td className="sticky left-0 z-20 bg-background/95 backdrop-blur-sm border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">Forks</td>
                  {data.map((tool) => (
                    <td key={tool.id} className="px-4 md:px-6 py-3 bg-muted/5 group-hover/row:bg-muted/10 transition-colors">
                      {tool.githubStats ? (
                        <div className="flex items-center gap-2">
                          <span>{tool.githubStats.forks.toLocaleString()}</span>
                          <span>{getForksEmote(tool.githubStats.forks)}</span>
                        </div>
                      ) : "-"}
                    </td>
                  ))}
                </tr>
                <tr className="bg-muted/5 group/row">
                  <td className="sticky left-0 z-20 bg-background/95 backdrop-blur-sm border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">Last Commit</td>
                  {data.map((tool) => (
                    <td key={tool.id} className="px-4 md:px-6 py-3 bg-muted/5 group-hover/row:bg-muted/10 transition-colors">
                      {tool.githubStats ? (
                        <div className="flex items-center gap-2">
                          <span>{tool.githubStats.lastCommit}</span>
                          <span>{getActivityEmote(tool.githubStats.lastCommit)}</span>
                        </div>
                      ) : "-"}
                    </td>
                  ))}
                </tr>
                <tr className="bg-muted/5 group/row">
                  <td className="sticky left-0 z-20 bg-background/95 backdrop-blur-sm border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">License</td>
                  {data.map((tool) => (
                    <td key={tool.id} className="px-4 md:px-6 py-3 bg-muted/5 group-hover/row:bg-muted/10 transition-colors">
                      <Badge variant="outline" className={getLicenseColor(tool.license)}>
                        {tool.license}
                      </Badge>
                    </td>
                  ))}
                </tr>
                 <tr className="bg-muted/5 group/row">
                  <td className="sticky left-0 z-20 bg-background/95 backdrop-blur-sm border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">Open Source</td>
                  {data.map((tool) => (
                    <td key={tool.id} className="px-4 md:px-6 py-3 bg-muted/5 group-hover/row:bg-muted/10 transition-colors">
                      <FeatureStatusCell status={tool.openSource ? "Yes" : "No"} />
                    </td>
                  ))}
                </tr>
              </>
            )}
          </tbody>

          {/* Feature Sections */}
          {sections.map((section) => (
            <tbody key={section.id} className="border-b last:border-0">
              <tr
                className="cursor-pointer group transition-colors hover:bg-muted"
                onClick={() => toggleCategory(section.id)}
              >
                <td className="sticky left-0 z-30 bg-background group-hover:bg-muted border-r px-4 md:px-6 py-4 font-medium flex items-center gap-2 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] transition-colors">
                  {openCategory === section.id ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  {section.label}
                </td>
                {data.map((tool) => {
                  const sectionFeatures: Record<string, FeatureStatus | undefined> = {};
                  section.items.forEach(item => {
                      sectionFeatures[item.key] = getNestedValue(tool, item.key);
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
              {openCategory === section.id && section.items.map((item) => (
                <tr key={item.key} className="bg-muted/5 group/row">
                  <td className="sticky left-0 z-20 bg-background/95 backdrop-blur-sm border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
                    {item.label}
                  </td>
                  {data.map((tool) => {
                    const status = getNestedValue(tool, item.key);
                    return (
                      <td key={tool.id} className="px-4 md:px-6 py-3 bg-muted/5 group-hover/row:bg-muted/10 transition-colors">
                        <FeatureStatusCell status={status} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
