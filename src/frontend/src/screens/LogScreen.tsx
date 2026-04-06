interface Member {
  id: number;
  name: string;
  role: string;
  arabicRole: string;
  initials: string;
  color: string;
}

const members: Member[] = [
  {
    id: 1,
    name: "مولانا احمد صاحب",
    role: "Head Imam",
    arabicRole: "امام اعظم",
    initials: "م ا",
    color: "oklch(0.40 0.13 147)",
  },
  {
    id: 2,
    name: "حافظ محمد علی",
    role: "Khatib",
    arabicRole: "خطیب",
    initials: "ح م",
    color: "oklch(0.35 0.10 147)",
  },
  {
    id: 3,
    name: "قاری عبدالرحمن",
    role: "Muezzin",
    arabicRole: "مؤذن",
    initials: "ق ع",
    color: "oklch(0.45 0.13 160)",
  },
  {
    id: 4,
    name: "مولانا یوسف خان",
    role: "Deputy Imam",
    arabicRole: "نائب امام",
    initials: "م ی",
    color: "oklch(0.38 0.12 150)",
  },
  {
    id: 5,
    name: "حاجی عبداللہ صاحب",
    role: "Committee President",
    arabicRole: "صدر کمیٹی",
    initials: "ح ع",
    color: "oklch(0.50 0.10 78)",
  },
  {
    id: 6,
    name: "محمد اسلم چودھری",
    role: "Secretary",
    arabicRole: "سیکریٹری",
    initials: "م ا",
    color: "oklch(0.42 0.11 155)",
  },
  {
    id: 7,
    name: "قاری نوید احمد",
    role: "Quran Teacher",
    arabicRole: "قاری",
    initials: "ق ن",
    color: "oklch(0.36 0.10 142)",
  },
  {
    id: 8,
    name: "حافظ طارق محمود",
    role: "Tarawih Imam",
    arabicRole: "امام تراویح",
    initials: "ح ط",
    color: "oklch(0.44 0.12 148)",
  },
];

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

      {/* Members list */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ background: "oklch(0.97 0.01 147)" }}
      >
        <div className="px-4 py-3">
          {/* Section label */}
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

          {/* Member cards */}
          <div className="flex flex-col gap-2.5">
            {members.map((member, index) => (
              <div
                key={member.id}
                data-ocid={`log.item.${index + 1}`}
                className="rounded-2xl flex items-center gap-3 px-4 py-3"
                style={{
                  background: "white",
                  border: "1px solid oklch(0.88 0.02 147)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                {/* Avatar */}
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full"
                  style={{
                    width: "46px",
                    height: "46px",
                    background: member.color,
                    boxShadow: "0 3px 10px rgba(0,0,0,0.18)",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "'Scheherazade New', 'Noto Nastaliq Urdu', serif",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "oklch(0.85 0.14 78)",
                      direction: "rtl",
                    }}
                  >
                    {member.initials}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p
                    style={{
                      fontFamily:
                        "'Scheherazade New', 'Noto Nastaliq Urdu', serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "oklch(0.25 0.09 147)",
                      direction: "rtl",
                      lineHeight: 1.4,
                    }}
                  >
                    {member.name}
                  </p>
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        color: "oklch(0.50 0.08 147)",
                      }}
                    >
                      {member.role}
                    </span>
                    <span
                      style={{
                        width: "3px",
                        height: "3px",
                        borderRadius: "50%",
                        background: "oklch(0.72 0.12 78)",
                        display: "inline-block",
                      }}
                    />
                    <span
                      style={{
                        fontFamily:
                          "'Scheherazade New', 'Noto Nastaliq Urdu', serif",
                        fontSize: "0.75rem",
                        color: "oklch(0.40 0.13 147)",
                        fontWeight: 600,
                        direction: "rtl",
                      }}
                    >
                      {member.arabicRole}
                    </span>
                  </div>
                </div>

                {/* Number badge */}
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full"
                  style={{
                    width: "24px",
                    height: "24px",
                    background: "oklch(0.93 0.05 147)",
                    border: "1px solid oklch(0.80 0.08 147)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: "oklch(0.40 0.13 147)",
                    }}
                  >
                    {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom divider */}
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
