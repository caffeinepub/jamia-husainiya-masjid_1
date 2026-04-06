import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
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

export default function App() {
  const { actor: rawActor, isFetching: actorFetching } = useActor();
  const actor = rawActor as unknown as backendInterface | null;
  const [activeTab, setActiveTab] = useState<Exclude<TabId, "admin">>("home");
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminPin, setAdminPin] = useState<string | null>(null);
  const [appData, setAppData] = useState<AppData>({
    announcements: [],
    phone: "+91 89589 99299",
    coords: { lat: 29.863646, lng: 77.971577 },
    prayerTimes: DEFAULT_PRAYER_TIMES,
    isLoading: true,
  });

  const fetchData = useCallback(async () => {
    if (!actor) return;
    setAppData((prev) => ({ ...prev, isLoading: true }));
    try {
      const [announcements, phone, coords, prayerTimes] = await Promise.all([
        actor.getAnnouncements(),
        actor.getContactPhone(),
        actor.getMapCoords(),
        actor.getPrayerTimes(),
      ]);
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
  }, [actor]);

  useEffect(() => {
    if (actor && !actorFetching) {
      fetchData();
    }
  }, [actor, actorFetching, fetchData]);

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
    fetchData();
    toast.success("Changes saved successfully");
  };

  const screenVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const screens: Record<Exclude<TabId, "admin">, React.ReactNode> = {
    home: (
      <HomeScreen announcements={appData.announcements} phone={appData.phone} />
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
