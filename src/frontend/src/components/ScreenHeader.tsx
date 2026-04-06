interface ScreenHeaderProps {
  title: string;
  rightElement?: React.ReactNode;
}

export default function ScreenHeader({
  title,
  rightElement,
}: ScreenHeaderProps) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-between px-5 py-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.40 0.13 147) 0%, oklch(0.30 0.10 147) 100%)",
        borderBottom: "2px solid oklch(0.72 0.12 78)",
      }}
    >
      <h1 className="text-white font-bold text-lg tracking-wide">{title}</h1>
      {rightElement && <div>{rightElement}</div>}
    </div>
  );
}
