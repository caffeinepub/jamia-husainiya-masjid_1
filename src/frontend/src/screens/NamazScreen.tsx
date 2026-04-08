import { useMemo } from "react";
import type { PrayerTime } from "../backend.d";

interface NamazScreenProps {
  prayerTimes: PrayerTime[];
  isLoading?: boolean;
}

function getNextPrayerName(prayerTimes: PrayerTime[]): string {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const parseTime = (timeStr: string): number => {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return 0;
    let hours = Number.parseInt(match[1]);
    const minutes = Number.parseInt(match[2]);
    const period = match[3].toUpperCase();
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const regular = prayerTimes.filter((p) => p.name !== "Khutba Juma");
  const next = regular.find((p) => parseTime(p.time) > nowMinutes);
  return next ? next.name : (regular[0]?.name ?? "");
}

const prayerIcons: Record<string, string> = {
  Fajr: "\uD83C\uDF05",
  Zohar: "\u2600\uFE0F",
  Asr: "\uD83C\uDF24\uFE0F",
  Maghrib: "\uD83C\uDF06",
  Isha: "\uD83C\uDF19",
  "Khutba Juma": "\uD83D\uDD4C",
};

export default function NamazScreen({
  prayerTimes,
  isLoading,
}: NamazScreenProps) {
  const nextName = useMemo(() => getNextPrayerName(prayerTimes), [prayerTimes]);

  return (
    <div
      data-ocid="namaz.page"
      className="flex flex-col"
      style={{ minHeight: "100%", background: "#f9fafb" }}
    >
      {/* Header */}
      <div
        className="flex-shrink-0 px-5 py-4"
        style={{
          background: "oklch(0.40 0.13 147)",
          borderBottom: "2px solid oklch(0.72 0.12 78)",
        }}
      >
        <h1 className="text-white font-bold text-lg">Namaz Timings</h1>
        <p
          className="text-xs mt-0.5"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          Daily Salah Times — Jamia Husainiya
        </p>
      </div>

      {/* Summary bar */}
      <div
        className="flex-shrink-0 px-4 py-2"
        style={{ background: "oklch(0.72 0.12 78)" }}
      >
        <p
          className="text-center font-bold text-xs uppercase tracking-widest"
          style={{ color: "oklch(0.22 0.08 147)" }}
        >
          Daily Salah Times (Namaz)
        </p>
      </div>

      {/* Prayer list — flat rows instead of individual cards */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
      >
        {isLoading ? (
          <div>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="px-5 py-4 animate-pulse"
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  height: "72px",
                  background: i % 2 === 0 ? "#f3f4f6" : "#f9fafb",
                }}
              />
            ))}
          </div>
        ) : (
          prayerTimes.map((prayer, index) => {
            const isNext =
              prayer.name === nextName && prayer.name !== "Khutba Juma";
            return (
              <div
                key={prayer.name}
                data-ocid={`namaz.item.${index + 1}`}
                className="transition-all duration-200"
                style={{
                  background: isNext
                    ? "oklch(0.40 0.13 147)"
                    : index % 2 === 0
                      ? "#f9fafb"
                      : "#f3f4f6",
                  borderBottom: isNext ? "none" : "1px solid #e5e7eb",
                }}
              >
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{
                        background: isNext
                          ? "rgba(255,255,255,0.15)"
                          : "oklch(0.93 0.05 147)",
                      }}
                    >
                      {prayerIcons[prayer.name] ?? "\uD83D\uDD4C"}
                    </div>
                    <div>
                      <p
                        className="font-bold text-sm"
                        style={{
                          color: isNext ? "white" : "oklch(0.22 0.08 147)",
                        }}
                      >
                        {prayer.name}
                        {prayer.name === "Khutba Juma" && (
                          <span
                            className="ml-2 text-xs font-normal px-1.5 py-0.5 rounded-full"
                            style={{
                              background: isNext
                                ? "rgba(255,255,255,0.2)"
                                : "oklch(0.93 0.05 147)",
                              color: isNext ? "white" : "oklch(0.40 0.13 147)",
                            }}
                          >
                            Friday
                          </span>
                        )}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{
                          color: isNext
                            ? "rgba(255,255,255,0.75)"
                            : "oklch(0.55 0.02 240)",
                          direction: "rtl",
                          fontFamily: "'Scheherazade New', serif",
                        }}
                      >
                        {prayer.arabic}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className="font-bold"
                      style={{
                        fontSize: "1.2rem",
                        color: isNext
                          ? "oklch(0.88 0.14 78)"
                          : "oklch(0.28 0.10 147)",
                        lineHeight: 1,
                      }}
                    >
                      {prayer.time}
                    </p>
                    {isNext && (
                      <span
                        className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-bold"
                        style={{
                          background: "oklch(0.72 0.12 78)",
                          color: "oklch(0.22 0.08 147)",
                        }}
                      >
                        Next
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Footer note — flat, no box */}
        {!isLoading && (
          <div className="px-5 py-4 text-center">
            <p className="text-xs" style={{ color: "#9ca3af" }}>
              Times are set for Jamia Husainiya Masjid Margoobpur. Admin can
              update times from the Admin panel.
            </p>
          </div>
        )}

        <div className="pb-4" />
      </div>
    </div>
  );
}
