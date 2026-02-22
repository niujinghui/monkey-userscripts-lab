import React from "react"
import { createRoot } from "react-dom/client"
import { GM_getValue, GM_setValue } from 'monkey'
import { UI } from "./UI"
import { applyReaderMode } from "./actions"

// --- State lives here, outside React ---
let isReaderMode: boolean = GM_getValue('FraserValleyToday:isReaderMode', false);

function toggleReaderMode() {
    isReaderMode = !isReaderMode;
    GM_setValue('FraserValleyToday:isReaderMode', isReaderMode);
    if (!isReaderMode) {
        // Reload to restore the original DOM (reader mode stripped it)
        location.reload();
        return;
    }
    applyReaderMode(isReaderMode);
    renderUI();
}

// Apply initial state immediately, before any React render
applyReaderMode(isReaderMode);

// Guard against double mounting (defensive)
if (!document.getElementById("react-ui-root")) {
    const container = document.createElement("div");
    container.id = "react-ui-root";
    document.body.appendChild(container);
}

const root = createRoot(document.getElementById("react-ui-root")!);

function renderUI() {
    root.render(React.createElement(UI, {
        isReaderMode,
        onToggle: toggleReaderMode,
    }));
}

renderUI();
