import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "info";
  className?: string;
}

const badgeVariants = {
  default:
    "bg-surface-variant text-primary text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full",
  success:
    "bg-secondary-container/20 text-secondary text-[10px] font-bold uppercase px-2 py-1 rounded",
  info: "bg-primary/10 text-primary text-[10px] font-bold uppercase px-2 py-1 rounded",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants[variant], className)}>{children}</span>
  );
}
