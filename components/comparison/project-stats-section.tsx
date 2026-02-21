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
  isOpen: boolean;
  onToggle: () => void;
  isMatch: (text: string) => boolean;
}

interface StatsRowProps {
  label: React.ReactNode;
  matchText?: string;
  data: SoftwareTool[];
  renderCell: (tool: SoftwareTool) => React.ReactNode;
  isMatch: (text: string) => boolean;
}

const StatsRow = ({ label, matchText, data, renderCell, isMatch }: StatsRowProps) => {
  const isRowMatch = isMatch(matchText || (typeof label === 'string' ? label : ""));

  return (
    <tr className="bg-muted/5 group/row hover:bg-muted/20 transition-colors">
      <th scope="row" className={cn(
        "bg-background border-r px-4 md:px-6 py-3 pl-10 md:pl-12 text-muted-foreground font-normal text-left group-hover/row:bg-muted transition-colors border-b",
        isRowMatch && "bg-yellow-100 dark:bg-yellow-900/40"
      )}>
        <div className="flex items-center gap-2 min-h-[48px]">
          {label}
        </div>
      </th>
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
      <tr className="group transition-colors hover:bg-muted">
        <th
          scope="row"
          className={cn(
            "bg-background group-hover:bg-muted border-r p-0 font-medium transition-colors border-b",
            isMatch("Project Stats") && "bg-yellow-100 dark:bg-yellow-900/40"
          )}
        >
          <button
            onClick={onToggle}
            className="w-full h-full flex items-center gap-2 px-4 md:px-6 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            )}
            Project Stats
          </button>
        </th>
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
            label={<><Code className="h-3 w-3" aria-hidden="true" /> Languages</>}
            matchText="Languages"
            data={data}
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
            label={<><Box className="h-3 w-3" aria-hidden="true" /> Image Size</>}
            matchText="Image Size"
            data={data}
            isMatch={isMatch}
            renderCell={(tool) => {
              const val = parseSizeString(tool.performance?.dockerImageSize);
              const isLowest = val !== Infinity && val === minImageSize;
              return (
                <div className="flex items-center gap-2">
                  <span>{tool.performance?.dockerImageSize || "-"}</span>
                  {isLowest && <span role="img" aria-label="lowest image size">🔥</span>}
                </div>
              );
            }}
          />

          <StatsRow
            label={<><Cpu className="h-3 w-3" aria-hidden="true" /> Idle RAM</>}
            matchText="Idle RAM"
            data={data}
            isMatch={isMatch}
            renderCell={(tool) => {
              const val = parseSizeString(tool.performance?.ramUsage);
              const isLowest = val !== Infinity && val === minRam;
              return (
                <div className="flex items-center gap-2">
                  <span>{tool.performance?.ramUsage || "-"}</span>
                  {isLowest && <span role="img" aria-label="lowest RAM usage">🔥</span>}
                </div>
              );
            }}
          />

          <StatsRow
            label={<><Github className="h-3 w-3" aria-hidden="true" /> Stars</>}
            matchText="Stars"
            data={data}
            isMatch={isMatch}
            renderCell={(tool) => tool.githubStats ? (
              <div className="flex items-center gap-2">
                <span>{tool.githubStats.stars.toLocaleString()}</span>
                <span role="img" aria-label="popularity rating">{getStarsEmote(tool.githubStats.stars, maxStars)}</span>
              </div>
            ) : "-"}
          />

          <StatsRow
            label="Forks"
            data={data}
            isMatch={isMatch}
            renderCell={(tool) => tool.githubStats ? (
              <div className="flex items-center gap-2">
                <span>{tool.githubStats.forks.toLocaleString()}</span>
                <span role="img" aria-label="fork rating">{getForksEmote(tool.githubStats.forks, maxForks)}</span>
              </div>
            ) : "-"}
          />

          <StatsRow
            label="Last Commit"
            data={data}
            isMatch={isMatch}
            renderCell={(tool) => tool.githubStats ? (
              <div className="flex items-center gap-2">
                <span title={tool.githubStats.lastCommit}>{formatRelativeDate(tool.githubStats.lastCommit)}</span>
                <span role="img" aria-label="activity level">{getActivityEmote(tool.githubStats.lastCommit)}</span>
              </div>
            ) : "-"}
          />

          <StatsRow
            label="License"
            data={data}
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
