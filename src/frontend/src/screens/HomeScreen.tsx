import { useMemo } from "react";
import type { Announcement, PrayerTime } from "../backend.d";

interface PrayerTimeWithHour extends PrayerTime {
  hour: number;
  minute: number;
}

function parseTime(timeStr: string): { hour: number; minute: number } {
  // Parses "5:41 AM", "8:30 PM", "1:30 PM" etc.
  const match = timeStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!match) return { hour: 0, minute: 0 };
  let hour = Number.parseInt(match[1], 10);
  const minute = Number.parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return { hour, minute };
}

function getNextPrayer(
  prayerTimes: PrayerTimeWithHour[],
): PrayerTimeWithHour | null {
  if (!prayerTimes.length) return null;
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const next = prayerTimes.find((p) => p.hour * 60 + p.minute > nowMinutes);
  return next ?? prayerTimes[0];
}

interface HomeScreenProps {
  announcements: Announcement[];
  phone: string;
  prayerTimes: PrayerTime[];
}

export default function HomeScreen({
  announcements,
  prayerTimes,
}: HomeScreenProps) {
  const enrichedTimes: PrayerTimeWithHour[] = useMemo(
    () =>
      prayerTimes.map((p) => {
        const { hour, minute } = parseTime(p.time);
        return { ...p, hour, minute };
      }),
    [prayerTimes],
  );

  const nextPrayer = useMemo(
    () => getNextPrayer(enrichedTimes),
    [enrichedTimes],
  );

  return (
    <div
      data-ocid="home.page"
      className="flex flex-col"
      style={{ minHeight: "100%", background: "#f9fafb" }}
    >
      {/* ─── GREEN HEADER WITH LOGO ─── */}
      <div
        className="flex-shrink-0 px-4 pt-4 pb-3"
        style={{ background: "oklch(0.40 0.13 147)" }}
      >
        <div className="flex items-center gap-3">
          {/* Mosque Logo */}
          <div
            className="flex-shrink-0 rounded-full overflow-hidden"
            style={{
              width: "52px",
              height: "52px",
              border: "2px solid oklch(0.72 0.12 78)",
              background: "rgba(255,255,255,0.15)",
            }}
          >
            <img
              src="/assets/img_20260406_100452-019d6118-2be5-75ba-8475-e42f19f33474.jpg"
              alt="Jamia Husainiya Masjid Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML =
                    '<span style="font-size:1.8rem;display:flex;align-items:center;justify-content:center;height:100%">🕌</span>';
                }
              }}
            />
          </div>

          {/* Text block */}
          <div className="flex-1 min-w-0">
            <h1
              className="font-bold text-white"
              style={{
                fontSize: "0.98rem",
                letterSpacing: "0.01em",
                lineHeight: 1.25,
              }}
            >
              Jamia Husainiya Masjid Margoobpur
            </h1>
            <p
              className="mt-0.5"
              style={{
                fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', serif",
                fontSize: "1.05rem",
                color: "oklch(0.88 0.14 78)",
                direction: "rtl",
                lineHeight: 1.5,
              }}
            >
              بسم الله الرحمن الرحيم
            </p>
          </div>
        </div>
      </div>

      {/* ─── MOSQUE IMAGE BANNER ─── */}
      <div className="flex-shrink-0 relative" style={{ height: "180px" }}>
        <img
          src="/assets/img_20260406_100452-019d6118-2be5-75ba-8475-e42f19f33474.jpg"
          alt="Jamia Husainiya Masjid Margoobpur"
          className="w-full h-full"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "0 0 24px 24px",
            display: "block",
          }}
        />
      </div>

      {/* ─── SCROLLABLE CONTENT ─── */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
      >
        {/* Welcome Section — flat, no box */}
        <div className="px-4 pt-5 pb-3">
          <p
            className="font-bold"
            style={{ fontSize: "1.1rem", color: "oklch(0.28 0.10 147)" }}
          >
            Assalamu Alaikum
          </p>
          <p
            style={{
              fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', serif",
              fontSize: "1.1rem",
              color: "oklch(0.72 0.12 78)",
              direction: "rtl",
              marginTop: "2px",
              marginBottom: "8px",
            }}
          >
            وَعَلَيْكُمُ السَّلام
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
            Welcome to Jamia Husainiya Masjid Margoobpur. May Allah bless you
            and your family. Join us for daily prayers, Friday Khutba, and
            community events.
          </p>
        </div>

        {/* Divider */}
        <div
          style={{ height: "1px", background: "#e5e7eb", margin: "0 16px" }}
        />

        {/* Next Prayer — keep green accent, remove heavy shadow/border */}
        {nextPrayer && (
          <div className="px-4 pt-4 pb-2">
            <div
              className="rounded-2xl p-4"
              style={{ background: "oklch(0.40 0.13 147)" }}
            >
              <p
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: "6px",
                }}
              >
                NEXT PRAYER
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <p
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: "white",
                      lineHeight: 1,
                      marginBottom: "2px",
                    }}
                  >
                    {nextPrayer.name}
                  </p>
                  <p
                    style={{
                      fontFamily:
                        "'Scheherazade New', 'Noto Naskh Arabic', serif",
                      fontSize: "1.1rem",
                      color: "oklch(0.85 0.14 78)",
                      direction: "rtl",
                      marginBottom: "10px",
                    }}
                  >
                    {nextPrayer.arabic}
                  </p>
                  {/* Soon badge */}
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1"
                    style={{
                      background: "oklch(0.72 0.12 78)",
                      color: "oklch(0.22 0.08 147)",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                    }}
                  >
                    🕌 Soon
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "white",
                    lineHeight: 1,
                  }}
                >
                  {nextPrayer.time}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Today's Prayer Times — flat rows, no individual borders/shadows */}
        {enrichedTimes.length > 0 && (
          <div className="px-4 pt-3 pb-2">
            <h3
              className="font-bold text-sm mb-3"
              style={{ color: "oklch(0.28 0.10 147)" }}
            >
              Today's Prayer Times
            </h3>
            <div className="grid grid-cols-2 gap-0">
              {enrichedTimes.map((prayer, idx) => {
                const isNext = nextPrayer?.name === prayer.name;
                const isOdd = idx % 2 === 0;
                return (
                  <div
                    key={prayer.name}
                    className="p-3 text-center"
                    style={{
                      background: isNext
                        ? "oklch(0.40 0.13 147)"
                        : isOdd
                          ? "#f9fafb"
                          : "#f3f4f6",
                      borderRadius: isNext ? "12px" : "0",
                    }}
                  >
                    <p
                      className="font-bold text-sm"
                      style={{
                        color: isNext
                          ? "oklch(0.88 0.14 78)"
                          : "oklch(0.28 0.10 147)",
                      }}
                    >
                      {prayer.name}
                    </p>
                    <p
                      style={{
                        fontFamily:
                          "'Scheherazade New', 'Noto Naskh Arabic', serif",
                        fontSize: "0.85rem",
                        color: isNext
                          ? "rgba(255,255,255,0.75)"
                          : "oklch(0.55 0.08 147)",
                        direction: "rtl",
                        marginTop: "1px",
                      }}
                    >
                      {prayer.arabic}
                    </p>
                    <p
                      className="font-semibold text-sm mt-1"
                      style={{
                        color: isNext ? "white" : "#374151",
                      }}
                    >
                      {prayer.time}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Divider */}
        {announcements.length > 0 && (
          <div
            style={{
              height: "1px",
              background: "#e5e7eb",
              margin: "4px 16px 0",
            }}
          />
        )}

        {/* Latest Announcement — flat section, no box */}
        {announcements.length > 0 && (
          <div className="px-4 pt-4 pb-3">
            <h3
              className="font-bold text-sm mb-3"
              style={{ color: "oklch(0.28 0.10 147)" }}
            >
              Latest Notice
            </h3>
            <div
              style={{
                borderLeft: "3px solid oklch(0.72 0.12 78)",
                paddingLeft: "12px",
              }}
            >
              <p
                className="font-semibold text-sm"
                style={{ color: "oklch(0.28 0.10 147)" }}
              >
                {announcements[0].title}
              </p>
              <p
                className="text-xs mt-1 leading-relaxed"
                style={{ color: "#6b7280" }}
              >
                {announcements[0].body}
              </p>
              <span
                className="inline-block mt-2 text-xs px-2.5 py-1 rounded-full font-semibold"
                style={{
                  background: "oklch(0.93 0.05 78)",
                  color: "oklch(0.50 0.10 78)",
                }}
              >
                📅 {announcements[0].date}
              </span>
            </div>
          </div>
        )}

        {/* Branding Footer */}
        <div className="pb-4 pt-6 text-center">
          <p className="text-xs" style={{ color: "#9ca3af" }}>
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "oklch(0.40 0.13 147)", textDecoration: "none" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
