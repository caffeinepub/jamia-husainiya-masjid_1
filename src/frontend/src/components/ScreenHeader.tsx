interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
}

export default function ScreenHeader({
  title,
  subtitle,
  rightElement,
}: ScreenHeaderProps) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-between px-5 py-4"
      style={{
        background: "oklch(0.40 0.13 147)",
        borderBottom: "2px solid oklch(0.72 0.12 78)",
      }}
    >
      <div>
        <h1 className="text-white font-bold text-lg">{title}</h1>
        {subtitle && (
          <p
            className="text-xs mt-0.5"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {rightElement && <div>{rightElement}</div>}
    </div>
  );
}
