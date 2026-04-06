import { Navigation, Settings } from "lucide-react";
import type { MapCoords } from "../backend.d";

interface MapScreenProps {
  coords: MapCoords;
  isLoading: boolean;
  onOpenAdmin: () => void;
}

export default function MapScreen({
  coords,
  isLoading,
  onOpenAdmin,
}: MapScreenProps) {
  const mapsUrl = `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`;
  const directionsUrl = `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;

  return (
    <div data-ocid="map.page" className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-5 py-4 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.40 0.13 147) 0%, oklch(0.30 0.10 147) 100%)",
          borderBottom: "2px solid oklch(0.72 0.12 78)",
        }}
      >
        <div className="absolute inset-0 islamic-pattern opacity-15 pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-white font-bold text-lg">Location</h1>
          <p
            className="text-xs mt-0.5"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Find us at Margoobpur
          </p>
        </div>
        <button
          type="button"
          data-ocid="map.admin.open_modal_button"
          onClick={onOpenAdmin}
          className="relative z-10 p-2 rounded-xl transition-colors"
          style={{
            color: "rgba(255,255,255,0.65)",
            background: "rgba(255,255,255,0.1)",
          }}
          aria-label="Open admin panel"
        >
          <Settings size={17} />
        </button>
      </div>

      {/* Content */}
      <div
        className="flex-1 phone-content px-4 py-4 space-y-4"
        style={{ background: "oklch(0.97 0.01 147)" }}
      >
        {/* Map iframe */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border: "2px solid oklch(0.72 0.12 78)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          }}
        >
          {isLoading ? (
            <div
              data-ocid="map.loading_state"
              className="flex items-center justify-center bg-white"
              style={{ height: "320px" }}
            >
              <div className="text-center">
                <div
                  className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin mx-auto mb-2"
                  style={{
                    borderColor: "oklch(0.40 0.13 147)",
                    borderTopColor: "transparent",
                  }}
                />
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.55 0.02 240)" }}
                >
                  Loading map...
                </p>
              </div>
            </div>
          ) : (
            <iframe
              src={mapsUrl}
              width="100%"
              height="320"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mosque Location"
            />
          )}
        </div>

        {/* Get Directions button */}
        <a
          data-ocid="map.directions.primary_button"
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full rounded-2xl py-3.5 font-bold text-sm transition-all duration-200 active:scale-95"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.12 78) 0%, oklch(0.62 0.10 78) 100%)",
            color: "oklch(0.22 0.08 147)",
            boxShadow: "0 4px 12px rgba(200,169,81,0.3)",
            border: "1px solid oklch(0.55 0.09 78)",
            textDecoration: "none",
          }}
        >
          <Navigation size={16} />
          Get Directions
        </a>

        {/* Address card */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: "white",
            border: "1px solid oklch(0.88 0.02 147)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <p
            className="font-bold text-sm mb-1"
            style={{ color: "oklch(0.40 0.13 147)" }}
          >
            🕌 Jamia Husainiya Masjid
          </p>
          <p className="text-sm" style={{ color: "oklch(0.35 0.02 240)" }}>
            Masjid Road, Margoobpur,
            <br />
            Punjab, Pakistan
          </p>
          <p
            className="text-xs mt-2 font-mono"
            style={{ color: "oklch(0.55 0.02 240)" }}
          >
            {coords.lat.toFixed(4)}° N, {coords.lng.toFixed(4)}° E
          </p>
        </div>

        {/* Footer */}
        <div className="pb-2" />
      </div>
    </div>
  );
}
