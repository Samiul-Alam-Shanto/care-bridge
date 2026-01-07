function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-stone-200 dark:bg-stone-800",
        className
      )}
      {...props}
    />
  );
}
