import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
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
    time: string;
    arabic: string;
}
export interface backendInterface {
    addAnnouncement(pin: string, title: string, body: string, date: string): Promise<Announcement | null>;
    changePin(oldPin: string, newPin: string): Promise<boolean>;
    deleteAnnouncement(pin: string, id: bigint): Promise<boolean>;
    getAnnouncements(): Promise<Array<Announcement>>;
    getContactPhone(): Promise<string>;
    getMapCoords(): Promise<MapCoords>;
    getPrayerTimes(): Promise<Array<PrayerTime>>;
    setContactPhone(pin: string, phone: string): Promise<boolean>;
    setMapCoords(pin: string, lat: number, lng: number): Promise<boolean>;
    updateAnnouncement(pin: string, id: bigint, title: string, body: string, date: string): Promise<boolean>;
    updatePrayerTime(pin: string, name: string, time: string): Promise<boolean>;
    verifyPin(pin: string): Promise<boolean>;
}
