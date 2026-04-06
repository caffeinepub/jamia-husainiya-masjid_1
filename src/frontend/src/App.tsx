import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Announcement, MapCoords, backendInterface } from "./backend.d";
import AdminPanel from "./components/AdminPanel";
import BottomNav from "./components/BottomNav";
import { useActor } from "./hooks/useActor";
import ContactScreen from "./screens/ContactScreen";
import HomeScreen from "./screens/HomeScreen";
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
  isLoading: boolean;
}

export default function App() {
  const { actor: rawActor, isFetching: actorFetching } = useActor();
  const actor = rawActor as unknown as backendInterface | null;
  const [activeTab, setActiveTab] =
    useState<Exclude<TabId, "admin" | "log">>("home");
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminPin, setAdminPin] = useState<string | null>(null);
  const [appData, setAppData] = useState<AppData>({
    announcements: [],
    phone: "+92-300-0000000",
    coords: { lat: 31.5, lng: 74.3 },
    isLoading: true,
  });

  const fetchData = useCallback(async () => {
    if (!actor) return;
    setAppData((prev) => ({ ...prev, isLoading: true }));
    try {
      const [announcements, phone, coords] = await Promise.all([
        actor.getAnnouncements(),
        actor.getContactPhone(),
        actor.getMapCoords(),
      ]);
      setAppData({ announcements, phone, coords, isLoading: false });
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
    } else if (tab !== "log") {
      setActiveTab(tab as Exclude<TabId, "admin" | "log">);
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

  const screens: Record<Exclude<TabId, "admin" | "log">, React.ReactNode> = {
    home: (
      <HomeScreen announcements={appData.announcements} phone={appData.phone} />
    ),
    namaz: <NamazScreen />,
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

      {/* Bottom Navigation — fixed at bottom, full width */}
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
