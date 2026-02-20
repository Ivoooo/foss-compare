import { useState, useMemo } from "react";
import { CategorySection, SoftwareTool } from "@/types/software";
import { getNestedValue } from "@/lib/utils";

interface UseComparisonTableProps {
  data: SoftwareTool[];
  sections: CategorySection[];
}

export function useComparisonTable({ data, sections }: UseComparisonTableProps) {
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
    filteredData.forEach(tool => {
      if (tool.githubStats) {
        if (tool.githubStats.stars > maxS) maxS = tool.githubStats.stars;
        if (tool.githubStats.forks > maxF) maxF = tool.githubStats.forks;
      }
    });
    return { maxStars: maxS, maxForks: maxF };
  }, [filteredData]);

  return {
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
  };
}
