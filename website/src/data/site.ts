export const siteConfig = {
  "title": "GimSell",
  "repoUrl": "https://github.com/AMFI-Disable/GimSell_Gimkit-Seller",
  "category": "Browser Userscript",
  "accent": "#66BB6A",
  "tagline": "In-page userscript with a collapsible floating widget engineered for automated duplicate cosmetic selling in the Gimkit Locker.",
  "primaryCta": {
    "label": "Install Userscript",
    "href": "#quick-start"
  },
  "secondaryCta": {
    "label": "View on GitHub",
    "href": "https://github.com/AMFI-Disable/GimSell_Gimkit-Seller"
  },
  "quickCmd": "git clone https://github.com/AMFI-Disable/GimSell_Gimkit-Seller.git",
  "features": [
    {
      "title": "Duplicate Detection",
      "desc": "Automatically scans your Gimkit Locker for duplicate Gims, trails, and stickers while keeping one copy of each."
    },
    {
      "title": "Native Floating Widget",
      "desc": "Collapsible, lightweight HUD that blends seamlessly into the Gimkit Locker interface."
    },
    {
      "title": "Keyboard Hotkeys",
      "desc": "Start, pause, or toggle the widget quickly with built-in keyboard shortcuts."
    },
    {
      "title": "100% Client-Side",
      "desc": "Runs purely in your browser with zero external servers or credential sharing."
    }
  ],
  "steps": [
    {
      "title": "Locker Inventory Scan",
      "desc": "Inspects unlocked cosmetics in the Gimkit Locker UI and counts duplicates per item."
    },
    {
      "title": "Safe Queue Filtering",
      "desc": "Excludes unique items and keeps at least one copy of every cosmetic before queuing sales."
    },
    {
      "title": "Paced Batch Selling",
      "desc": "Triggers sell actions sequentially with live progress counters in the floating widget."
    }
  ],
  "installCmds": [
    {
      "label": "Install Userscript",
      "cmd": "Install Tampermonkey/Violentmonkey, then import gimkit-seller.user.js"
    },
    {
      "label": "Clone Repository",
      "cmd": "git clone https://github.com/AMFI-Disable/GimSell_Gimkit-Seller.git"
    }
  ],
  "requirements": [
    "Tampermonkey or Violentmonkey",
    "Chrome / Firefox / Safari",
    "Educational & client-side automation use"
  ],
  "hubName": "AMFI Hangar",
  "hubHash": "hangar",
  "previewTabs": [
    {
      "tab": "Duplicate Scan",
      "title": "Keep-One Guarantee",
      "body": "Identifies duplicate Gims, trails, and stickers in your locker while preserving at least one copy of every item."
    },
    {
      "tab": "Floating HUD",
      "title": "Collapsible Native Widget",
      "body": "Blends into the Gimkit Locker page with live progress counters and start/pause hotkeys."
    },
    {
      "tab": "Client-Side",
      "title": "Zero External Servers",
      "body": "Executes 100% inside your browser session with no credential sharing or external requests."
    }
  ]
} as const;
