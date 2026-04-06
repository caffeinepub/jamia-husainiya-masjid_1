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
];

function getNextPrayer(): PrayerTime {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const next = prayerTimes.find((p) => p.hour * 60 + p.minute > nowMinutes);
  return next ?? prayerTimes[0];
}

interface HomeScreenProps {
  announcements: Announcement[];
  phone: string;
}

export default function HomeScreen({ announcements }: HomeScreenProps) {
  const nextPrayer = useMemo(() => getNextPrayer(), []);

  return (
    <div
      data-ocid="home.page"
      className="flex flex-col"
      style={{ minHeight: "100%", background: "#f9fafb" }}
    >
      {/* ─── GREEN HEADER ─── */}
      <div
        className="flex-shrink-0 px-5 pt-5 pb-4"
        style={{ background: "oklch(0.40 0.13 147)" }}
      >
        <h1
          className="font-bold text-white text-center"
          style={{
            fontSize: "1.1rem",
            letterSpacing: "0.01em",
            lineHeight: 1.3,
          }}
        >
          Jamia Husainiya Masjid Margoobpur
        </h1>
        <p
          className="text-center mt-1"
          style={{
            fontFamily: "'Scheherazade New', 'Noto Naskh Arabic', serif",
            fontSize: "1.2rem",
            color: "oklch(0.88 0.14 78)",
            direction: "rtl",
            lineHeight: 1.6,
          }}
        >
          بسم الله الرحمن الرحيم
        </p>
      </div>

      {/* ─── MOSQUE IMAGE BANNER ─── */}
      <div className="flex-shrink-0 relative" style={{ height: "180px" }}>
        <img
          src="/assets/generated/mosque-banner.dim_800x400.jpg"
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
        {/* Welcome Card */}
        <div className="mx-4 mt-4">
          <div
            className="rounded-2xl p-4"
            style={{
              background: "white",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
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
        </div>

        {/* Next Prayer Card */}
        <div className="mx-4 mt-3">
          <div
            className="rounded-2xl p-4"
            style={{
              background: "oklch(0.40 0.13 147)",
              boxShadow: "0 4px 16px rgba(15,75,47,0.25)",
            }}
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

        {/* Today's Prayer Times */}
        <div className="mx-4 mt-4">
          <h3
            className="font-bold text-sm mb-2"
            style={{ color: "oklch(0.28 0.10 147)" }}
          >
            Today's Prayer Times
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {prayerTimes.map((prayer) => {
              const isNext = prayer.name === nextPrayer.name;
              return (
                <div
                  key={prayer.name}
                  className="rounded-xl p-3 text-center"
                  style={{
                    background: isNext ? "oklch(0.40 0.13 147)" : "white",
                    border: `1px solid ${
                      isNext ? "oklch(0.35 0.11 147)" : "#e5e7eb"
                    }`,
                    boxShadow: isNext
                      ? "0 4px 12px rgba(15,75,47,0.20)"
                      : "0 1px 4px rgba(0,0,0,0.05)",
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

        {/* Latest Announcement */}
        {announcements.length > 0 && (
          <div className="mx-4 mt-4">
            <h3
              className="font-bold text-sm mb-2"
              style={{ color: "oklch(0.28 0.10 147)" }}
            >
              Latest Notice
            </h3>
            <div
              className="rounded-2xl p-4"
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
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
