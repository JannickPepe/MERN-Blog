import React from "react";

interface BadgeGridProps {
  items: string[];
}

const BadgeGrid: React.FC<BadgeGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-center">
      {items.map((item, index) => (
        <span
          key={index}
          className="text-xs text-slate-800 font-semibold border-2 border-sky-700 px-2 py-1 rounded-full"
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default BadgeGrid;
