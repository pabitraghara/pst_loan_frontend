import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  showValue?: boolean;
}

const ProgressBar = ({ value, className, showValue = false }: ProgressBarProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-1">
        {showValue && (
          <span className="text-xs font-medium text-[#003B5C]">
            {Math.round(value)}%
          </span>
        )}
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#4CAF50] transition-all duration-300 ease-in-out rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export { ProgressBar };
