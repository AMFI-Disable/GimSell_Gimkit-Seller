// ==UserScript==
// @name         GimSell - Sell Duplicate Skins, Trails & Stickers
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automates selling of duplicate cosmetics (Gims, trails, stickers) on the Gimkit Locker page with a native look and feel.
// @author       Antigravity
// @match        https://www.gimkit.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gimkit.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

(() => {
    

    // Import Poppins Google Font for Gimkit typography matching
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800;900&display=swap';
    document.head.appendChild(fontLink);

    // Injected styles to match Gimkit's exact playful 3D design language
    const styles = `
        /* Main Panel Container */
        #gimkit-seller-panel {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 380px;
            background-color: #1a1c23;
            border: 3px solid #2b2d42;
            border-radius: 16px;
            color: #ffffff;
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            z-index: 99999;
            user-select: none;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: opacity 0.3s ease;
        }

        /* Header Bar - Draggable */
        #gimkit-seller-header {
            background-color: #502c84;
            padding: 12px 16px;
            font-weight: 800;
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: move;
            border-bottom: 3px solid #361e5b;
        }

        #gimkit-seller-title {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        #gimkit-seller-close {
            cursor: pointer;
            color: #a0aec0;
            font-size: 20px;
            font-weight: 700;
            line-height: 1;
            transition: color 0.2s;
        }

        #gimkit-seller-close:hover {
            color: #f7fafc;
        }

        /* Body & Content */
        #gimkit-seller-body {
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 14px;
        }

        .gimkit-seller-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            font-weight: 600;
        }

        /* Tactical 3D Buttons (Signature Gimkit Green/Purple) */
        .gimkit-3d-btn {
            background-color: #00a86b;
            color: white;
            border: none;
            border-radius: 12px;
            padding: 12px 20px;
            font-family: 'Poppins', sans-serif;
            font-weight: 800;
            font-size: 15px;
            cursor: pointer;
            outline: none;
            box-shadow: 0 6px 0 #007c4d;
            transition: all 0.1s ease;
            text-align: center;
            display: block;
            width: 100%;
            margin-top: 8px;
        }

        .gimkit-3d-btn:hover {
            background-color: #00be7a;
        }

        .gimkit-3d-btn:active {
            transform: translateY(4px);
            box-shadow: 0 2px 0 #007c4d;
        }

        .gimkit-3d-btn:disabled {
            background-color: #4a5568;
            box-shadow: 0 6px 0 #2d3748;
            color: #a0aec0;
            cursor: not-allowed;
            transform: none;
        }

        /* Secondary/Alternative Button (Blue/Purple) */
        .gimkit-3d-btn-alt {
            background-color: #186cdc;
            box-shadow: 0 6px 0 #0c4eab;
        }

        .gimkit-3d-btn-alt:hover {
            background-color: #2b7ef5;
        }

        .gimkit-3d-btn-alt:active {
            transform: translateY(4px);
            box-shadow: 0 2px 0 #0c4eab;
        }

        /* Slider Styles */
        .gimkit-slider-container {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .gimkit-slider {
            -webkit-appearance: none;
            width: 100%;
            height: 8px;
            border-radius: 4px;
            background: #2b2d42;
            outline: none;
        }

        .gimkit-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #186cdc;
            cursor: pointer;
            border: 2px solid #ffffff;
        }

        /* Logger / Console Area */
        #gimkit-seller-console {
            background-color: #0c0d12;
            border: 2px solid #2b2d42;
            border-radius: 8px;
            height: 120px;
            overflow-y: auto;
            padding: 8px;
            font-family: monospace;
            font-size: 11px;
            color: #38bdf8;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .console-log-info { color: #38bdf8; }
        .console-log-success { color: #4ade80; font-weight: bold; }
        .console-log-warning { color: #facc15; }
        .console-log-error { color: #f87171; font-weight: bold; }

        /* Debug Section Toggle */
        #gimkit-seller-debug-toggle {
            font-size: 11px;
            color: #a0aec0;
            cursor: pointer;
            text-align: center;
            text-decoration: underline;
        }

        #gimkit-seller-debug-panel {
            display: none;
            flex-direction: column;
            gap: 8px;
            border-top: 2px dashed #2b2d42;
            padding-top: 10px;
        }

        /* Minimized Trigger Button style */
        #gimkit-seller-minimized {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background-color: #502c84;
            border: 3px solid #2b2d42;
            border-radius: 50%;
            box-shadow: 0 6px 0 #361e5b, 0 10px 20px rgba(0, 0, 0, 0.4);
            z-index: 99999;
            cursor: pointer;
            display: none;
            justify-content: center;
            align-items: center;
            color: #ffffff;
            transition: all 0.1s ease;
        }

        #gimkit-seller-minimized:hover {
            background-color: #663db7;
            transform: scale(1.05);
        }

        #gimkit-seller-minimized:active {
            transform: translateY(4px) scale(0.95);
            box-shadow: 0 2px 0 #361e5b;
        }
    `;

    // Inject custom styling
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    // Global script state variables
    let isRunning = false;
    let actionDelay = 800; // Default ms delay between clicks
    let duplicateItemsList = [];
    let processedCount = 0;

    // Helper: Sleep utility for async timing
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Helper: Output message to the on-screen console log
    function log(message, type = 'info') {
        const consoleEl = document.getElementById('gimkit-seller-console');
        if (!consoleEl) return;
        
        const logSpan = document.createElement('div');
        logSpan.className = `console-log-${type}`;
        
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        logSpan.textContent = `[${timestamp}] ${message}`;
        
        consoleEl.appendChild(logSpan);
        consoleEl.scrollTop = consoleEl.scrollHeight;
        console.log(`[GimkitSeller] ${message}`);
    }

    // Helper: Inspect React component state/props from a DOM node
    function getReactProps(element) {
        if (!element) return null;
        const key = Object.keys(element).find(k => k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$'));
        const fiber = key ? element[key] : null;
        if (!fiber) return null;
        
        // Traverse upwards to find props
        let current = fiber;
        while (current) {
            if (current.memoizedProps) {
                return current.memoizedProps;
            }
            current = current.return;
        }
        return null;
    }

    // Render the GUI Panel on the page
    function createGUI() {
        if (document.getElementById('gimkit-seller-panel')) return;

        const panel = document.createElement('div');
        panel.id = 'gimkit-seller-panel';
        panel.innerHTML = `
            <div id="gimkit-seller-header">
                <div id="gimkit-seller-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    GimSell
                </div>
                <div id="gimkit-seller-close">&times;</div>
            </div>
            <div id="gimkit-seller-body">
                <div class="gimkit-seller-row">
                    <span>Detected Duplicates:</span>
                    <span id="gimkit-dup-count" style="color: #facc15; font-size: 16px;">0</span>
                </div>
                
                <div class="gimkit-slider-container">
                    <div class="gimkit-seller-row">
                        <span>Action Delay:</span>
                        <span id="gimkit-delay-val">800ms</span>
                    </div>
                    <input type="range" min="300" max="2500" value="800" class="gimkit-slider" id="gimkit-delay-slider">
                </div>

                <button id="gimkit-scan-btn" class="gimkit-3d-btn gimkit-3d-btn-alt">Scan Locker</button>
                <button id="gimkit-sell-btn" class="gimkit-3d-btn" disabled>Sell All Duplicates</button>

                <div id="gimkit-seller-console">
                    <div class="console-log-info">[System] Ready. Click Scan Locker to find duplicates.</div>
                </div>

                <div id="gimkit-seller-debug-toggle">Show Debug Tools</div>

                <div id="gimkit-seller-debug-panel">
                    <button id="gimkit-debug-react" class="gimkit-3d-btn gimkit-3d-btn-alt" style="font-size: 12px; padding: 6px;">Inspect React Fiber</button>
                    <button id="gimkit-debug-testclick" class="gimkit-3d-btn gimkit-3d-btn-alt" style="font-size: 12px; padding: 6px; background-color: #e2e8f0; color: #1a202c; box-shadow: 0 4px 0 #cbd5e1;">Test Click First Duplicate</button>
                </div>
            </div>
        `;

        document.body.appendChild(panel);

        // Create minimized overlay button
        const miniBtn = document.createElement('div');
        miniBtn.id = 'gimkit-seller-minimized';
        miniBtn.title = 'Open GimSell (Or press Alt+S / Alt+G)';
        // Padlock SVG icon
        miniBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
        document.body.appendChild(miniBtn);

        // Make the panel draggable via header
        makeDraggable(panel, document.getElementById('gimkit-seller-header'));

        // Attach Event Listeners
        document.getElementById('gimkit-seller-close').addEventListener('click', () => {
            panel.style.display = 'none';
            miniBtn.style.display = 'flex';
        });

        miniBtn.addEventListener('click', () => {
            panel.style.display = 'flex';
            miniBtn.style.display = 'none';
        });

        const delaySlider = document.getElementById('gimkit-delay-slider');
        delaySlider.addEventListener('input', (e) => {
            actionDelay = parseInt(e.target.value);
            document.getElementById('gimkit-delay-val').textContent = `${actionDelay}ms`;
        });

        document.getElementById('gimkit-scan-btn').addEventListener('click', scanLocker);
        document.getElementById('gimkit-sell-btn').addEventListener('click', startSellingProcess);

        const debugToggle = document.getElementById('gimkit-seller-debug-toggle');
        const debugPanel = document.getElementById('gimkit-seller-debug-panel');
        debugToggle.addEventListener('click', () => {
            if (debugPanel.style.display === 'none' || !debugPanel.style.display) {
                debugPanel.style.display = 'flex';
                debugToggle.textContent = 'Hide Debug Tools';
            } else {
                debugPanel.style.display = 'none';
                debugToggle.textContent = 'Show Debug Tools';
            }
        });

        document.getElementById('gimkit-debug-react').addEventListener('click', inspectReactState);
        document.getElementById('gimkit-debug-testclick').addEventListener('click', testClickFirst);
    }

    // Draggable helper to allow moving the GUI around
    function makeDraggable(el, dragHandle) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        dragHandle.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            el.style.top = (el.offsetTop - pos2) + "px";
            el.style.left = (el.offsetLeft - pos1) + "px";
            el.style.bottom = 'auto';
            el.style.right = 'auto';
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    // Helper to extract item name from the card image URL
    function getItemName(cardEl) {
        const img = cardEl.querySelector('img');
        if (!img || !img.src) return "Unknown Item";
        const parts = img.src.split('/');
        const filename = parts[parts.length - 1];
        const nameWithoutExt = filename.split('.')[0];
        return nameWithoutExt
            .replace(/[-_]/g, ' ')
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .replace(/^\w/, c => c.toUpperCase());
    }

    // Scan Locker logic: locates item cards with duplicate quantities
    function scanLocker() {
        log("Scanning locker for duplicate cosmetics...", "info");
        duplicateItemsList = [];
        
        const imgElements = document.querySelectorAll('img');
        const potentialCards = [];

        imgElements.forEach(img => {
            let card = img.parentElement;
            let depth = 0;
            while (card && depth < 6) {
                if (card.style && card.style.cursor === 'pointer') {
                    break;
                }
                card = card.parentElement;
                depth++;
            }
            
            if (card && !potentialCards.some(p => p.cardEl === card)) {
                // Look for elements inside the card containing a number >= 2
                const allElements = card.querySelectorAll('*');
                let count = 1;
                let badgeEl = null;
                
                allElements.forEach(el => {
                    if (el.children.length === 0) {
                        const txt = el.textContent ? el.textContent.trim() : "";
                        if (/^[2-9]\d*$/.test(txt)) {
                            count = parseInt(txt);
                            badgeEl = el;
                        }
                    }
                });
                
                if (count >= 2) {
                    const itemName = getItemName(card);
                    potentialCards.push({
                        cardEl: card,
                        count: count,
                        duplicates: count - 1,
                        badgeEl: badgeEl,
                        elementText: `${itemName} (x${count})`
                    });
                }
            }
        });

        duplicateItemsList = potentialCards;
        const countSpan = document.getElementById('gimkit-dup-count');
        countSpan.textContent = duplicateItemsList.length;

        if (duplicateItemsList.length > 0) {
            log(`Found ${duplicateItemsList.length} duplicate stacks!`, "success");
            duplicateItemsList.forEach((item, index) => {
                log(`[Stack ${index+1}] ${item.elementText} - Selling ${item.duplicates} duplicate(s)`, "info");
            });
            document.getElementById('gimkit-sell-btn').disabled = false;
        } else {
            log("No duplicate items detected via DOM badge scan.", "warning");
            log("Make sure you have duplicate cosmetics in your active view.", "info");
            document.getElementById('gimkit-sell-btn').disabled = true;
        }
    }

    // Helper to close modal cleanly
    function closeModal() {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, which: 27, bubbles: true }));
        const closeBtn = document.querySelector('.ant-modal-close');
        if (closeBtn) {
            closeBtn.click();
        }
    }

    // Automated duplicate selling process loop
    async function startSellingProcess() {
        if (isRunning) return;
        isRunning = true;
        document.getElementById('gimkit-sell-btn').disabled = true;
        document.getElementById('gimkit-scan-btn').disabled = true;
        
        log("Starting auto-selling duplicates process...", "success");
        processedCount = 0;

        for (let i = 0; i < duplicateItemsList.length; i++) {
            if (!isRunning) break;
            const item = duplicateItemsList[i];
            log(`[${i+1}/${duplicateItemsList.length}] Initiating sale for: ${item.elementText}`, "info");

            try {
                // Step 1: Click the card to open details side panel/modal
                item.cardEl.click();
                await sleep(actionDelay);

                const modal = document.querySelector('.ant-modal-content');
                if (!modal) {
                    log("Error: Details modal did not open. Skipping.", "error");
                    closeModal();
                    await sleep(500);
                    continue;
                }

                // Step 2: Search modal for the "Sell" element
                const elements = Array.from(modal.querySelectorAll('*'));
                const sellButton = elements.find(el => el.textContent.trim().toLowerCase() === 'sell' && el.children.length === 0);

                if (sellButton) {
                    log("Found 'Sell' trigger, opening sale dialog...", "info");
                    sellButton.click();
                    await sleep(actionDelay);

                    // Step 3: Find the confirmation SELL button
                    const finalSellBtn = Array.from(modal.querySelectorAll('button')).find(b => {
                        const label = b.getAttribute('aria-label') || "";
                        const txt = b.textContent || "";
                        return (label.toLowerCase() === 'sell' || txt.toUpperCase() === 'SELL');
                    });

                    if (finalSellBtn) {
                        log(`Confirming sale of ${item.duplicates} duplicates...`, "info");
                        finalSellBtn.click();
                        await sleep(actionDelay);
                        log(`Sold duplicates of ${item.elementText}!`, "success");
                        processedCount++;
                    } else {
                        log("Error: Confirm 'SELL' button not found in sale dialog.", "error");
                    }
                } else {
                    log("Error: 'Sell' option not available for this item.", "warning");
                }

                // Clean up and close modal
                closeModal();
                await sleep(600);

            } catch (err) {
                log(`Error processing item: ${err.message}`, "error");
                closeModal();
                await sleep(600);
            }
        }

        log(`Process finished. Successfully sold ${processedCount} duplicate stacks.`, "success");
        isRunning = false;
        document.getElementById('gimkit-scan-btn').disabled = false;
        
        // Re-scan to update counts
        scanLocker();
    }

    // Debug: Inspect React Fiber structures to find state variables
    function inspectReactState() {
        log("Inspecting React Fiber structures...", "info");
        const lockerGrid = document.querySelector('div[class*="grid"], div[class*="container"], main');
        if (!lockerGrid) {
            log("Locker grid container not found in DOM.", "error");
            return;
        }

        const props = getReactProps(lockerGrid);
        if (props) {
            console.log("[GimkitSeller] React Props detected:", props);
            log("React Props found! Check browser DevTools console (F12) for object inspection.", "success");
            
            // Look for items array inside props
            let itemsFound = false;
            const checkObj = (obj, depth = 0) => {
                if (!obj || depth > 5) return;
                for (const k in obj) {
                    if (Array.isArray(obj[k])) {
                        log(`Found array prop: "${k}" with ${obj[k].length} items.`, "info");
                        itemsFound = true;
                    } else if (typeof obj[k] === 'object') {
                        checkObj(obj[k], depth + 1);
                    }
                }
            };
            checkObj(props);
            if (!itemsFound) {
                log("No obvious items array detected inside immediate props.", "warning");
            }
        } else {
            log("Could not bind React internal instance to grid. Make sure you are logged in and page is loaded.", "error");
        }
    }

    // Debug: Test click on the first duplicate card to verify DOM interaction
    function testClickFirst() {
        if (duplicateItemsList.length === 0) {
            log("No duplicates scanned to test click.", "warning");
            return;
        }
        log("Testing click event on: " + duplicateItemsList[0].elementText, "info");
        duplicateItemsList[0].cardEl.click();
    }

    // Toggle Panel Visibility utility (used by hotkeys and minimizes)
    function toggleVisibility() {
        const panel = document.getElementById('gimkit-seller-panel');
        const miniBtn = document.getElementById('gimkit-seller-minimized');
        if (!panel) return;

        if (panel.style.display === 'none') {
            panel.style.display = 'flex';
            if (miniBtn) miniBtn.style.display = 'none';
        } else {
            panel.style.display = 'none';
            if (miniBtn) miniBtn.style.display = 'flex';
        }
    }

    // URL Check logic for SPA dynamic navigation
    function checkUrl() {
        const isLockerPage = window.location.href.includes('/rewards/locker');
        const panel = document.getElementById('gimkit-seller-panel');
        const miniBtn = document.getElementById('gimkit-seller-minimized');

        if (isLockerPage) {
            if (!panel) {
                createGUI();
                log("Gimkit Locker Duplicate Seller script activated.", "info");
                log("Press Alt+S (Opt+S) or Alt+G (Opt+G) to toggle menu.", "info");
                // Automatically scan shortly after GUI is rendered
                setTimeout(scanLocker, 1000);
            } else {
                // If it is hidden completely, default it to show either panel or minimized button
                if (panel.style.display === 'none' && (!miniBtn || miniBtn.style.display === 'none')) {
                    panel.style.display = 'flex';
                }
            }
        } else {
            if (panel) panel.style.display = 'none';
            if (miniBtn) miniBtn.style.display = 'none';
        }
    }

    // Keyboard Hotkey Listener
    window.addEventListener('keydown', (e) => {
        // Toggle menu when pressing Alt/Option + S or Alt/Option + G
        if (e.altKey && (e.code === 'KeyS' || e.code === 'KeyG')) {
            e.preventDefault(); // Prevent typing character or default shortcut actions
            toggleVisibility();
        }
    });

    // Hook into History API to detect page transitions in React Router/Next.js/etc.
    const originalPushState = history.pushState;
    history.pushState = function() {
        originalPushState.apply(this, arguments);
        setTimeout(checkUrl, 100);
    };

    // Hook into History API to detect page transitions in React Router/Next.js/etc.
    const originalReplaceState = history.replaceState;
    history.replaceState = function() {
        originalReplaceState.apply(this, arguments);
        setTimeout(checkUrl, 100);
    };

    window.addEventListener('popstate', () => {
        setTimeout(checkUrl, 100);
    });

    // Fallback polling for absolute safety in SPA contexts
    setInterval(checkUrl, 1000);

    // Initial load check
    setTimeout(checkUrl, 1500);

})();
