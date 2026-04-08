import Array "mo:core/Array";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Nat "mo:core/Nat";



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

  public type PrayerTime = {
    name : Text;
    arabic : Text;
    time : Text;
  };

  // --- State ---
  var announcements : [Announcement] = [];
  var nextId : Nat = 1;
  var contactPhone : Text = "+918958999299";
  var mapLat : Float = 29.863646;
  var mapLng : Float = 77.971577;
  var adminPin : Text = "786";

  var prayerTimes : [PrayerTime] = [
    { name = "Fajr"; arabic = "\u{0627}\u{0644}\u{0641}\u{062C}\u{0631}"; time = "5:41 AM" },
    { name = "Zohar"; arabic = "\u{0627}\u{0644}\u{0638}\u{0647}\u{0631}"; time = "1:30 PM" },
    { name = "Asr"; arabic = "\u{0627}\u{0644}\u{0639}\u{0635}\u{0631}"; time = "5:15 PM" },
    { name = "Maghrib"; arabic = "\u{0627}\u{0644}\u{0645}\u{063A}\u{0631}\u{0628}"; time = "6:41 PM" },
    { name = "Isha"; arabic = "\u{0627}\u{0644}\u{0639}\u{0634}\u{0627}\u{0621}"; time = "8:45 PM" },
    { name = "Khutba Juma"; arabic = "\u{0627}\u{0644}\u{062C}\u{0645}\u{0639}\u{0629}"; time = "1:30 PM" }
  ];

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

  public func addAnnouncement(pin : Text, title : Text, body : Text, date : Text) : async ?Announcement {
    if (pin != adminPin) return null;
    let newItem : Announcement = { id = nextId; title; body; date };
    announcements := announcements.concat([newItem]);
    nextId += 1;
    ?newItem
  };

  public func updateAnnouncement(pin : Text, id : Nat, title : Text, body : Text, date : Text) : async Bool {
    if (pin != adminPin) return false;
    announcements := announcements.map(func(a : Announcement) : Announcement {
      if (a.id == id) { { id; title; body; date } } else { a }
    });
    true
  };

  public func deleteAnnouncement(pin : Text, id : Nat) : async Bool {
    if (pin != adminPin) return false;
    announcements := announcements.filter(func(a : Announcement) : Bool { a.id != id });
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

  // --- Prayer Times ---
  public func getPrayerTimes() : async [PrayerTime] {
    prayerTimes
  };

  public func updatePrayerTime(pin : Text, name : Text, time : Text) : async Bool {
    if (pin != adminPin) return false;
    prayerTimes := prayerTimes.map(func(p : PrayerTime) : PrayerTime {
      if (p.name == name) { { name = p.name; arabic = p.arabic; time } } else { p }
    });
    true
  };

};
