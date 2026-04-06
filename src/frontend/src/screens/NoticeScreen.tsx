import { Skeleton } from "@/components/ui/skeleton";
import { Megaphone, Settings } from "lucide-react";
import type { Announcement } from "../backend.d";

interface NoticeScreenProps {
  announcements: Announcement[];
  isLoading: boolean;
  onOpenAdmin: () => void;
}

export default function NoticeScreen({
  announcements,
  isLoading,
  onOpenAdmin,
}: NoticeScreenProps) {
  return (
    <div
      data-ocid="notice.page"
      className="flex flex-col"
      style={{ minHeight: "100%", background: "#f9fafb" }}
    >
      {/* Header */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-5 py-4"
        style={{
          background: "oklch(0.40 0.13 147)",
          borderBottom: "2px solid oklch(0.72 0.12 78)",
        }}
      >
        <div>
          <h1 className="text-white font-bold text-lg">Announcements</h1>
          <p
            className="text-xs mt-0.5"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Mosque notices & updates
          </p>
        </div>
        <button
          type="button"
          data-ocid="notice.admin.open_modal_button"
          onClick={onOpenAdmin}
          className="p-2 rounded-xl transition-colors"
          style={{
            color: "rgba(255,255,255,0.75)",
            background: "rgba(255,255,255,0.15)",
          }}
          aria-label="Open admin panel"
          title="Admin Panel"
        >
          <Settings size={17} />
        </button>
      </div>

      {/* Announcements list */}
      <div
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
      >
        {isLoading ? (
          <div data-ocid="notice.loading_state" className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl p-4 bg-white"
                style={{ border: "1px solid #e5e7eb" }}
              >
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ))}
          </div>
        ) : announcements.length === 0 ? (
          <div
            data-ocid="notice.empty_state"
            className="flex flex-col items-center justify-center py-16 gap-3"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "oklch(0.93 0.05 147)" }}
            >
              <Megaphone size={28} style={{ color: "oklch(0.40 0.13 147)" }} />
            </div>
            <p
              className="font-semibold text-sm"
              style={{ color: "oklch(0.40 0.13 147)" }}
            >
              No Announcements
            </p>
            <p className="text-xs text-center" style={{ color: "#9ca3af" }}>
              There are no notices at this time.
              <br />
              Check back later.
            </p>
          </div>
        ) : (
          announcements.map((ann, index) => (
            <div
              key={ann.id.toString()}
              data-ocid={`notice.item.${index + 1}`}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {/* Gold top accent bar */}
              <div
                style={{ height: "3px", background: "oklch(0.72 0.12 78)" }}
              />
              <div className="p-4">
                <div className="flex items-start gap-2 mb-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "oklch(0.93 0.05 147)" }}
                  >
                    <Megaphone
                      size={13}
                      style={{ color: "oklch(0.40 0.13 147)" }}
                    />
                  </div>
                  <h3
                    className="font-bold text-sm leading-snug flex-1"
                    style={{ color: "oklch(0.22 0.08 147)" }}
                  >
                    {ann.title}
                  </h3>
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#6b7280" }}
                >
                  {ann.body}
                </p>
                <span
                  className="inline-block mt-3 text-xs px-2.5 py-1 rounded-full font-semibold"
                  style={{
                    background: "oklch(0.93 0.05 78)",
                    color: "oklch(0.50 0.10 78)",
                    border: "1px solid oklch(0.85 0.08 78)",
                  }}
                >
                  📅 {ann.date}
                </span>
              </div>
            </div>
          ))
        )}

        <div className="pb-4" />
      </div>
    </div>
  );
}
