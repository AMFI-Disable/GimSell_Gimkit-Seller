export const siteConfig = {
  "title": "GimSell",
  "repoUrl": "https://github.com/AMFI-Disable/GimSell_Gimkit-Seller",
  "category": "Browser Userscript",
  "accent": "#66BB6A",
  "tagline": "Preview duplicate cosmetics in the Gimkit Locker and compare visible quantities after a manual sale.",
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
      "desc": "Reads visible quantity badges and shows how many copies exceed one."
    },
    {
      "title": "Native Floating Widget",
      "desc": "Collapsible, lightweight HUD that blends seamlessly into the Gimkit Locker interface."
    },
    {
      "title": "Keyboard Hotkeys",
      "desc": "Minimise or reopen the preview with Alt+S or Alt+G."
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
      "title": "Review Extra Copies",
      "desc": "Review the extra copies and use Gimkit’s native controls to choose and confirm a quantity."
    },
    {
      "title": "Compare Quantities",
      "desc": "Scan again to compare visible counts. Missing cards and ambiguous badges are identified separately."
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
    "Access to the Gimkit Locker"
  ],
  "hubName": "AMFI Hangar",
  "hubHash": "hangar",
  "previewTabs": [
    {
      "tab": "Duplicate Scan",
      "title": "Visible Extra Copies",
      "body": "Shows how many copies exceed one for each visible stack with a readable badge."
    },
    {
      "tab": "Floating HUD",
      "title": "Collapsible Native Widget",
      "body": "Drag the preview, minimise it or reopen it with a keyboard shortcut."
    },
    {
      "tab": "Client-Side",
      "title": "Zero External Servers",
      "body": "Executes 100% inside your browser session with no credential sharing or external requests."
    }
  ]
} as const;
