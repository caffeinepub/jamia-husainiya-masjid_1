import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Float "mo:base/Float";
import Text "mo:base/Text";

actor {

  // --- Types ---
  public type Announcement = {
    id : Nat;
    title : Text;
    body : Text;
    date : Text;
  };

  public type MapCoords = {
    lat : Float;
    lng : Float;
  };

  // --- Stable state ---
  stable var announcements : [Announcement] = [
    { id = 1; title = "Friday Jumma Prayer"; body = "Khutba begins at 1:30 PM every Friday. Please arrive early."; date = "Every Friday" },
    { id = 2; title = "Ramadan Taraweeh"; body = "Taraweeh prayers will begin after Isha throughout the month of Ramadan."; date = "During Ramadan" },
    { id = 3; title = "Monthly Mehfil-e-Milad"; body = "Monthly Milad un Nabi gathering on the last Sunday of each month."; date = "Last Sunday Monthly" }
  ];
  stable var nextId : Nat = 4;
  stable var contactPhone : Text = "+92-300-0000000";
  stable var mapLat : Float = 31.5;
  stable var mapLng : Float = 74.3;
  stable var adminPin : Text = "786";

  // --- PIN verification ---
  public query func verifyPin(pin : Text) : async Bool {
    pin == adminPin
  };

  public func changePin(oldPin : Text, newPin : Text) : async Bool {
    if (oldPin == adminPin) {
      adminPin := newPin;
      true
    } else {
      false
    }
  };

  // --- Announcements ---
  public query func getAnnouncements() : async [Announcement] {
    announcements
  };

  public func addAnnouncement(pin : Text, title : Text, body : Text, date : Text) : async Bool {
    if (pin != adminPin) return false;
    let newItem : Announcement = { id = nextId; title; body; date };
    announcements := Array.append(announcements, [newItem]);
    nextId += 1;
    true
  };

  public func updateAnnouncement(pin : Text, id : Nat, title : Text, body : Text, date : Text) : async Bool {
    if (pin != adminPin) return false;
    announcements := Array.map<Announcement, Announcement>(announcements, func(a) {
      if (a.id == id) { { id; title; body; date } } else { a }
    });
    true
  };

  public func deleteAnnouncement(pin : Text, id : Nat) : async Bool {
    if (pin != adminPin) return false;
    announcements := Array.filter<Announcement>(announcements, func(a) { a.id != id });
    true
  };

  // --- Contact ---
  public query func getContactPhone() : async Text {
    contactPhone
  };

  public func setContactPhone(pin : Text, phone : Text) : async Bool {
    if (pin != adminPin) return false;
    contactPhone := phone;
    true
  };

  // --- Map ---
  public query func getMapCoords() : async MapCoords {
    { lat = mapLat; lng = mapLng }
  };

  public func setMapCoords(pin : Text, lat : Float, lng : Float) : async Bool {
    if (pin != adminPin) return false;
    mapLat := lat;
    mapLng := lng;
    true
  };

};
