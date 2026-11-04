import type { LucideIcon } from "lucide-react";
import type { MouseEventHandler } from "react";

export type HeaderAction = {
  label: string;
  icon: LucideIcon;
  count?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

type HeaderActionsProps = {
  items: HeaderAction[];
};

export function HeaderActions({ items }: HeaderActionsProps) {
  return (
    <div className="col-start-3 row-start-1 flex shrink-0 items-center justify-self-end text-[#d5cfd2] sm:gap-2 lg:gap-4 xl:gap-6">
      {items.map(({ label, icon: Icon, count, onClick }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          onClick={onClick}
          className="relative flex h-11 w-8 items-center justify-center rounded-sm transition-colors hover:text-[#df92ae] focus-visible:outline-2 focus-visible:outline-[#d5809e] lg:w-11 cursor-pointer"
        >
          <Icon className="size-5 lg:size-7" strokeWidth={1.5} aria-hidden="true" />
          {count !== undefined && (
            <span
              aria-hidden="true"
              className="absolute top-1 right-0 flex size-3.5 items-center justify-center rounded-full bg-[#cf7896] text-[9px] font-medium text-white lg:top-0.5 lg:size-[19px] lg:text-[10px]"
            >
              {count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
