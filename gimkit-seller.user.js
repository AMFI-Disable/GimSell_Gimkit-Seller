// ==UserScript==
// @name         GimSell - Sell Duplicate Skins, Trails & Stickers
// @namespace    https://github.com/AMFI-Disable/GimSell_Gimkit-Seller
// @version      1.2.0
// @description  Preview visible duplicate cosmetic stacks and compare locker quantities after using Gimkit's native controls.
// @author       AMFI-Disable
// @updateURL    https://raw.githubusercontent.com/AMFI-Disable/GimSell_Gimkit-Seller/main/gimkit-seller.user.js
// @downloadURL  https://raw.githubusercontent.com/AMFI-Disable/GimSell_Gimkit-Seller/main/gimkit-seller.user.js
// @match        https://www.gimkit.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(() => {
    const isLocker = () => /^\/rewards\/locker\/?$/.test(location.pathname);
    let host;
    let previous;

    function snapshot() {
        const items = new Map();
        const seen = new Set();
        for (const img of document.images) {
            if (!img.getClientRects().length || img.closest('[role="dialog"],.ant-modal')) continue;
            let card = img.parentElement;
            while (card && !(card.matches('button,[role="button"]') || card.style.cursor === 'pointer')) {
                card = card.parentElement;
            }
            if (!card) continue;
            if (seen.has(card) || card.querySelectorAll('img').length !== 1) continue;
            seen.add(card);
            const badges = Array.from(card.querySelectorAll('*')).filter(el =>
                !el.children.length && el.getClientRects().length && /^\d+$/.test(el.textContent.trim())
            );
            const count = badges.length === 1 ? Number(badges[0].textContent.trim()) : null;
            const src = img.currentSrc || img.getAttribute('src');
            if (!src) continue;
            let url;
            try { url = new URL(src, document.baseURI); } catch { continue; }
            if (!['https:', 'http:'].includes(url.protocol)) continue;
            const key = url.href;
            const filename = url.pathname.split('/').pop().replace(/\.[^.]*$/, '');
            const name = img.alt.trim() || filename.replace(/[-_]/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2') || 'Unknown item';
            // The same artwork can occur in multiple cards. Avoid comparing ambiguous stacks.
            items.set(key, {
                name, count: !items.has(key) && Number.isSafeInteger(count) && count >= 1 ? count : null
            });
        }
        return items;
    }

    function mount() {
        host = document.createElement('aside');
        host.id = 'gimkit-seller-panel';
        host.setAttribute('aria-label', 'GimSell locker preview');
        const ui = host.attachShadow({mode: 'open'});
        ui.innerHTML = `
            <style>
                :host { position:fixed; right:12px; bottom:12px; z-index:9999; font:15px/1.45 system-ui,sans-serif; color:#fff; }
                section { width:min(340px,calc(100vw - 24px)); max-height:calc(100dvh - 24px); overflow:auto; box-sizing:border-box; padding:16px; background:#202330; border:2px solid #6e6293; border-radius:14px; }
                header { display:flex; justify-content:space-between; align-items:center; gap:8px; cursor:move; touch-action:none; }
                h2 { margin:0; font:700 18px system-ui,sans-serif; }
                p { margin:10px 0; } ul { margin:0; padding-inline-start:22px; }
                button { font:inherit; border:1px solid #9294ae; background:#34384e; color:white; border-radius:7px; padding:5px 10px; cursor:pointer; }
                button:focus-visible { outline:3px solid #83e6c1; outline-offset:2px; }
                #scan { background:#185741; } #open { background:#502c84; }
            </style>
            <section>
                <header><h2>GimSell</h2><button id="hide" type="button">Minimise</button></header>
                <p>Review visible stacks. Use Gimkit’s own controls to choose a quantity and confirm any sale. Scan again to compare counts.</p>
                <button id="scan" type="button">Scan locker</button>
                <p id="status" role="status"></p><ul id="items" aria-label="Locker observations"></ul>
            </section>
            <button id="open" type="button" hidden>Open GimSell</button>`;
        document.body.appendChild(host);
        const section = ui.querySelector('section');
        const open = ui.querySelector('#open');
        const hide = ui.querySelector('#hide');
        function toggle() {
            section.hidden = !section.hidden;
            open.hidden = !section.hidden;
            (section.hidden ? open : hide).focus();
        }
        hide.onclick = open.onclick = toggle;
        const header = ui.querySelector('header');
        let drag;
        header.onpointerdown = e => {
            if (e.button !== 0 || e.target.closest('button')) return;
            const box = host.getBoundingClientRect();
            drag = [e.clientX - box.left, e.clientY - box.top];
            header.setPointerCapture(e.pointerId);
        };
        header.onpointermove = e => {
            if (!drag) return;
            host.style.inset = 'auto';
            host.style.left = Math.max(0, Math.min(innerWidth - host.offsetWidth, e.clientX - drag[0])) + 'px';
            host.style.top = Math.max(0, Math.min(innerHeight - host.offsetHeight, e.clientY - drag[1])) + 'px';
        };
        header.onlostpointercapture = () => { drag = null; };
        const scan = () => {
            if (!isLocker()) return;
            const current = snapshot();
            const list = ui.querySelector('#items');
            list.replaceChildren();
            const add = text => {
                const li = document.createElement('li');
                li.textContent = text;
                list.appendChild(li);
            };
            let stacks = 0;
            for (const [key, item] of current) {
                const old = previous?.get(key);
                if (item.count > 1) stacks++;
                if (item.count > 1 || old?.count > 1) {
                    if (item.count === null) {
                        add(`${item.name} — quantity unclear; previously ${old.count}.`);
                    } else {
                        const change = old?.count != null && old.count !== item.count ? ` (previously ${old.count})` : '';
                        add(`${item.name} — ${item.count} owned${change}, ${item.count - 1} extra.`);
                    }
                }
            }
            for (const [key, item] of previous || []) {
                if (item.count > 1 && !current.has(key)) add(`${item.name} — no longer visible; previously ${item.count}.`);
            }
            previous = current;
            ui.querySelector('#status').textContent = `${stacks} visible duplicate stack${stacks === 1 ? '' : 's'} with a readable quantity.`;
        };
        ui.querySelector('#scan').onclick = scan;
        scan();
    }

    function sync() {
        if (isLocker()) {
            if (!host?.isConnected) mount();
        } else {
            host?.remove();
            host = undefined;
            previous = undefined;
        }
    }

    window.addEventListener('keydown', e => {
        if (!e.altKey || e.repeat || !['KeyS', 'KeyG'].includes(e.code) || !isLocker()) return;
        sync();
        e.preventDefault();
        const ui = host.shadowRoot;
        ui.querySelector(ui.querySelector('section').hidden ? '#open' : '#hide').click();
    });
    window.addEventListener('popstate', sync);
    // pushState navigation does not fire popstate on same-document transitions.
    setInterval(sync, 1000);
    sync();
})();
