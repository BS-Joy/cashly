import React from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function ChartLoadingSkeleton() {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 bg-gray-200 animate-pulse rounded w-[180px]" />
        <div className="h-8 bg-gray-200 animate-pulse rounded w-[100px]" />
      </div>

      {/* Chart Area Skeleton */}
      <div className="relative h-[400px] w-full">
        {/* Center loading spinner */}
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size={12} color="stroke-primary" />
        </div>

        {/* Y-axis labels skeleton */}
        <div className="absolute left-0 h-full w-12 flex flex-col justify-between py-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-4 w-8 bg-gray-200 animate-pulse rounded"
            />
          ))}
        </div>

        {/* Chart bars skeleton */}
        <div className="ml-12 h-full flex items-end justify-between">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-full px-2">
              <div
                className={`w-full bg-gray-200 animate-pulse rounded-t`}
                style={{
                  height: `${Math.random() * 60 + 20}%`,
                }}
              />
            </div>
          ))}
        </div>

        {/* X-axis labels skeleton */}
        <div className="ml-12 mt-4 flex justify-between">
          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ].map((month) => (
            <div
              key={month}
              className="h-4 w-8 bg-gray-200 animate-pulse rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
