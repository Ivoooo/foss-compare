"use client";

import React, { useMemo } from "react";
import { SoftwareTool } from "@/types/software";
import {
  getGitHubPopularityStatus,
  getStarsEmote,
  getForksEmote,
  getActivityEmote,
  getLicenseColor,
  parseSizeString
} from "@/lib/comparison-utils";
import { FeatureStatusCell } from "./feature-status-cell";
import { ChevronDown, ChevronRight, Github, Code, Box, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectStatsSectionProps {
  data: SoftwareTool[];
  maxStars: number;
  maxForks: number;
  isOpen: boolean;
  onToggle: () => void;
}

export function ProjectStatsSection({
  data,
  maxStars,
  maxForks,
  isOpen,
  onToggle,
}: ProjectStatsSectionProps) {

  const minRam = useMemo(() => {
    let min = Infinity;
    data.forEach(tool => {
      const val = parseSizeString(tool.performance?.ramUsage);
      if (val < min) min = val;
    });
    return min;
  }, [data]);

  const minImageSize = useMemo(() => {
    let min = Infinity;
    data.forEach(tool => {
      const val = parseSizeString(tool.performance?.dockerImageSize);
      if (val < min) min = val;
    });
    return min;
  }, [data]);

  return (
    <tbody className="border-b last:border-0">
      <tr
        className="cursor-pointer group transition-colors hover:bg-muted"
        onClick={onToggle}
      >
        <td className="sticky left-0 z-30 bg-background group-hover:bg-muted border-r px-4 md:px-6 py-4 font-medium flex items-center gap-2 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] transition-colors">
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          Project Stats
        </td>
        {data.map((tool) => (
          <td key={tool.id} className="px-4 md:px-6 py-4">
            <span className="font-medium">{getGitHubPopularityStatus(tool)}</span>
          </td>
        ))}
      </tr>
      {isOpen && (
        <>
          {/* Languages */}
          <tr className="bg-muted/5 group/row hover:bg-muted/20 dark:hover:bg-muted/30 transition-colors">
            <td className="sticky left-0 z-20 bg-background/95 backdrop-blur-sm border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors flex items-center gap-2">
              <Code className="h-3 w-3" /> Languages
            </td>
            {data.map((tool) => (
              <td key={tool.id} className="px-4 md:px-6 py-3 bg-muted/5 group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors">
                <div className="flex flex-wrap gap-1">
                  {tool.language.map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-[10px] px-1 py-0 h-5">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </td>
            ))}
          </tr>

          {/* Docker Image Size */}
          <tr className="bg-muted/5 group/row hover:bg-muted/20 dark:hover:bg-muted/30 transition-colors">
            <td className="sticky left-0 z-20 bg-background/95 backdrop-blur-sm border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors flex items-center gap-2">
              <Box className="h-3 w-3" /> Image Size
            </td>
            {data.map((tool) => {
              const val = parseSizeString(tool.performance?.dockerImageSize);
              const isLowest = val !== Infinity && val === minImageSize;
              return (
                <td key={tool.id} className="px-4 md:px-6 py-3 bg-muted/5 group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors">
                   <div className="flex items-center gap-2">
                    <span>{tool.performance?.dockerImageSize || "-"}</span>
                    {isLowest && <span>🔥</span>}
                   </div>
                </td>
              );
            })}
          </tr>

          {/* RAM Usage */}
          <tr className="bg-muted/5 group/row hover:bg-muted/20 dark:hover:bg-muted/30 transition-colors">
            <td className="sticky left-0 z-20 bg-background/95 backdrop-blur-sm border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors flex items-center gap-2">
              <Cpu className="h-3 w-3" /> Idle RAM
            </td>
            {data.map((tool) => {
               const val = parseSizeString(tool.performance?.ramUsage);
               const isLowest = val !== Infinity && val === minRam;
               return (
                <td key={tool.id} className="px-4 md:px-6 py-3 bg-muted/5 group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors">
                   <div className="flex items-center gap-2">
                    <span>{tool.performance?.ramUsage || "-"}</span>
                    {isLowest && <span>🔥</span>}
                   </div>
                </td>
              );
            })}
          </tr>

          {/* GitHub Stats */}
          <tr className="bg-muted/5 group/row hover:bg-muted/20 dark:hover:bg-muted/30 transition-colors">
            <td className="sticky left-0 z-20 bg-background/95 backdrop-blur-sm border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors flex items-center gap-2">
               <Github className="h-3 w-3" /> Stars
            </td>
            {data.map((tool) => (
              <td key={tool.id} className="px-4 md:px-6 py-3 bg-muted/5 group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors">
                {tool.githubStats ? (
                    <div className="flex items-center gap-2">
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
