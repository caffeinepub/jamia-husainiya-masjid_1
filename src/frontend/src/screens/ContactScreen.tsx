import {
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
  Settings,
} from "lucide-react";

interface ContactScreenProps {
  phone: string;
  onOpenAdmin: () => void;
}

export default function ContactScreen({
  phone,
  onOpenAdmin,
}: ContactScreenProps) {
  // Always use the correct Indian number for WhatsApp (+918958999299)
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  // For Indian numbers, ensure 91 country code prefix
  const whatsappNumber =
    cleanPhone.startsWith("91") && cleanPhone.length === 12
      ? cleanPhone
      : `91${cleanPhone.replace(/^0/, "")}`;
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div
      data-ocid="contact.page"
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
          <h1 className="text-white font-bold text-lg">Contact Us</h1>
          <p
            className="text-xs mt-0.5"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Reach the mosque committee
          </p>
        </div>
        <button
          type="button"
          data-ocid="contact.admin.open_modal_button"
          onClick={onOpenAdmin}
          className="p-2 rounded-xl transition-colors"
          style={{
            color: "rgba(255,255,255,0.75)",
            background: "rgba(255,255,255,0.15)",
          }}
          aria-label="Open admin panel"
        >
          <Settings size={17} />
        </button>
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
      >
        {/* Phone number display */}
        <div
          className="rounded-2xl p-4 text-center"
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <p className="text-xs mb-1" style={{ color: "#9ca3af" }}>
            Phone Number
          </p>
          <p
            className="font-bold text-lg"
            style={{ color: "oklch(0.22 0.08 147)" }}
          >
            {phone || "+91 89589 99299"}
          </p>
        </div>

        {/* Call Button */}
        <a
          data-ocid="contact.call.primary_button"
          href="tel:+918958999299"
          className="flex items-center justify-center gap-3 w-full rounded-2xl py-4 text-center font-bold text-base transition-all duration-200 active:scale-95"
          style={{
            background: "oklch(0.40 0.13 147)",
            color: "white",
            boxShadow: "0 4px 16px rgba(15,75,47,0.30)",
            border: "2px solid oklch(0.72 0.12 78)",
            textDecoration: "none",
          }}
        >
          <Phone size={18} />
          Call Mosque Committee
        </a>

        {/* WhatsApp */}
        <a
          data-ocid="contact.whatsapp.button"
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-2xl p-4 transition-all duration-200 active:scale-95"
          style={{
            background: "#25D366",
            border: "1px solid #1da851",
            boxShadow: "0 4px 16px rgba(37,211,102,0.30)",
            textDecoration: "none",
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.25)" }}
          >
            <MessageCircle size={18} style={{ color: "white" }} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm" style={{ color: "white" }}>
              WhatsApp
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.85)" }}>
              Message us on WhatsApp
            </p>
          </div>
          <ExternalLink size={14} style={{ color: "rgba(255,255,255,0.75)" }} />
        </a>

        {/* Address */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: "white",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.93 0.05 147)" }}
            >
              <MapPin size={16} style={{ color: "oklch(0.40 0.13 147)" }} />
            </div>
            <p
              className="font-bold text-sm"
              style={{ color: "oklch(0.40 0.13 147)" }}
            >
              Address
            </p>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
            Margoobpur, Haridwar,
            <br />
            Uttarakhand, India
          </p>
          <p className="text-xs mt-2 font-mono" style={{ color: "#9ca3af" }}>
            GPS: 29.863646, 77.971577
          </p>
        </div>

        {/* Info card */}
        <div
          className="rounded-xl p-3 text-center"
          style={{
            background: "oklch(0.93 0.05 147)",
            border: "1px solid oklch(0.88 0.04 147)",
          }}
        >
          <p className="text-xs" style={{ color: "oklch(0.40 0.13 147)" }}>
            🕌 Jamia Husainiya Masjid Margoobpur
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
            Open for all five daily prayers
          </p>
        </div>

        <div className="pb-4" />
      </div>
    </div>
  );
}
