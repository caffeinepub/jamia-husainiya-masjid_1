// Islamic star divider
function StarDivider() {
  return (
    <div
      className="flex items-center justify-center gap-2"
      style={{ color: "oklch(0.72 0.12 78)", opacity: 0.7 }}
    >
      <div
        style={{
          flex: 1,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, oklch(0.72 0.12 78))",
        }}
      />
      <span style={{ fontSize: "0.75rem" }}>✦</span>
      <div
        style={{
          flex: 1,
          height: "1px",
          background:
            "linear-gradient(90deg, oklch(0.72 0.12 78), transparent)",
        }}
      />
    </div>
  );
}

export default function LogScreen() {
  return (
    <div data-ocid="log.page" className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div
        className="flex-shrink-0 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.40 0.13 147) 0%, oklch(0.30 0.10 147) 100%)",
          borderBottom: "2px solid oklch(0.72 0.12 78)",
        }}
      >
        {/* Pattern overlay */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.08 }}
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="log-star-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="20,2 23,11 32,11 25,17 28,26 20,20 12,26 15,17 8,11 17,11"
                fill="oklch(0.72 0.12 78)"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#log-star-pattern)" />
        </svg>

        <div className="relative z-10 px-5 py-5 text-center">
          <p
            style={{
              fontFamily: "'Scheherazade New', 'Noto Nastaliq Urdu', serif",
              fontSize: "2rem",
              fontWeight: 700,
              color: "oklch(0.85 0.14 78)",
              direction: "rtl",
              lineHeight: 1.3,
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              marginBottom: "2px",
            }}
          >
            لوگ
          </p>
          <p
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Members
          </p>
        </div>
      </div>

      {/* Empty state */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ background: "oklch(0.97 0.01 147)" }}
      >
        <div className="px-4 py-3">
          <div className="mb-3">
            <StarDivider />
            <p
              className="text-center text-xs font-semibold mt-2"
              style={{
                color: "oklch(0.50 0.10 147)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Masjid Committee & Staff
            </p>
          </div>

          {/* Empty state message */}
          <div
            data-ocid="log.empty_state"
            className="flex flex-col items-center justify-center py-16 gap-4"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "oklch(0.93 0.05 147)" }}
            >
              <span style={{ fontSize: "2rem" }}>🕌</span>
            </div>
            <div className="text-center">
              <p
                className="font-semibold text-sm"
                style={{ color: "oklch(0.40 0.13 147)" }}
              >
                کمیٹی اراکین
              </p>
              <p
                className="text-xs mt-1"
                style={{
                  color: "oklch(0.55 0.05 147)",
                  fontFamily: "'Scheherazade New', serif",
                  direction: "rtl",
                  fontSize: "0.9rem",
                }}
              >
                جلد آ رہا ہے
              </p>
              <p className="text-xs mt-2" style={{ color: "#9ca3af" }}>
                Committee members will be listed here soon.
              </p>
            </div>
          </div>

          <div className="mt-4">
            <StarDivider />
          </div>
        </div>

        {/* Footer */}
        <div className="pb-4 text-center">
          <p
            style={{
              fontSize: "0.65rem",
              color: "oklch(0.65 0.05 147)",
            }}
          >
            © {new Date().getFullYear()}. Jamia Husainiya Masjid Margoobpur
          </p>
        </div>
      </div>
    </div>
  );
}
