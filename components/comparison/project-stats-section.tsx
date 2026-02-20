"use client";

import React, { useMemo } from "react";
import { SoftwareTool } from "@/lib/schemas";
import {
  getGitHubPopularityStatus,
  getStarsEmote,
  getForksEmote,
  getActivityEmote,
  getLicenseColor,
  parseSizeString,
  formatRelativeDate
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
  isMatch: (text: string) => boolean;
}

interface StatsRowProps {
  label: React.ReactNode;
  matchText?: string;
  data: SoftwareTool[];
  pinnedTools: Set<string>;
  renderCell: (tool: SoftwareTool) => React.ReactNode;
  isMatch: (text: string) => boolean;
}

const StatsRow = ({ label, matchText, data, pinnedTools, renderCell, isMatch }: StatsRowProps) => {
  const isRowMatch = isMatch(matchText || (typeof label === 'string' ? label : ""));

  return (
    <tr className="bg-muted/5 group/row hover:bg-muted/20 transition-colors">
      <td className={cn(
        "bg-background border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground group-hover/row:bg-muted transition-colors border-b",
        isRowMatch && "bg-yellow-100 dark:bg-yellow-900/40"
      )}>
        <div className="flex items-center gap-2 min-h-[48px]">
          {label}
        </div>
      </td>
      {data.map((tool) => {

        return (
          <td
            key={tool.id}
            className="px-4 md:px-6 py-3 bg-muted/5 group-hover/row:bg-muted/20 transition-colors border-b"
          >
            {renderCell(tool)}
          </td>
        );
      })}
    </tr>
  );
};

export function ProjectStatsSection({
  data,
  maxStars,
  maxForks,
  pinnedTools,
  isOpen,
  onToggle,
  isMatch,
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
        <td className={cn(
          "bg-background group-hover:bg-muted border-r px-4 md:px-6 py-4 font-medium transition-colors border-b",
          isMatch("Project Stats") && "bg-yellow-100 dark:bg-yellow-900/40"
        )}>
          <div className="flex items-center gap-2">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            Project Stats
          </div>
        </td>
        {data.map((tool) => {

          return (
            <td
              key={tool.id}
              className="px-4 md:px-6 py-4 transition-colors border-b"
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
            matchText="Languages"
            data={data}
            pinnedTools={pinnedTools}
            isMatch={isMatch}
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
            matchText="Image Size"
            data={data}
            pinnedTools={pinnedTools}
            isMatch={isMatch}
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
            matchText="Idle RAM"
            data={data}
            pinnedTools={pinnedTools}
            isMatch={isMatch}
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
            matchText="Stars"
            data={data}
            pinnedTools={pinnedTools}
            isMatch={isMatch}
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
            isMatch={isMatch}
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
            isMatch={isMatch}
            renderCell={(tool) => tool.githubStats ? (
              <div className="flex items-center gap-2">
                <span title={tool.githubStats.lastCommit}>{formatRelativeDate(tool.githubStats.lastCommit)}</span>
                <span>{getActivityEmote(tool.githubStats.lastCommit)}</span>
              </div>
            ) : "-"}
          />

          <StatsRow
            label="License"
            data={data}
            pinnedTools={pinnedTools}
            isMatch={isMatch}
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
            isMatch={isMatch}
            renderCell={(tool) => (
              <FeatureStatusCell status={tool.openSource ? "Yes" : "No"} />
            )}
          />
        </>
      )}
    </tbody>
  );
}
