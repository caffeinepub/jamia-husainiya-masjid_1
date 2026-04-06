import { useMemo } from "react";
import type { Announcement } from "../backend.d";

interface PrayerTime {
  name: string;
  arabic: string;
  time: string;
  hour: number;
  minute: number;
}

const prayerTimes: PrayerTime[] = [
  { name: "Fajr", arabic: "الفجر", time: "5:41 AM", hour: 5, minute: 41 },
  { name: "Zohar", arabic: "الظهر", time: "2:30 PM", hour: 14, minute: 30 },
  { name: "Asr", arabic: "العصر", time: "5:15 PM", hour: 17, minute: 15 },
  { name: "Maghrib", arabic: "المغرب", time: "6:41 PM", hour: 18, minute: 41 },
  { name: "Isha", arabic: "العشاء", time: "8:30 PM", hour: 20, minute: 30 },
  {
    name: "Khutba Juma",
    arabic: "الجمعة",
    time: "1:30 PM",
    hour: 13,
    minute: 30,
  },
];

function getNextPrayer(): PrayerTime {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const regularPrayers = prayerTimes.filter((p) => p.name !== "Khutba Juma");
  const next = regularPrayers.find((p) => p.hour * 60 + p.minute > nowMinutes);
  return next ?? regularPrayers[0];
}

// Islamic geometric star pattern SVG for background
function IslamicPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.12 }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="star-pattern"
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
      <rect width="100%" height="100%" fill="url(#star-pattern)" />
    </svg>
  );
}

interface HomeScreenProps {
  announcements: Announcement[];
  phone: string;
}

export default function HomeScreen({ announcements }: HomeScreenProps) {
  const nextPrayer = useMemo(() => getNextPrayer(), []);

  return (
    <div data-ocid="home.page" className="flex flex-col h-full overflow-hidden">
      {/* Hero Header */}
      <div
        className="flex-shrink-0 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.40 0.13 147) 0%, oklch(0.28 0.10 147) 60%, oklch(0.22 0.08 147) 100%)",
        }}
      >
        {/* Islamic geometric pattern overlay */}
        <IslamicPattern />

        {/* Hero content */}
        <div className="relative z-10 pt-5 pb-5 px-5 text-center">
          {/* Bismillah */}
          <p
            style={{
              fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', serif",
              fontSize: "1.5rem",
              lineHeight: 1.6,
              color: "oklch(0.85 0.14 78)",
              direction: "rtl",
              textShadow: "0 2px 12px rgba(0,0,0,0.35)",
              marginBottom: "6px",
              letterSpacing: "0.01em",
            }}
          >
            بسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ
          </p>

          {/* Assalamu Alaikum */}
          <p
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "white",
              marginBottom: "2px",
              letterSpacing: "0.02em",
            }}
          >
            Assalamu Alaikum
          </p>

          {/* Arabic response */}
          <p
            style={{
              fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', serif",
              fontSize: "1.05rem",
              color: "oklch(0.85 0.14 78)",
              direction: "rtl",
              marginBottom: "8px",
            }}
          >
            وَعَلَيْكُمُ السَّلام
          </p>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, oklch(0.72 0.12 78), transparent)",
              marginBottom: "8px",
              opacity: 0.6,
            }}
          />

          {/* Welcome text */}
          <p
            style={{
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.5,
              maxWidth: "280px",
              margin: "0 auto",
            }}
          >
            Welcome to Jamia Husainiya Masjid Margoobpur. May Allah bless you
            and your family. Join us for daily prayers, Friday Khutba, and
            community events.
          </p>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        className="flex-1 overflow-y-auto phone-content"
        style={{ background: "oklch(0.97 0.01 147)" }}
      >
        {/* NEXT PRAYER Card */}
        <div className="px-4 pt-4">
          <div
            className="rounded-2xl p-4 shadow-lg relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.12 78) 0%, oklch(0.62 0.10 78) 100%)",
              border: "1px solid oklch(0.62 0.10 78)",
            }}
          >
            {/* Subtle pattern in card */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 80% 20%, oklch(0.80 0.10 78) 0%, transparent 60%)",
                opacity: 0.35,
              }}
            />
            <div className="relative z-10">
              {/* NEXT PRAYER label */}
              <p
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "oklch(0.28 0.10 147)",
                  marginBottom: "6px",
                }}
              >
                NEXT PRAYER
              </p>

              <div className="flex items-end justify-between">
                <div>
                  {/* Prayer English name */}
                  <p
                    style={{
                      fontSize: "1.7rem",
                      fontWeight: 800,
                      color: "oklch(0.20 0.08 147)",
                      lineHeight: 1,
                      marginBottom: "4px",
                    }}
                  >
                    {nextPrayer.name}
                  </p>
                  {/* Arabic name */}
                  <p
                    style={{
                      fontFamily:
                        "'Scheherazade New', 'Noto Naskh Arabic', serif",
                      fontSize: "1.1rem",
                      color: "oklch(0.28 0.10 147)",
                      direction: "rtl",
                      marginBottom: "8px",
                    }}
                  >
                    {nextPrayer.arabic}
                  </p>
                  {/* Soon badge */}
                  <div
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1"
                    style={{
                      background: "oklch(0.28 0.10 147)",
                      color: "oklch(0.85 0.14 78)",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                    }}
                  >
                    <span>🕌</span>
                    <span>Soon</span>
                  </div>
                </div>

                {/* Time */}
                <div className="text-right">
                  <p
                    style={{
                      fontSize: "2rem",
                      fontWeight: 800,
                      color: "oklch(0.20 0.08 147)",
                      lineHeight: 1,
                    }}
                  >
                    {nextPrayer.time}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prayer times grid */}
        <div className="px-4 pt-3">
          <h3
            className="font-bold text-sm mb-2"
            style={{ color: "oklch(0.40 0.13 147)" }}
          >
            Today's Prayer Times
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {prayerTimes
              .filter((p) => p.name !== "Khutba Juma")
              .map((prayer) => {
                const isNext = prayer.name === nextPrayer.name;
                return (
                  <div
                    key={prayer.name}
                    className="rounded-xl p-2.5 text-center"
                    style={{
                      background: isNext ? "oklch(0.40 0.13 147)" : "white",
                      border: `1px solid ${
                        isNext ? "oklch(0.72 0.12 78)" : "oklch(0.88 0.02 147)"
                      }`,
                      boxShadow: isNext
                        ? "0 4px 12px rgba(0,0,0,0.15)"
                        : "none",
                    }}
                  >
                    <p
                      className="text-xs font-bold"
                      style={{
                        color: isNext
                          ? "oklch(0.85 0.14 78)"
                          : "oklch(0.40 0.13 147)",
                      }}
                    >
                      {prayer.name}
                    </p>
                    <p
                      style={{
                        fontFamily:
                          "'Scheherazade New', 'Noto Naskh Arabic', serif",
                        fontSize: "0.8rem",
                        color: isNext
                          ? "rgba(255,255,255,0.75)"
                          : "oklch(0.55 0.08 147)",
                        direction: "rtl",
                      }}
                    >
                      {prayer.arabic}
                    </p>
                    <p
                      className="text-xs font-semibold mt-0.5"
                      style={{
                        color: isNext ? "white" : "oklch(0.35 0.02 240)",
                      }}
                    >
                      {prayer.time}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Latest announcement */}
        {announcements.length > 0 && (
          <div className="px-4 pt-3 pb-4">
            <h3
              className="font-bold text-sm mb-2"
              style={{ color: "oklch(0.40 0.13 147)" }}
            >
              Latest Notice
            </h3>
            <div
              className="rounded-2xl p-3"
              style={{
                background: "white",
                border: "1px solid oklch(0.88 0.02 147)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <p
                className="font-semibold text-sm"
                style={{ color: "oklch(0.22 0.08 147)" }}
              >
                {announcements[0].title}
              </p>
              <p
                className="text-xs mt-1 line-clamp-2"
                style={{ color: "oklch(0.45 0.02 240)" }}
              >
                {announcements[0].body}
              </p>
              <span
                className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{
                  background: "oklch(0.93 0.05 78)",
                  color: "oklch(0.50 0.10 78)",
                }}
              >
                {announcements[0].date}
              </span>
            </div>
          </div>
        )}

        {/* Footer spacer */}
        <div className="pb-4" />
      </div>
    </div>
  );
}
