export function Bar({ value, color = "gold" }: { value: number; color?: "gold" | "blue" | "red" }) {
  const cls = color === "gold" ? "gradient-gold" : color === "red" ? "bg-destructive" : "bg-secondary";
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/60">
      <div className={`h-full ${cls} rounded-full transition-all`} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}