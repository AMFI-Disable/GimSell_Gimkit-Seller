# Changelog

All notable changes, UI enhancements, and feature updates for GimSell (Gimkit Duplicate Seller) are documented in this file.

---

## [1.1.0] - Refinements And Naming Standardization

### Added

- **File Naming Realignment**: Standardized script entrypoint to `gimkit-seller.user.js` in compliance with repository casing guidelines.
- **Enhanced Modal Handling**: Improved DOM observation and transition listeners for modern Gimkit UI modal updates.

### Fixed

- **Hotkey Reliability**: Hardened layout-independent keycode checks (`Option+S` / `Option+G` on macOS, `Alt+S` / `Alt+G` on Windows/Linux).
- **Badge Scanning Precision**: Refined regex and selector filters for stack counts greater than or equal to two.

---

## [1.0.0] - Initial Production Release

An automated duplicate cosmetic seller userscript for the Gimkit Locker rewards interface.

### Added

#### Automation And Loop Optimization

- **Smart DOM Badge Scanning**: Automatically scans cosmetic inventories for duplicate count badges ($\ge 2$).
- **Stack Batching**: Simulates modal transitions and confirm prompts to liquidate entire duplicate stacks in a single sequence.
- **Title Case Parser**: Resolves human-readable cosmetic names by parsing image asset URLs.

#### User Interface

- **Contextual Activation**: Automatically attaches exclusively when navigating to `/rewards/locker`.
- **Collapsible Floating Widget**: Minimizes into an unobtrusive floating padlock icon in the bottom-right corner.
- **Quick Keyboard Shortcuts**: Instant visibility toggle using cross-platform hotkeys.
