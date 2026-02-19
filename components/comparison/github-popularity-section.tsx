"use client";

import React from "react";
import { SoftwareTool } from "@/types/software";
import {
  getGitHubPopularityStatus,
  getStarsEmote,
  getForksEmote,
  getActivityEmote,
  getLicenseColor
} from "@/lib/comparison-utils";
import { FeatureStatusCell } from "./feature-status-cell";
import { ChevronDown, ChevronRight, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GitHubPopularitySectionProps {
  data: SoftwareTool[];
  maxStars: number;
  maxForks: number;
  isOpen: boolean;
  onToggle: () => void;
}

export function GitHubPopularitySection({
  data,
  maxStars,
  maxForks,
  isOpen,
  onToggle,
}: GitHubPopularitySectionProps) {
  return (
    <tbody className="border-b last:border-0">
      <tr
        className="cursor-pointer group transition-colors hover:bg-muted"
        onClick={onToggle}
      >
        <td className="sticky left-0 z-30 bg-background group-hover:bg-muted border-r px-4 md:px-6 py-4 font-medium flex items-center gap-2 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] transition-colors">
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          GitHub Popularity
        </td>
        {data.map((tool) => (
          <td key={tool.id} className="px-4 md:px-6 py-4">
            <span className="font-medium">{getGitHubPopularityStatus(tool)}</span>
          </td>
        ))}
      </tr>
      {isOpen && (
        <>
          <tr className="bg-muted/5 group/row hover:bg-muted/20 dark:hover:bg-muted/30 transition-colors">
            <td className="sticky left-0 z-20 bg-background/95 backdrop-blur-sm border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors">Stars</td>
            {data.map((tool) => (
              <td key={tool.id} className="px-4 md:px-6 py-3 bg-muted/5 group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors">
                {tool.githubStats ? (
                    <div className="flex items-center gap-2">
                        <Github className="h-3 w-3 opacity-70" />
                        <span>{tool.githubStats.stars.toLocaleString()}</span>
                        <span>{getStarsEmote(tool.githubStats.stars, maxStars)}</span>
                    </div>
                ) : "-"}
              </td>
            ))}
          </tr>
          <tr className="bg-muted/5 group/row hover:bg-muted/20 dark:hover:bg-muted/30 transition-colors">
            <td className="sticky left-0 z-20 bg-background/95 backdrop-blur-sm border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors">Forks</td>
            {data.map((tool) => (
              <td key={tool.id} className="px-4 md:px-6 py-3 bg-muted/5 group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors">
                {tool.githubStats ? (
                  <div className="flex items-center gap-2">
                    <span>{tool.githubStats.forks.toLocaleString()}</span>
                    <span>{getForksEmote(tool.githubStats.forks, maxForks)}</span>
                  </div>
                ) : "-"}
              </td>
            ))}
          </tr>
          <tr className="bg-muted/5 group/row hover:bg-muted/20 dark:hover:bg-muted/30 transition-colors">
            <td className="sticky left-0 z-20 bg-background/95 backdrop-blur-sm border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors">Last Commit</td>
            {data.map((tool) => (
              <td key={tool.id} className="px-4 md:px-6 py-3 bg-muted/5 group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors">
                {tool.githubStats ? (
                  <div className="flex items-center gap-2">
                    <span>{tool.githubStats.lastCommit}</span>
                    <span>{getActivityEmote(tool.githubStats.lastCommit)}</span>
                  </div>
                ) : "-"}
              </td>
            ))}
          </tr>
          <tr className="bg-muted/5 group/row hover:bg-muted/20 dark:hover:bg-muted/30 transition-colors">
            <td className="sticky left-0 z-20 bg-background/95 backdrop-blur-sm border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors">License</td>
            {data.map((tool) => (
              <td key={tool.id} className="px-4 md:px-6 py-3 bg-muted/5 group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors">
                <Badge variant="outline" className={getLicenseColor(tool.license)}>
                  {tool.license}
                </Badge>
              </td>
            ))}
          </tr>
           <tr className="bg-muted/5 group/row hover:bg-muted/20 dark:hover:bg-muted/30 transition-colors">
            <td className="sticky left-0 z-20 bg-background/95 backdrop-blur-sm border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors">Open Source</td>
            {data.map((tool) => (
              <td key={tool.id} className="px-4 md:px-6 py-3 bg-muted/5 group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors">
                <FeatureStatusCell status={tool.openSource ? "Yes" : "No"} />
              </td>
            ))}
          </tr>
        </>
      )}
    </tbody>
  );
}
