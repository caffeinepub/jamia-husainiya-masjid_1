import {
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
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
  const whatsappLink = `https://wa.me/${phone.replace(/[^0-9]/g, "")}`;

  return (
    <div
      data-ocid="contact.page"
      className="flex flex-col h-full overflow-hidden"
    >
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
          <h1 className="text-white font-bold text-lg">Contact Us</h1>
          <p
            className="text-xs mt-0.5"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Reach the mosque committee
          </p>
        </div>
        <button
          type="button"
          data-ocid="contact.admin.open_modal_button"
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
        {/* Call Button */}
        <a
          data-ocid="contact.call.primary_button"
          href={`tel:${phone}`}
          className="block w-full rounded-2xl py-4 text-center font-bold text-base transition-all duration-200 active:scale-95"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.40 0.13 147) 0%, oklch(0.30 0.10 147) 100%)",
            color: "white",
            boxShadow: "0 4px 16px rgba(15,75,47,0.35)",
            border: "2px solid oklch(0.72 0.12 78)",
            textDecoration: "none",
          }}
        >
          <span className="text-lg mr-2">📞</span>
          Call Mosque Committee
        </a>

        {/* Phone number display */}
        <div
          className="rounded-2xl p-4 text-center"
          style={{
            background: "white",
            border: "1px solid oklch(0.88 0.02 147)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <p className="text-xs mb-1" style={{ color: "oklch(0.55 0.02 240)" }}>
            Phone Number
          </p>
          <p
            className="font-bold text-base"
            style={{ color: "oklch(0.22 0.08 147)" }}
          >
            {phone}
          </p>
        </div>

        {/* Address */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: "white",
            border: "1px solid oklch(0.88 0.02 147)",
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
          <p
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.35 0.02 240)" }}
          >
            Masjid Road, Margoobpur,
            <br />
            Punjab, Pakistan
          </p>
        </div>

        {/* Email */}
        <div
          className="rounded-2xl p-4"
          style={{
            background: "white",
            border: "1px solid oklch(0.88 0.02 147)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "oklch(0.93 0.05 147)" }}
            >
              <Mail size={16} style={{ color: "oklch(0.40 0.13 147)" }} />
            </div>
            <p
              className="font-bold text-sm"
              style={{ color: "oklch(0.40 0.13 147)" }}
            >
              Email
            </p>
          </div>
          <p className="text-sm" style={{ color: "oklch(0.35 0.02 240)" }}>
            info@masjid-margoobpur.pk
          </p>
        </div>

        {/* WhatsApp */}
        <a
          data-ocid="contact.whatsapp.button"
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-2xl p-4 transition-all duration-200 active:scale-95"
          style={{
            background: "white",
            border: "1px solid oklch(0.88 0.02 147)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            textDecoration: "none",
          }}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#e8f8f0" }}
          >
            <MessageCircle size={16} style={{ color: "#25D366" }} />
          </div>
          <div className="flex-1">
            <p
              className="font-bold text-sm"
              style={{ color: "oklch(0.22 0.08 147)" }}
            >
              WhatsApp
            </p>
            <p className="text-xs" style={{ color: "oklch(0.55 0.02 240)" }}>
              Message us on WhatsApp
            </p>
          </div>
          <ExternalLink size={14} style={{ color: "oklch(0.55 0.02 240)" }} />
        </a>

        {/* Footer */}
        <div
          className="rounded-xl p-3 text-center"
          style={{
            background: "oklch(0.93 0.05 147)",
            border: "1px solid oklch(0.88 0.02 147)",
          }}
        >
          <p className="text-xs" style={{ color: "oklch(0.40 0.13 147)" }}>
            🕌 Jamia Husainiya Masjid Margoobpur
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: "oklch(0.55 0.02 240)" }}
          >
            Open for all five daily prayers
          </p>
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
}
