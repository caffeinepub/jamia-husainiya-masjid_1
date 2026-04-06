# Jamia Husainiya Masjid

## Current State
App has 5 screens (Home, Namaz, Notice, Contact, Map) with bottom navigation and admin panel (PIN: 786). Islamic green theme with OKLCH colors.

## Requested Changes (Diff)

### Add
- New "Log" (لوگ) screen: Shows a list of mosque members/people associated with the masjid. Admin can add/remove members.
- "Admin" button in bottom nav that directly opens the admin panel without going through a screen.
- Home screen redesigned to match: Bismillah (بسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ) at top, Assalamu Alaikum greeting, وَعَلَيْكُمُ السَّلام response, Welcome message with full mosque name, NEXT PRAYER card showing prayer name in English + Arabic + time + status badge.

### Modify
- BottomNav: Add two new tabs -- "Log" (with people icon, label "لوگ") and "Admin" (with settings icon, opens admin panel directly)
- App.tsx: Handle new "log" tab and "admin" tab in navigation
- HomeScreen: Redesign to match described layout with Bismillah, greetings, welcome text, and prominent Next Prayer card

### Remove
- Nothing removed

## Implementation Plan
1. Add LogScreen.tsx -- members list screen with a simple people list, admin can manage via existing admin panel
2. Update App.tsx -- add 'log' and 'admin' to TabId, handle 'admin' tab by opening admin panel
3. Update BottomNav.tsx -- add Log and Admin buttons
4. Update HomeScreen.tsx -- redesign with Bismillah, salaam, welcome, and NEXT PRAYER card matching described layout
