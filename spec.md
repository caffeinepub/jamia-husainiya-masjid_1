# Jamia Husainiya Masjid

## Current State
The app wraps all content inside a "phone frame" div with maxWidth: 420px, borderRadius: 2.5rem, and heavy box shadow — making it look like an app inside a box. The background has decorative circles. The Home screen uses a compact hero header with Bismillah and welcome text combined. Prayer times are shown in a 3-column grid. Bottom nav is dark green. All screens have dark gradient headers.

## Requested Changes (Diff)

### Add
- Mosque image banner (full-width with rounded bottom corners) below header on Home screen
- Welcome section as a light card below the banner image
- Prayer times in 2-column grid (changed from 3-column)
- "Soon" badge on Next Prayer card
- Mosque name and Bismillah in the header

### Modify
- App.tsx: Remove phone frame box — make layout truly full screen (min-h-screen, no max-width, no border-radius, no box-shadow on outer container)
- App.tsx: Remove decorative background circles
- Header: Show mosque full name + Bismillah Arabic text, lighter/cleaner green
- Bottom nav: Full width, fixed at bottom, 6 buttons (Home | Namaz | Notice | Contact | Map | Admin) — remove لوگ tab
- Overall theme: Light background + green theme instead of heavy dark theme
- Home screen: Restructure with header, image banner, welcome card, next prayer card, prayer times grid
- All screen headers: Clean green (not dark gradient)

### Remove
- Phone frame box wrapper in App.tsx
- Decorative background circles
- Dark gradient backgrounds
- لوگ (Log) tab from bottom nav
- LogScreen reference from navigation (keep code but don't show in nav)

## Implementation Plan
1. Update App.tsx — remove phone frame, full screen layout, remove background circles, remove لوگ from nav
2. Update BottomNav.tsx — remove لوگ item, light/white bottom nav with green active state, fixed full width
3. Update index.css — light background, ensure full screen styles
4. Update HomeScreen.tsx — new structure: header with mosque name + bismillah, mosque image banner, welcome card, next prayer card (green), 2-col prayer grid
5. Update ScreenHeader.tsx — cleaner green header
6. Generate mosque image asset
