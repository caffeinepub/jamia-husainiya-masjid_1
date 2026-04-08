import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  Announcement,
  MapCoords,
  PrayerTime,
  backendInterface,
} from "./backend.d";
import AdminPanel from "./components/AdminPanel";
import BottomNav from "./components/BottomNav";
import { useActor } from "./hooks/useActor";
import ContactScreen from "./screens/ContactScreen";
import HomeScreen from "./screens/HomeScreen";
import LogScreen from "./screens/LogScreen";
import MapScreen from "./screens/MapScreen";
import NamazScreen from "./screens/NamazScreen";
import NoticeScreen from "./screens/NoticeScreen";

export type TabId =
  | "home"
  | "namaz"
  | "notice"
  | "contact"
  | "map"
  | "log"
  | "admin";

export interface AppData {
  announcements: Announcement[];
  phone: string;
  coords: MapCoords;
  prayerTimes: PrayerTime[];
  isLoading: boolean;
}

const DEFAULT_PRAYER_TIMES: PrayerTime[] = [
  { name: "Fajr", arabic: "\u0627\u0644\u0641\u062c\u0631", time: "5:41 AM" },
  { name: "Zohar", arabic: "\u0627\u0644\u0638\u0647\u0631", time: "1:30 PM" },
  { name: "Asr", arabic: "\u0627\u0644\u0639\u0635\u0631", time: "5:15 PM" },
  {
    name: "Maghrib",
    arabic: "\u0627\u0644\u0645\u063a\u0631\u0628",
    time: "6:41 PM",
  },
  {
    name: "Isha",
    arabic: "\u0627\u0644\u0639\u0634\u0627\u0621",
    time: "8:45 PM",
  },
  {
    name: "Khutba Juma",
    arabic: "\u0627\u0644\u062c\u0645\u0639\u0629",
    time: "1:30 PM",
  },
];

// Canonical prayer order — ensures user panel always shows prayers in a fixed order
// regardless of what order the backend returns them in
const PRAYER_ORDER = ["Fajr", "Zohar", "Asr", "Maghrib", "Isha", "Khutba Juma"];

// Arabic names mapped by prayer name — used to fill in if backend omits arabic field
const ARABIC_BY_NAME: Record<string, string> = {
  Fajr: "\u0627\u0644\u0641\u062c\u0631",
  Zohar: "\u0627\u0644\u0638\u0647\u0631",
  Asr: "\u0627\u0644\u0639\u0635\u0631",
  Maghrib: "\u0627\u0644\u0645\u063a\u0631\u0628",
  Isha: "\u0627\u0644\u0639\u0634\u0627\u0621",
  "Khutba Juma": "\u0627\u0644\u062c\u0645\u0639\u0629",
};

/**
 * Merge backend prayer times with defaults.
 * - Preserves the canonical PRAYER_ORDER so Home/Namaz always display in correct sequence
 * - Picks up the saved `time` from backend by matching `name` field
 * - Falls back to DEFAULT_PRAYER_TIMES entry if a prayer is missing from backend
 */
function mergePrayerTimes(backendTimes: PrayerTime[]): PrayerTime[] {
  // Build a map keyed by prayer name for O(1) lookup
  const byName = new Map<string, PrayerTime>();
  for (const pt of backendTimes) {
    byName.set(pt.name, pt);
  }

  return PRAYER_ORDER.map((name) => {
    const fromBackend = byName.get(name);
    const defaultEntry =
      DEFAULT_PRAYER_TIMES.find((d) => d.name === name) ??
      DEFAULT_PRAYER_TIMES[0];
    if (fromBackend) {
      return {
        name: fromBackend.name,
        // Always use the canonical Arabic from our map so it never gets corrupted
        arabic: ARABIC_BY_NAME[name] ?? fromBackend.arabic,
        // Use backend time — this is the value the admin saved
        time: fromBackend.time,
      };
    }
    return defaultEntry;
  });
}

export default function App() {
  const { actor: rawActor, isFetching: actorFetching } = useActor();
  const actor = rawActor as unknown as backendInterface | null;
  const [activeTab, setActiveTab] = useState<Exclude<TabId, "admin">>("home");
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminPin, setAdminPin] = useState<string | null>(null);
  const [appData, setAppData] = useState<AppData>({
    announcements: [],
    phone: "+918958999299",
    coords: { lat: 29.863646, lng: 77.971577 },
    prayerTimes: DEFAULT_PRAYER_TIMES,
    isLoading: true,
  });

  // Keep a stable ref to actor so polling interval always has the latest
  const actorRef = useRef<backendInterface | null>(null);
  useEffect(() => {
    actorRef.current = actor;
  }, [actor]);

  const fetchData = useCallback(async () => {
    const currentActor = actorRef.current;
    if (!currentActor) return;
    setAppData((prev) => ({ ...prev, isLoading: true }));
    try {
      const [announcements, phone, coords, rawPrayerTimes] = await Promise.all([
        currentActor.getAnnouncements(),
        currentActor.getContactPhone(),
        currentActor.getMapCoords(),
        currentActor.getPrayerTimes(),
      ]);

      // Merge and re-order prayer times so user panel always shows correct values
      const prayerTimes = mergePrayerTimes(rawPrayerTimes);

      setAppData({
        announcements,
        phone,
        coords,
        prayerTimes,
        isLoading: false,
      });
    } catch (err) {
      console.error("Failed to load data", err);
      setAppData((prev) => ({ ...prev, isLoading: false }));
    }
  }, []); // stable — uses actorRef internally

  // Fetch once when actor is ready
  useEffect(() => {
    if (actor && !actorFetching) {
      fetchData();
    }
  }, [actor, actorFetching, fetchData]);

  // Poll every 5 seconds — shorter interval helps the user panel pick up
  // changes shortly after the admin saves, even if the first post-save fetch
  // returns a cached response from the agent.
  useEffect(() => {
    const interval = setInterval(() => {
      if (actorRef.current) {
        fetchData();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Re-fetch fresh data whenever user switches to home or namaz tab
  useEffect(() => {
    if ((activeTab === "home" || activeTab === "namaz") && actorRef.current) {
      fetchData();
    }
  }, [activeTab, fetchData]);

  const switchTab = (tab: TabId) => {
    if (tab === "admin") {
      openAdmin();
    } else {
      setActiveTab(tab as Exclude<TabId, "admin">);
    }
  };

  const openAdmin = () => setAdminOpen(true);
  const closeAdmin = () => setAdminOpen(false);

  const handleAdminSaved = () => {
    // After admin saves, wait 500 ms for the backend update call to commit,
    // then fetch fresh prayer times. A second fetch at 2 s ensures we get
    // the latest data even if the agent returns a stale cached response on
    // the first call.
    setTimeout(() => fetchData(), 500);
    setTimeout(() => fetchData(), 2000);
  };

  const screenVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const screens: Record<Exclude<TabId, "admin">, React.ReactNode> = {
    home: (
      <HomeScreen
        announcements={appData.announcements}
        phone={appData.phone}
        prayerTimes={appData.prayerTimes}
      />
    ),
    namaz: (
      <NamazScreen
        prayerTimes={appData.prayerTimes}
        isLoading={appData.isLoading}
      />
    ),
    notice: (
      <NoticeScreen
        announcements={appData.announcements}
        isLoading={appData.isLoading}
        onOpenAdmin={openAdmin}
      />
    ),
    contact: <ContactScreen phone={appData.phone} onOpenAdmin={openAdmin} />,
    map: (
      <MapScreen
        coords={appData.coords}
        isLoading={appData.isLoading}
        onOpenAdmin={openAdmin}
      />
    ),
    log: <LogScreen />,
  };

  return (
    <div
      data-ocid="app.panel"
      className="min-h-screen flex flex-col bg-gray-50"
      style={{ minHeight: "100dvh" }}
    >
      {/* Scrollable screen content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={screenVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="flex-1 flex flex-col overflow-hidden h-full"
            style={{ minHeight: 0 }}
          >
            {screens[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={switchTab} />

      {/* Admin Panel Modal */}
      <AdminPanel
        open={adminOpen}
        onClose={closeAdmin}
        actor={actor}
        pin={adminPin}
        onPinSet={setAdminPin}
        appData={appData}
        onSaved={handleAdminSaved}
      />

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "oklch(0.40 0.13 147)",
            color: "white",
            border: "1px solid oklch(0.72 0.12 78)",
          },
        }}
      />
    </div>
  );
}
