"use client";

import React, { useState } from "react";
import { SoftwareTool, CategorySection, FeatureStatus } from "@/types/software";
import { calculateFeatureScore, getGitHubPopularityStatus } from "@/lib/comparison-utils";
import { FeatureStatusCell } from "./feature-status-cell";
import { ChevronDown, ChevronRight, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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
    <div className="w-full overflow-x-auto border rounded-md">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-muted/50 sticky top-0 z-10 backdrop-blur-sm">
          <tr>
            <th className="px-6 py-4 font-medium text-muted-foreground w-64 min-w-[200px]">Category</th>
            {data.map((tool) => (
              <th key={tool.id} className="px-6 py-4 font-bold text-base min-w-[200px]">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Link href={tool.website} target="_blank" className="hover:underline flex items-center gap-1">
                      {tool.name} <ExternalLink className="h-3 w-3 opacity-50" />
                    </Link>
                  </div>
                  <div className="text-xs font-normal text-muted-foreground normal-case line-clamp-2">
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
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => toggleCategory("github")}
          >
            <td className="px-6 py-4 font-medium flex items-center gap-2">
              {openCategory === "github" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              GitHub Popularity
            </td>
            {data.map((tool) => (
              <td key={tool.id} className="px-6 py-4">
                 <span className="font-medium">{getGitHubPopularityStatus(tool)}</span>
              </td>
            ))}
          </tr>
          {openCategory === "github" && (
            <>
              <tr className="bg-muted/10">
                <td className="px-6 py-3 pl-12 text-muted-foreground">Stars</td>
                {data.map((tool) => (
                  <td key={tool.id} className="px-6 py-3">
                    {tool.githubStats ? (
                        <div className="flex items-center gap-1">
                            <Github className="h-3 w-3" />
                            {tool.githubStats.stars.toLocaleString()}
                        </div>
                    ) : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-muted/10">
                <td className="px-6 py-3 pl-12 text-muted-foreground">Forks</td>
                {data.map((tool) => (
                  <td key={tool.id} className="px-6 py-3">
                    {tool.githubStats ? tool.githubStats.forks.toLocaleString() : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-muted/10">
                <td className="px-6 py-3 pl-12 text-muted-foreground">Last Commit</td>
                {data.map((tool) => (
                  <td key={tool.id} className="px-6 py-3">
                    {tool.githubStats ? tool.githubStats.lastCommit : "-"}
                  </td>
                ))}
              </tr>
              <tr className="bg-muted/10">
                <td className="px-6 py-3 pl-12 text-muted-foreground">License</td>
                {data.map((tool) => (
                  <td key={tool.id} className="px-6 py-3">
                    <Badge variant={tool.openSource ? "default" : "secondary"}>
                      {tool.license}
                    </Badge>
                  </td>
                ))}
              </tr>
               <tr className="bg-muted/10">
                <td className="px-6 py-3 pl-12 text-muted-foreground">Open Source</td>
                {data.map((tool) => (
                  <td key={tool.id} className="px-6 py-3">
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
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleCategory(section.id)}
            >
              <td className="px-6 py-4 font-medium flex items-center gap-2">
                {openCategory === section.id ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                {section.label}
              </td>
              {data.map((tool) => {
                // Construct features object for this section
                const sectionFeatures: Record<string, FeatureStatus | undefined> = {};
                section.items.forEach(item => {
                    sectionFeatures[item.key] = getNestedValue(tool, item.key);
                });

                const { score, total } = calculateFeatureScore(sectionFeatures);
                return (
                  <td key={tool.id} className="px-6 py-4 font-medium">
                    {score}/{total}
                  </td>
                );
              })}
            </tr>
            {openCategory === section.id && section.items.map((item) => (
              <tr key={item.key} className="bg-muted/10">
                <td className="px-6 py-3 pl-12 text-muted-foreground">{item.label}</td>
                {data.map((tool) => {
                  const status = getNestedValue(tool, item.key);
                  return (
                    <td key={tool.id} className="px-6 py-3">
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
  );
}
