
import * as React from "react";
import { cn } from "@/lib/utils";

interface CategoryBubbleProps {
  categories: string[];
  selectedCategory?: string;
  onSelect?: (category: string) => void;
  className?: string;
}

export function CategoryBubbles({
  categories,
  selectedCategory,
  onSelect,
  className,
}: CategoryBubbleProps) {
  return (
    <div className={cn("flex flex-wrap gap-2 justify-center mb-4", className)}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect?.(category)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            selectedCategory === category
              ? "bg-primary text-primary-foreground"
              : "bg-secondary hover:bg-secondary/80 text-foreground"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
