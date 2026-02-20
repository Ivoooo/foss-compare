"use client";

import React, { useMemo } from "react";
import { SoftwareTool } from "@/lib/schemas";
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
import { cn } from "@/lib/utils";

interface ProjectStatsSectionProps {
  data: SoftwareTool[];
  maxStars: number;
  maxForks: number;
  pinnedTools: Set<string>;
  isOpen: boolean;
  onToggle: () => void;
}

interface StatsRowProps {
  label: React.ReactNode;
  data: SoftwareTool[];
  pinnedTools: Set<string>;
  renderCell: (tool: SoftwareTool) => React.ReactNode;
}

const StatsRow = ({ label, data, pinnedTools, renderCell }: StatsRowProps) => (
  <tr className="bg-muted/5 group/row hover:bg-muted/20 dark:hover:bg-muted/30 transition-colors">
    <td className="sticky left-0 z-20 bg-background/95 backdrop-blur-sm border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors flex items-center gap-2 min-h-[48px]">
      {label}
    </td>
    {data.map((tool, index) => {
      const isPinned = pinnedTools.has(tool.id);
      const leftOffset = isPinned ? 256 + index * 240 : undefined;
      return (
        <td
          key={tool.id}
          style={isPinned ? { left: `${leftOffset}px` } : undefined}
          className={cn(
            "px-4 md:px-6 py-3 bg-muted/5 group-hover/row:bg-muted/20 dark:group-hover/row:bg-muted/30 transition-colors",
            isPinned && "sticky z-10 bg-background/95 backdrop-blur-md border-r shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]"
          )}
        >
          {renderCell(tool)}
        </td>
      );
    })}
  </tr>
);

export function ProjectStatsSection({
  data,
  maxStars,
  maxForks,
  pinnedTools,
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
        {data.map((tool, index) => {
          const isPinned = pinnedTools.has(tool.id);
          const leftOffset = isPinned ? 256 + index * 240 : undefined;
          return (
            <td 
              key={tool.id} 
              style={isPinned ? { left: `${leftOffset}px` } : undefined}
              className={cn(
                "px-4 md:px-6 py-4 transition-colors",
                isPinned && "sticky z-20 bg-background/95 backdrop-blur-md border-r shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]"
              )}
            >
              <span className="font-medium">{getGitHubPopularityStatus(tool)}</span>
            </td>
          );
        })}
      </tr>
      {isOpen && (
        <>
          <StatsRow
            label={<><Code className="h-3 w-3" /> Languages</>}
            data={data}
            pinnedTools={pinnedTools}
            renderCell={(tool) => (
              <div className="flex flex-wrap gap-1">
                {tool.language.map((lang) => (
                  <Badge key={lang} variant="secondary" className="text-[10px] px-1 py-0 h-5">
                    {lang}
                  </Badge>
                ))}
              </div>
            )}
          />

          <StatsRow
            label={<><Box className="h-3 w-3" /> Image Size</>}
            data={data}
            pinnedTools={pinnedTools}
            renderCell={(tool) => {
              const val = parseSizeString(tool.performance?.dockerImageSize);
              const isLowest = val !== Infinity && val === minImageSize;
              return (
                <div className="flex items-center gap-2">
                  <span>{tool.performance?.dockerImageSize || "-"}</span>
                  {isLowest && <span>🔥</span>}
                </div>
              );
            }}
          />

          <StatsRow
            label={<><Cpu className="h-3 w-3" /> Idle RAM</>}
            data={data}
            pinnedTools={pinnedTools}
            renderCell={(tool) => {
               const val = parseSizeString(tool.performance?.ramUsage);
               const isLowest = val !== Infinity && val === minRam;
               return (
                 <div className="flex items-center gap-2">
                  <span>{tool.performance?.ramUsage || "-"}</span>
                  {isLowest && <span>🔥</span>}
                 </div>
               );
            }}
          />

          <StatsRow
            label={<><Github className="h-3 w-3" /> Stars</>}
            data={data}
            pinnedTools={pinnedTools}
            renderCell={(tool) => tool.githubStats ? (
              <div className="flex items-center gap-2">
                <span>{tool.githubStats.stars.toLocaleString()}</span>
                <span>{getStarsEmote(tool.githubStats.stars, maxStars)}</span>
              </div>
            ) : "-"}
          />

          <StatsRow
            label="Forks"
            data={data}
            pinnedTools={pinnedTools}
            renderCell={(tool) => tool.githubStats ? (
              <div className="flex items-center gap-2">
                <span>{tool.githubStats.forks.toLocaleString()}</span>
                <span>{getForksEmote(tool.githubStats.forks, maxForks)}</span>
              </div>
            ) : "-"}
          />

          <StatsRow
            label="Last Commit"
            data={data}
            pinnedTools={pinnedTools}
            renderCell={(tool) => tool.githubStats ? (
              <div className="flex items-center gap-2">
                <span>{tool.githubStats.lastCommit}</span>
                <span>{getActivityEmote(tool.githubStats.lastCommit)}</span>
              </div>
            ) : "-"}
          />

          <StatsRow
            label="License"
            data={data}
            pinnedTools={pinnedTools}
            renderCell={(tool) => (
              <Badge variant="outline" className={getLicenseColor(tool.license)}>
                {tool.license}
              </Badge>
            )}
          />

          <StatsRow
            label="Open Source"
            data={data}
            pinnedTools={pinnedTools}
            renderCell={(tool) => (
              <FeatureStatusCell status={tool.openSource ? "Yes" : "No"} />
            )}
          />
        </>
      )}
    </tbody>
  );
}
