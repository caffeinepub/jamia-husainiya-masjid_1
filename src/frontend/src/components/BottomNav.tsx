import type { TabId } from "../App";

interface NavItem {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="18"
      height="18"
      aria-hidden="true"
      role="img"
    >
      <title>Home</title>
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a2 2 0 002 2h2a1 1 0 001-1v-4h2v4a1 1 0 001 1h2a2 2 0 002-2v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  );
}

function PrayerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="18"
      height="18"
      aria-hidden="true"
      role="img"
    >
      <title>Prayer</title>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z" />
    </svg>
  );
}

function NoticeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="18"
      height="18"
      aria-hidden="true"
      role="img"
    >
      <title>Notice</title>
      <path d="M18 11c0-1.4-.5-2.7-1.3-3.7L18 6h-2.5C14.3 4.8 13.2 4 12 4S9.7 4.8 8.5 6H6l1.3 1.3C6.5 8.3 6 9.6 6 11v5H4v2h7v1a1 1 0 002 0v-1h7v-2h-2v-5zm-2 5H8v-5c0-2.2 1.8-4 4-4s4 1.8 4 4v5z" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="18"
      height="18"
      aria-hidden="true"
      role="img"
    >
      <title>Contact</title>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="18"
      height="18"
      aria-hidden="true"
      role="img"
    >
      <title>Map</title>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="18"
      height="18"
      aria-hidden="true"
      role="img"
    >
      <title>People</title>
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

function AdminIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="18"
      height="18"
      aria-hidden="true"
      role="img"
    >
      <title>Admin</title>
      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
    </svg>
  );
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: <HomeIcon /> },
  { id: "namaz", label: "Namaz", icon: <PrayerIcon /> },
  { id: "notice", label: "Notice", icon: <NoticeIcon /> },
  { id: "contact", label: "Contact", icon: <ContactIcon /> },
  { id: "map", label: "Map", icon: <MapIcon /> },
  { id: "log", label: "لوگ", icon: <PeopleIcon /> },
  { id: "admin", label: "Admin", icon: <AdminIcon /> },
];

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="flex-shrink-0 flex items-center justify-around"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.30 0.10 147) 0%, oklch(0.22 0.08 147) 100%)",
        borderTop: "1px solid oklch(0.35 0.11 147)",
        paddingBottom: "env(safe-area-inset-bottom, 6px)",
        paddingTop: "4px",
        paddingLeft: "2px",
        paddingRight: "2px",
        minHeight: "58px",
        overflowX: "auto",
      }}
    >
      {navItems.map((item) => {
        const isActive = item.id !== "admin" && activeTab === item.id;
        const isUrdu = item.id === "log";
        return (
          <button
            key={item.id}
            type="button"
            data-ocid={`nav.${item.id}.tab`}
            onClick={() => onTabChange(item.id)}
            className="flex flex-col items-center gap-0.5 py-1 rounded-xl transition-all duration-200 flex-shrink-0"
            style={{
              color: isActive
                ? "oklch(0.72 0.12 78)"
                : "rgba(255,255,255,0.65)",
              background: isActive ? "oklch(0.36 0.11 147)" : "transparent",
              transform: isActive ? "scale(1.05)" : "scale(1)",
              minWidth: "44px",
              maxWidth: "52px",
              width: "100%",
              paddingLeft: "2px",
              paddingRight: "2px",
            }}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="transition-transform duration-200">
              {item.icon}
            </span>
            <span
              className="font-semibold tracking-wide leading-tight text-center"
              style={{
                fontSize: isUrdu ? "11px" : "9px",
                color: isActive
                  ? "oklch(0.72 0.12 78)"
                  : "rgba(255,255,255,0.65)",
                fontFamily: isUrdu
                  ? "'Scheherazade New', 'Noto Nastaliq Urdu', serif"
                  : undefined,
                direction: isUrdu ? "rtl" : undefined,
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
