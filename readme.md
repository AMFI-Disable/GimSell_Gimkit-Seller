# 🧩 GimSell - Sell Duplicate Skins, Trails & Stickers

<div align="center">

**Automated Duplicate Cosmetic Seller For Gimkit Locker**  
*In-page userscript with a collapsible floating widget engineered for client-side locker inventory management.*

[![Browser: Chrome / Firefox / Safari](https://img.shields.io/badge/Browser-Chrome%20%7C%20Firefox%20%7C%20Safari-blue.svg?style=flat-square&logo=googlechrome)](https://google.com/chrome)
[![Manager: Tampermonkey](https://img.shields.io/badge/Manager-Tampermonkey%20%7C%20Violentmonkey-orange.svg?style=flat-square&logo=tampermonkey)](https://tampermonkey.net)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](license)
[![Privacy: 100% Client-Side](https://img.shields.io/badge/Privacy-100%25%20Client--Side-purple.svg?style=flat-square)](#-key-features)

</div>

---

## ⚖️ Educational & Fair-Play Disclaimer

> [!CAUTION]
> **IMPORTANT NOTICE & DISCLAIMER**:
> This codebase is provided strictly for educational, research, and personal productivity testing purposes.
> Always comply with target platform terms of service and acceptable use policies.
> The developers and contributors accept no responsibility or liability for account penalties or platform policy violations.

---

## 🚀 Key Features

- **Automatic Activation**: The panel is completely hidden on other pages to avoid clutter, and will **only appear when you open or navigate to the Locker page** (`/rewards/locker`).
- **Collapsible UI**: Clicking the close button (`x`) minimizes the panel into a small, floating purple padlock icon in the bottom-right corner. Clicking it restores the full panel.
- **Smart DOM Badge Scanning**: Generic duplicate detection that finds items with count badges $\ge 2$ dynamically.
- **Optimized Sale Loops**: Simulates clicking, modal transitions, and final confirmation buttons to sell all duplicates in a single stack at once.
- **Title Case Naming**: Dynamically parses image paths to name Gims/stickers (e.g. `elementalElectricity` $\rightarrow$ `Elemental Electricity`).

---

## ⌨️ Keyboard Hotkeys

To show or hide the menu instantly at any time on the Locker page, press:

- **macOS**: `Option + S` or `Option + G`
- **Windows / Linux**: `Alt + S` or `Alt + G`

*(Note: These hotkeys are layout-independent and work robustly on all keyboard configurations).*

---

## 📦 Installation And Setup

1. Install a userscript manager browser extension like [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/).
2. Copy the full source code of the `gimkit-seller.user.js` file.
3. In your userscript manager Dashboard, create a new userscript, paste the code, and save.
4. Open [Gimkit Locker](https://www.gimkit.com/rewards/locker). The panel will load automatically.

---

## 📄 License And Terms

Licensed under the [MIT License](license). Copyright (c) 2026 AMFI-Disable.
