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
  isLoading: boolean;
}

export default function App() {
  const { actor: rawActor, isFetching: actorFetching } = useActor();
  // Cast to full typed interface from backend.d.ts
  const actor = rawActor as unknown as backendInterface | null;
  const [activeTab, setActiveTab] = useState<Exclude<TabId, "admin">>("home");
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
    } else {
      setActiveTab(tab);
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
    log: <LogScreen />,
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background circles */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "oklch(0.40 0.13 147)",
          top: "-5rem",
          left: "-5rem",
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "oklch(0.72 0.12 78)",
          bottom: "-4rem",
          right: "-4rem",
          opacity: 0.08,
        }}
      />
      <div
        className="absolute w-60 h-60 rounded-full pointer-events-none"
        style={{
          background: "oklch(0.40 0.13 147)",
          top: "50%",
          right: "10%",
          transform: "translateY(-50%)",
          opacity: 0.06,
        }}
      />

      {/* Phone Frame */}
      <div
        data-ocid="app.panel"
        className="relative flex flex-col overflow-hidden"
        style={{
          width: "100%",
          maxWidth: "420px",
          height: "100dvh",
          maxHeight: "860px",
          minHeight: "640px",
          borderRadius: "2.5rem",
          boxShadow:
            "0 32px 64px rgba(0,0,0,0.28), 0 8px 24px rgba(0,0,0,0.14)",
          background:
            "linear-gradient(180deg, oklch(0.30 0.10 147) 0%, oklch(0.22 0.08 147) 100%)",
          border: "4px solid oklch(0.22 0.08 147)",
        }}
      >
        {/* Scrollable content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              {screens[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={switchTab} />
      </div>

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
