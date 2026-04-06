import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { AppData } from "../App";
import type { Announcement, backendInterface } from "../backend.d";

const FALLBACK_PIN = "786";

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
  actor: backendInterface | null;
  pin: string | null;
  onPinSet: (pin: string) => void;
  appData: AppData;
  onSaved: () => void;
}

export default function AdminPanel({
  open,
  onClose,
  actor,
  pin,
  onPinSet,
  appData,
  onSaved,
}: AdminPanelProps) {
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Announcement state
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editDate, setEditDate] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newDate, setNewDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [savingAnnouncement, setSavingAnnouncement] = useState(false);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  // Contact state
  const [editPhone, setEditPhone] = useState(appData.phone);
  const [savingPhone, setSavingPhone] = useState(false);

  // Map state
  const [editLat, setEditLat] = useState(appData.coords.lat.toString());
  const [editLng, setEditLng] = useState(appData.coords.lng.toString());
  const [savingMap, setSavingMap] = useState(false);

  // Prayer times state
  const [savingPrayer, setSavingPrayer] = useState<string | null>(null);
  const [prayerEdits, setPrayerEdits] = useState<Record<string, string>>(
    Object.fromEntries(appData.prayerTimes.map((p) => [p.name, p.time])),
  );

  const handleVerifyPin = async () => {
    const trimmed = pinInput.trim();
    if (!trimmed) return;
    setVerifying(true);
    setPinError(false);
    try {
      let valid = false;
      if (actor) {
        try {
          valid = await actor.verifyPin(trimmed);
        } catch {
          // Backend call failed; fall back to local check
          valid = trimmed === FALLBACK_PIN;
        }
      } else {
        // Actor not yet loaded; use local fallback
        valid = trimmed === FALLBACK_PIN;
      }

      if (valid) {
        onPinSet(trimmed);
        setEditPhone(appData.phone);
        setEditLat(appData.coords.lat.toString());
        setEditLng(appData.coords.lng.toString());
        setPrayerEdits(
          Object.fromEntries(appData.prayerTimes.map((p) => [p.name, p.time])),
        );
      } else {
        setPinError(true);
        setPinInput("");
      }
    } catch {
      setPinError(true);
    } finally {
      setVerifying(false);
    }
  };

  const handleClose = () => {
    setPinInput("");
    setPinError(false);
    setEditingId(null);
    setNewTitle("");
    setNewBody("");
    onClose();
  };

  const startEdit = (ann: Announcement) => {
    setEditingId(ann.id);
    setEditTitle(ann.title);
    setEditBody(ann.body);
    setEditDate(ann.date);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async () => {
    if (!pin || editingId === null || !actor) return;
    setSavingAnnouncement(true);
    try {
      const ok = await actor.updateAnnouncement(
        pin,
        editingId,
        editTitle,
        editBody,
        editDate,
      );
      if (ok) {
        setEditingId(null);
        onSaved();
      } else {
        toast.error("Failed to update announcement");
      }
    } catch {
      toast.error("Error updating announcement");
    } finally {
      setSavingAnnouncement(false);
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!pin || !actor) return;
    setDeletingId(id);
    try {
      const ok = await actor.deleteAnnouncement(pin, id);
      if (ok) {
        onSaved();
      } else {
        toast.error("Failed to delete announcement");
      }
    } catch {
      toast.error("Error deleting announcement");
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddAnnouncement = async () => {
    if (!pin || !newTitle.trim() || !newBody.trim() || !actor) {
      toast.error("Title and body are required");
      return;
    }
    setSavingAnnouncement(true);
    try {
      const ok = await actor.addAnnouncement(
        pin,
        newTitle.trim(),
        newBody.trim(),
        newDate,
      );
      if (ok) {
        setNewTitle("");
        setNewBody("");
        setNewDate(new Date().toISOString().split("T")[0]);
        onSaved();
      } else {
        toast.error("Failed to add announcement");
      }
    } catch {
      toast.error("Error adding announcement");
    } finally {
      setSavingAnnouncement(false);
    }
  };

  const handleSavePhone = async () => {
    if (!pin || !actor) return;
    setSavingPhone(true);
    try {
      const ok = await actor.setContactPhone(pin, editPhone.trim());
      if (ok) {
        onSaved();
      } else {
        toast.error("Failed to update phone");
      }
    } catch {
      toast.error("Error updating phone");
    } finally {
      setSavingPhone(false);
    }
  };

  const handleSaveMap = async () => {
    if (!pin || !actor) return;
    const lat = Number.parseFloat(editLat);
    const lng = Number.parseFloat(editLng);
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      toast.error("Invalid coordinates");
      return;
    }
    setSavingMap(true);
    try {
      const ok = await actor.setMapCoords(pin, lat, lng);
      if (ok) {
        onSaved();
      } else {
        toast.error("Failed to update map coordinates");
      }
    } catch {
      toast.error("Error updating coordinates");
    } finally {
      setSavingMap(false);
    }
  };

  const handleSavePrayerTime = async (name: string) => {
    if (!pin || !actor) return;
    const time = prayerEdits[name];
    if (!time?.trim()) {
      toast.error("Time cannot be empty");
      return;
    }
    setSavingPrayer(name);
    try {
      const ok = await actor.updatePrayerTime(pin, name, time.trim());
      if (ok) {
        onSaved();
        toast.success(`${name} time updated`);
      } else {
        toast.error("Failed to update prayer time");
      }
    } catch {
      toast.error("Error updating prayer time");
    } finally {
      setSavingPrayer(null);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            data-ocid="admin.dialog"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative flex flex-col overflow-hidden"
            style={{
              width: "100%",
              maxWidth: "420px",
              maxHeight: "85vh",
              background: "white",
              borderRadius: "1.5rem 1.5rem 0 0",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.40 0.13 147) 0%, oklch(0.30 0.10 147) 100%)",
              }}
            >
              <h2 className="text-white font-bold text-base">⚙️ Admin Panel</h2>
              <button
                type="button"
                data-ocid="admin.close_button"
                onClick={handleClose}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-lg"
                aria-label="Close admin panel"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {!pin ? (
                /* PIN Entry */
                <div className="p-6 flex flex-col gap-4">
                  <div className="text-center">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
                      style={{ background: "oklch(0.93 0.05 147)" }}
                    >
                      <span style={{ fontSize: "1.8rem" }}>🔐</span>
                    </div>
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "oklch(0.28 0.10 147)" }}
                    >
                      Admin Access
                    </p>
                    <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>
                      3-digit PIN डालें / Enter your 3-digit PIN
                    </p>
                  </div>
                  <Input
                    data-ocid="admin.pin.input"
                    type="number"
                    inputMode="numeric"
                    placeholder="786"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleVerifyPin()}
                    className="text-center text-lg tracking-[0.4em] font-mono"
                    style={{
                      borderColor: pinError
                        ? "oklch(0.577 0.245 27.325)"
                        : "oklch(0.88 0.02 147)",
                    }}
                    maxLength={3}
                  />
                  {pinError && (
                    <div
                      data-ocid="admin.pin.error_state"
                      className="rounded-xl p-3 text-center"
                      style={{
                        background: "oklch(0.97 0.02 27)",
                        border: "1px solid oklch(0.90 0.06 27)",
                      }}
                    >
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "oklch(0.50 0.20 27.325)" }}
                      >
                        ❌ गलत PIN है
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "oklch(0.60 0.15 27.325)" }}
                      >
                        Wrong PIN. Please try again.
                      </p>
                    </div>
                  )}
                  <Button
                    data-ocid="admin.pin.submit_button"
                    onClick={handleVerifyPin}
                    disabled={verifying || !pinInput.trim()}
                    className="w-full font-semibold"
                    style={{
                      background: "oklch(0.40 0.13 147)",
                      color: "white",
                    }}
                  >
                    {verifying && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Verify PIN
                  </Button>
                </div>
              ) : (
                /* Admin Tabs */
                <Tabs defaultValue="announcements" className="flex flex-col">
                  <TabsList
                    className="mx-4 mt-3 grid grid-cols-4 flex-shrink-0"
                    style={{ background: "oklch(0.93 0.01 147)" }}
                  >
                    <TabsTrigger
                      data-ocid="admin.announcements.tab"
                      value="announcements"
                      className="text-xs"
                    >
                      Notices
                    </TabsTrigger>
                    <TabsTrigger
                      data-ocid="admin.prayer.tab"
                      value="prayer"
                      className="text-xs"
                    >
                      Namaz
                    </TabsTrigger>
                    <TabsTrigger
                      data-ocid="admin.contact.tab"
                      value="contact"
                      className="text-xs"
                    >
                      Contact
                    </TabsTrigger>
                    <TabsTrigger
                      data-ocid="admin.map.tab"
                      value="map"
                      className="text-xs"
                    >
                      Map
                    </TabsTrigger>
                  </TabsList>

                  {/* Announcements Tab */}
                  <TabsContent
                    value="announcements"
                    className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 mt-3"
                  >
                    {/* Add new */}
                    <div
                      className="p-3 rounded-xl border space-y-2"
                      style={{
                        borderColor: "oklch(0.72 0.12 78)",
                        background: "oklch(0.98 0.01 78)",
                      }}
                    >
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "oklch(0.40 0.13 147)" }}
                      >
                        Add New Announcement
                      </p>
                      <Input
                        data-ocid="admin.notice.title.input"
                        placeholder="Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="text-sm"
                      />
                      <Textarea
                        data-ocid="admin.notice.body.textarea"
                        placeholder="Body text..."
                        value={newBody}
                        onChange={(e) => setNewBody(e.target.value)}
                        className="text-sm resize-none"
                        rows={2}
                      />
                      <Input
                        data-ocid="admin.notice.date.input"
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="text-sm"
                      />
                      <Button
                        data-ocid="admin.notice.add_button"
                        onClick={handleAddAnnouncement}
                        disabled={savingAnnouncement}
                        size="sm"
                        className="w-full text-sm"
                        style={{
                          background: "oklch(0.40 0.13 147)",
                          color: "white",
                        }}
                      >
                        {savingAnnouncement ? (
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                        ) : (
                          <Plus className="mr-1 h-3 w-3" />
                        )}
                        Add Announcement
                      </Button>
                    </div>

                    {/* Existing announcements */}
                    {appData.announcements.length === 0 ? (
                      <p
                        data-ocid="admin.notices.empty_state"
                        className="text-center text-sm py-4"
                        style={{ color: "oklch(0.45 0.02 240)" }}
                      >
                        No announcements yet
                      </p>
                    ) : (
                      appData.announcements.map((ann, index) => (
                        <div
                          key={ann.id.toString()}
                          data-ocid={`admin.notice.item.${index + 1}`}
                          className="p-3 rounded-xl border"
                          style={{ borderColor: "oklch(0.88 0.02 147)" }}
                        >
                          {editingId === ann.id ? (
                            <div className="space-y-2">
                              <Input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="text-sm"
                                placeholder="Title"
                              />
                              <Textarea
                                value={editBody}
                                onChange={(e) => setEditBody(e.target.value)}
                                className="text-sm resize-none"
                                rows={2}
                              />
                              <Input
                                type="date"
                                value={editDate}
                                onChange={(e) => setEditDate(e.target.value)}
                                className="text-sm"
                              />
                              <div className="flex gap-2">
                                <Button
                                  data-ocid={`admin.notice.save_button.${index + 1}`}
                                  size="sm"
                                  onClick={handleSaveEdit}
                                  disabled={savingAnnouncement}
                                  className="flex-1 text-xs"
                                  style={{
                                    background: "oklch(0.40 0.13 147)",
                                    color: "white",
                                  }}
                                >
                                  {savingAnnouncement ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                  ) : (
                                    <Save className="h-3 w-3 mr-1" />
                                  )}
                                  Save
                                </Button>
                                <Button
                                  data-ocid={`admin.notice.cancel_button.${index + 1}`}
                                  size="sm"
                                  variant="outline"
                                  onClick={cancelEdit}
                                  className="flex-1 text-xs"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-sm truncate">
                                    {ann.title}
                                  </p>
                                  <p
                                    className="text-xs mt-0.5 line-clamp-2"
                                    style={{ color: "oklch(0.45 0.02 240)" }}
                                  >
                                    {ann.body}
                                  </p>
                                  <p
                                    className="text-xs mt-1"
                                    style={{ color: "oklch(0.62 0.10 78)" }}
                                  >
                                    {ann.date}
                                  </p>
                                </div>
                                <div className="flex gap-1 flex-shrink-0">
                                  <button
                                    type="button"
                                    data-ocid={`admin.notice.edit_button.${index + 1}`}
                                    onClick={() => startEdit(ann)}
                                    className="p-1.5 rounded-lg transition-colors"
                                    style={{ color: "oklch(0.40 0.13 147)" }}
                                    aria-label="Edit announcement"
                                  >
                                    <Pencil size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    data-ocid={`admin.notice.delete_button.${index + 1}`}
                                    onClick={() => handleDelete(ann.id)}
                                    disabled={deletingId === ann.id}
                                    className="p-1.5 rounded-lg transition-colors"
                                    style={{
                                      color: "oklch(0.577 0.245 27.325)",
                                    }}
                                    aria-label="Delete announcement"
                                  >
                                    {deletingId === ann.id ? (
                                      <Loader2
                                        size={14}
                                        className="animate-spin"
                                      />
                                    ) : (
                                      <Trash2 size={14} />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </TabsContent>

                  {/* Prayer Times Tab */}
                  <TabsContent
                    value="prayer"
                    className="px-4 pb-4 space-y-3 mt-3"
                  >
                    <p
                      className="text-xs font-semibold"
                      style={{ color: "oklch(0.40 0.13 147)" }}
                    >
                      Update Namaz Times (e.g. 5:41 AM)
                    </p>
                    {appData.prayerTimes.map((prayer, index) => (
                      <div
                        key={prayer.name}
                        data-ocid={`admin.prayer.item.${index + 1}`}
                        className="flex items-center gap-2"
                      >
                        <Label
                          className="text-sm font-semibold w-28 flex-shrink-0"
                          style={{ color: "oklch(0.30 0.10 147)" }}
                        >
                          {prayer.name}
                        </Label>
                        <Input
                          data-ocid={`admin.prayer.time.input.${index + 1}`}
                          value={prayerEdits[prayer.name] ?? prayer.time}
                          onChange={(e) =>
                            setPrayerEdits((prev) => ({
                              ...prev,
                              [prayer.name]: e.target.value,
                            }))
                          }
                          placeholder="e.g. 5:41 AM"
                          className="text-sm flex-1"
                        />
                        <Button
                          data-ocid={`admin.prayer.save_button.${index + 1}`}
                          size="sm"
                          onClick={() => handleSavePrayerTime(prayer.name)}
                          disabled={savingPrayer === prayer.name}
                          style={{
                            background: "oklch(0.40 0.13 147)",
                            color: "white",
                            minWidth: "52px",
                          }}
                          className="text-xs"
                        >
                          {savingPrayer === prayer.name ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Save className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </TabsContent>

                  {/* Contact Tab */}
                  <TabsContent
                    value="contact"
                    className="px-4 pb-4 space-y-3 mt-3"
                  >
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">
                        Phone Number
                      </Label>
                      <Input
                        data-ocid="admin.contact.phone.input"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        placeholder="+91 89589 99299"
                        type="tel"
                      />
                      <Button
                        data-ocid="admin.contact.save_button"
                        onClick={handleSavePhone}
                        disabled={savingPhone}
                        className="w-full font-semibold"
                        style={{
                          background: "oklch(0.40 0.13 147)",
                          color: "white",
                        }}
                      >
                        {savingPhone && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Save Phone Number
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Map Tab */}
                  <TabsContent value="map" className="px-4 pb-4 space-y-3 mt-3">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Latitude</Label>
                      <Input
                        data-ocid="admin.map.lat.input"
                        value={editLat}
                        onChange={(e) => setEditLat(e.target.value)}
                        placeholder="29.863646"
                        type="number"
                        step="0.000001"
                      />
                      <Label className="text-sm font-semibold">Longitude</Label>
                      <Input
                        data-ocid="admin.map.lng.input"
                        value={editLng}
                        onChange={(e) => setEditLng(e.target.value)}
                        placeholder="77.971577"
                        type="number"
                        step="0.000001"
                      />
                      <Button
                        data-ocid="admin.map.save_button"
                        onClick={handleSaveMap}
                        disabled={savingMap}
                        className="w-full font-semibold"
                        style={{
                          background: "oklch(0.40 0.13 147)",
                          color: "white",
                        }}
                      >
                        {savingMap && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Save Map Coordinates
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
