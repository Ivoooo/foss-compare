"use client";

import React from "react";
import { CategorySection } from "@/types/software";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ComparisonFilterProps {
  sections: CategorySection[];
  filters: Set<string>;
  onFilterChange: (filterId: string) => void;
  onReset: () => void;
  matchCount: number;
  totalCount: number;
}

export function ComparisonFilter({
  sections,
  filters,
  onFilterChange,
  onReset,
  matchCount,
  totalCount,
}: ComparisonFilterProps) {
  const activeFilterCount = filters.size;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 relative">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filter
          {activeFilterCount > 0 && (
            <Badge
              variant="secondary"
              className="ml-1 h-5 min-w-5 px-1 rounded-full text-[10px] flex items-center justify-center bg-primary/10 text-primary border-primary/20"
            >
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col h-full p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Features
          </SheetTitle>
          <SheetDescription>
            Select features that are required for your needs.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.id} className="space-y-3">
                <h3 className="font-semibold text-sm text-foreground/80 sticky top-0 bg-background py-1 z-10">
                  {section.label}
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {section.items.map((item) => {
                    const isSelected = filters.has(item.key);
                    return (
                      <div
                        key={item.key}
                        className="flex items-start space-x-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
                      >
                        <Checkbox
                          id={item.key}
                          checked={isSelected}
                          onCheckedChange={() => onFilterChange(item.key)}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor={item.key}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {item.label}
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <SheetFooter className="px-6 py-4 border-t bg-muted/5 gap-2 sm:gap-0">
          <Button
            variant="ghost"
            onClick={onReset}
            disabled={activeFilterCount === 0}
            className="w-full sm:w-auto mr-auto"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <SheetClose asChild>
            <Button className="w-full sm:w-auto">
              Show {matchCount} Result{matchCount !== 1 ? "s" : ""}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
