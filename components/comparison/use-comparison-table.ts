import { useState, useMemo } from "react";
import { CategorySection, SoftwareTool } from "@/types/software";

interface UseComparisonTableProps {
  data: SoftwareTool[];
  sections: CategorySection[];
}

export function useComparisonTable({ data, sections }: UseComparisonTableProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");

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

  const searchedSections = useMemo(() => {
    // Only search/expand if query is at least 2 characters
    if (searchQuery.length < 2) return new Set<string>();

    const lowerQuery = searchQuery.toLowerCase();
    const next = new Set<string>();

    // Check Project Stats section
    if (
      "project stats".includes(lowerQuery) ||
      "github popularity".includes(lowerQuery) ||
      "stars".includes(lowerQuery) ||
      "forks".includes(lowerQuery) ||
      "last commit".includes(lowerQuery) ||
      "license".includes(lowerQuery) ||
      "open source".includes(lowerQuery) ||
      "ram".includes(lowerQuery) ||
      "size".includes(lowerQuery) ||
      "performance".includes(lowerQuery)
    ) {
      next.add("project-stats");
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
  }, [searchQuery, sections]);

  const isSectionExpanded = (id: string) => {
    return expandedSections.has(id) || searchedSections.has(id);
  };

  const isMatch = (text: string) => {
    if (!searchQuery || searchQuery.length < 2) return false;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  // Calculate maximum stars and forks for relative popularity
  const { maxStars, maxForks } = useMemo(() => {
    let maxS = 0;
    let maxF = 0;
    data.forEach(tool => {
      if (tool.githubStats) {
        if (tool.githubStats.stars > maxS) maxS = tool.githubStats.stars;
        if (tool.githubStats.forks > maxF) maxF = tool.githubStats.forks;
      }
    });
    return { maxStars: maxS, maxForks: maxF };
  }, [data]);

  return {
    searchQuery,
    setSearchQuery,
    expandedSections,
    toggleCategory,
    isSectionExpanded,
    isMatch,
    maxStars,
    maxForks,
  };
}
