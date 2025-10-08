import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Select component with consistent styling
 * @param {object} props - Component props
 * @param {Array} props.options - Array of {value, label} objects
 * @param {string} props.className - Additional CSS classes
 */
const Select = forwardRef(({ className, options = [], ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

Select.displayName = "Select";

export { Select };

