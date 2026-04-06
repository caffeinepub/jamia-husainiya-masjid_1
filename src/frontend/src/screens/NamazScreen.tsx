import { useMemo } from "react";

interface PrayerTime {
  name: string;
  arabic: string;
  time: string;
  hour: number;
  minute: number;
  note?: string;
}

const prayerTimes: PrayerTime[] = [
  { name: "Fajr", arabic: "الفجر", time: "5:41 AM", hour: 5, minute: 41 },
  { name: "Zohar", arabic: "الظهر", time: "2:30 PM", hour: 14, minute: 30 },
  { name: "Asr", arabic: "العصر", time: "5:15 PM", hour: 17, minute: 15 },
  { name: "Maghrib", arabic: "المغرب", time: "6:41 PM", hour: 18, minute: 41 },
  { name: "Isha", arabic: "العشاء", time: "8:45 PM", hour: 20, minute: 45 },
  {
    name: "Khutba Juma",
    arabic: "الجمعة",
    time: "1:30 PM",
    hour: 13,
    minute: 30,
    note: "Friday",
  },
];

function getNextPrayerIndex(): number {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const regularPrayers = prayerTimes.filter((p) => p.name !== "Khutba Juma");
  const idx = regularPrayers.findIndex(
    (p) => p.hour * 60 + p.minute > nowMinutes,
  );
  if (idx === -1) return 0;
  return prayerTimes.findIndex((p) => p.name === regularPrayers[idx].name);
}

const prayerIcons: Record<string, string> = {
  Fajr: "🌅",
  Zohar: "☀️",
  Asr: "🌤️",
  Maghrib: "🌆",
  Isha: "🌙",
  "Khutba Juma": "🕌",
};

export default function NamazScreen() {
  const nextIdx = useMemo(() => getNextPrayerIndex(), []);

  return (
    <div
      data-ocid="namaz.page"
      className="flex flex-col h-full overflow-hidden"
    >
      {/* Header */}
      <div
        className="flex-shrink-0 px-5 py-4 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.40 0.13 147) 0%, oklch(0.30 0.10 147) 100%)",
          borderBottom: "2px solid oklch(0.72 0.12 78)",
        }}
      >
        <div className="absolute inset-0 islamic-pattern opacity-15 pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-white font-bold text-lg">Namaz Timings</h1>
          <p
            className="text-xs mt-0.5"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Daily Salah Times — Jamia Husainiya
          </p>
        </div>
      </div>

      {/* Prayer times bar summary */}
      <div
        className="flex-shrink-0 px-4 py-2 islamic-pattern"
        style={{
          background: "oklch(0.72 0.12 78)",
        }}
      >
        <p
          className="text-center font-bold text-xs uppercase tracking-widest"
          style={{ color: "oklch(0.22 0.08 147)" }}
        >
          Daily Salah Times (Namaz)
        </p>
      </div>

      {/* Prayer cards */}
      <div
        className="flex-1 phone-content px-4 py-3 space-y-2.5"
        style={{ background: "oklch(0.97 0.01 147)" }}
      >
        {prayerTimes.map((prayer, index) => {
          const isNext = index === nextIdx && prayer.name !== "Khutba Juma";
          return (
            <div
              key={prayer.name}
              data-ocid={`namaz.item.${index + 1}`}
              className="rounded-2xl p-4 transition-all duration-200"
              style={{
                background: isNext
                  ? "linear-gradient(135deg, oklch(0.72 0.12 78) 0%, oklch(0.62 0.10 78) 100%)"
                  : "white",
                border: `1.5px solid ${
                  isNext ? "oklch(0.55 0.09 78)" : "oklch(0.88 0.02 147)"
                }`,
                boxShadow: isNext
                  ? "0 4px 16px rgba(200,169,81,0.25)"
                  : "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{
                      background: isNext
                        ? "oklch(0.40 0.13 147)"
                        : "oklch(0.93 0.05 147)",
                    }}
                  >
                    {prayerIcons[prayer.name] ?? "🕌"}
                  </div>
                  <div>
                    <p
                      className="font-bold text-sm"
                      style={{
                        color: isNext
                          ? "oklch(0.22 0.08 147)"
                          : "oklch(0.22 0.08 147)",
                      }}
                    >
                      {prayer.name}
                      {prayer.note && (
                        <span
                          className="ml-2 text-xs font-normal px-1.5 py-0.5 rounded-full"
                          style={{
                            background: isNext
                              ? "oklch(0.30 0.10 147)"
                              : "oklch(0.88 0.05 147)",
                            color: isNext ? "white" : "oklch(0.40 0.13 147)",
                          }}
                        >
                          {prayer.note}
                        </span>
                      )}
                    </p>
                    <p
                      className="text-xs mt-0.5 font-medium"
                      style={{
                        color: isNext
                          ? "oklch(0.30 0.10 147)"
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
                        ? "oklch(0.22 0.08 147)"
                        : "oklch(0.30 0.10 147)",
                      lineHeight: 1,
                    }}
                  >
                    {prayer.time}
                  </p>
                  {isNext && (
                    <span
                      className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-bold"
                      style={{
                        background: "oklch(0.30 0.10 147)",
                        color: "white",
                      }}
                    >
                      Next
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Footer note */}
        <div
          className="rounded-xl p-3 text-center"
          style={{
            background: "white",
            border: "1px solid oklch(0.88 0.02 147)",
          }}
        >
          <p className="text-xs" style={{ color: "oklch(0.45 0.02 240)" }}>
            Times are fixed for Jamia Husainiya Masjid Margoobpur. Please
            confirm with local mosque for adjustments.
          </p>
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
}
