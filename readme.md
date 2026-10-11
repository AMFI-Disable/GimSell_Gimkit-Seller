# GimSell - Sell Duplicate Skins, Trails & Stickers

An automated duplicate cosmetic seller script for the Gimkit Locker page (`https://www.gimkit.com/rewards/locker`). It features a native 3D-styled control panel that collapses into a floating widget when minimized.

## Key Features

- **Automatic Activation:** The panel is completely hidden on other pages to avoid clutter, and will **only appear when you open or navigate to the Locker page** (`/rewards/locker`).
- **Collapsible UI:** Clicking the close button (`x`) minimizes the panel into a small, floating purple padlock icon in the bottom-right corner. Clicking it restores the full panel.
- **Smart DOM Badge Scanning:** Generic duplicate detection that finds items with count badges $\ge 2$ dynamically.
- **Optimized Sale Loops:** Simulates clicking, modal transitions, and final confirmation buttons to sell all duplicates in a single stack at once.
- **Title Case Naming:** Dynamically parses image paths to name Gims/stickers (e.g. `elementalElectricity` $\rightarrow$ `Elemental Electricity`).

---

## Keyboard Hotkeys

To show or hide the menu instantly at any time on the Locker page, press:

- **Mac:** `Option + S` or `Option + G`
- **Windows / Linux:** `Alt + S` or `Alt + G`

*(Note: These hotkeys are layout-independent and work robustly on all keyboard configurations).*

---

## Installation And Setup

1. Install a userscript manager browser extension like [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/).
2. Copy the full source code of the `gimkit-seller.user.js` file.
3. In your userscript manager Dashboard, create a new userscript, paste the code, and save.
4. Open [Gimkit Locker](https://www.gimkit.com/rewards/locker). The panel will load automatically.
