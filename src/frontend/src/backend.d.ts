import type { Principal } from "@icp-sdk/core/principal";

export interface Announcement {
  id: bigint;
  title: string;
  body: string;
  date: string;
}

export interface MapCoords {
  lat: number;
  lng: number;
}

export interface PrayerTime {
  name: string;
  arabic: string;
  time: string;
}

export interface backendInterface {
  verifyPin(pin: string): Promise<boolean>;
  changePin(oldPin: string, newPin: string): Promise<boolean>;
  getAnnouncements(): Promise<Announcement[]>;
  addAnnouncement(pin: string, title: string, body: string, date: string): Promise<boolean>;
  updateAnnouncement(pin: string, id: bigint, title: string, body: string, date: string): Promise<boolean>;
  deleteAnnouncement(pin: string, id: bigint): Promise<boolean>;
  getContactPhone(): Promise<string>;
  setContactPhone(pin: string, phone: string): Promise<boolean>;
  getMapCoords(): Promise<MapCoords>;
  setMapCoords(pin: string, lat: number, lng: number): Promise<boolean>;
  getPrayerTimes(): Promise<PrayerTime[]>;
  updatePrayerTime(pin: string, name: string, time: string): Promise<boolean>;
}
