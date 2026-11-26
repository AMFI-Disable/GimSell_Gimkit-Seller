<div align="center">

# GimSell

**Duplicate Cosmetic Preview For Gimkit Locker**

*In-page userscript with a collapsible floating widget engineered for client-side locker inventory management.*

[![Website: Live](https://img.shields.io/badge/Website-Live-66BB6A.svg?style=flat-square)](https://amfi-disable.github.io/GimSell_Gimkit-Seller/)
[![Browser: Chrome / Firefox / Safari](https://img.shields.io/badge/Browser-Chrome%20%7C%20Firefox%20%7C%20Safari-blue.svg?style=flat-square&logo=googlechrome)](https://google.com/chrome)
[![Manager: Tampermonkey](https://img.shields.io/badge/Manager-Tampermonkey%20%7C%20Violentmonkey-orange.svg?style=flat-square&logo=tampermonkey)](https://tampermonkey.net)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](license)
[![Privacy: 100% Client-Side](https://img.shields.io/badge/Privacy-100%25%20Client--Side-purple.svg?style=flat-square)](#key-features)

[中文文档](readme.zh-cn.md) · [Contributing](contributing.md) · [Changelog](changelog.md) · [Security Policy](security.md) · [MIT License](license)

</div>

---

## Star History

<a href="https://www.star-history.com/?type=date&repos=amfi-disable%2Fgimsell_gimkit-seller">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=amfi-disable%2Fgimsell_gimkit-seller&type=date&theme=dark&legend=top-left" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=amfi-disable%2Fgimsell_gimkit-seller&type=date&legend=top-left" />
    <img alt="AMFI-Disable/GimSell_Gimkit-Seller Star History Chart" src="https://api.star-history.com/chart?repos=amfi-disable%2Fgimsell_gimkit-seller&type=date&legend=top-left" />
  </picture>
</a>

---

## Educational & Fair-Play Disclaimer

> [!CAUTION]
> **IMPORTANT NOTICE & DISCLAIMER**:
> This codebase is provided strictly for educational, research, and personal productivity testing purposes.
> Always comply with target platform terms of service and acceptable use policies.
> The developers and contributors accept no responsibility or liability for account penalties or platform policy violations.

---

## Key Features

- **Automatic Activation**: The panel is completely hidden on other pages to avoid clutter, and will **only appear when you open or navigate to the Locker page** (`/rewards/locker`).
- **Collapsible UI**: Clicking the close button (`x`) minimizes the panel into a small, floating purple padlock icon in the bottom-right corner. Clicking it restores the full panel.
- **Visible stack preview.** Scan the active locker view to see readable quantities and how many copies exceed one.
- **Quantity comparison.** After using Gimkit’s own controls to choose and confirm a quantity, scan again. A changed badge displays its previous count. Filtered cards, missing badges and ambiguous counts are labelled separately.
- **Local processing.** The preview reads the current page and stores the previous scan in memory until you leave the locker.

---

## Keyboard Hotkeys

To show or hide the menu instantly at any time on the Locker page, press:

- **macOS**: `Option + S` or `Option + G`
- **Windows / Linux**: `Alt + S` or `Alt + G`

*(Note: These hotkeys are layout-independent and work robustly on all keyboard configurations).*

---

## Installation And Setup

1. Install a userscript manager browser extension like [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/).
2. Copy the full source code of the `gimkit-seller.user.js` file.
3. In your userscript manager Dashboard, create a new userscript, paste the code, and save.
4. Open [Gimkit Locker](https://www.gimkit.com/rewards/locker). The panel will load automatically.

---

## License And Terms

Licensed under the [MIT License](license). Copyright (c) 2026 AMFI-Disable.
