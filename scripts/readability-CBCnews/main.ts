import React from "react"
import { createRoot } from "react-dom/client"
import { GM_getValue, GM_setValue } from 'monkey';
import { App } from "./App"

// --- State lives here, outside React ---
let isReaderMode: boolean = GM_getValue('isReaderMode', false);

function applyReaderMode(enabled: boolean) {
    document.body.classList.toggle('feature-reader-mode', enabled);
}

function toggleReaderMode() {
    isReaderMode = !isReaderMode;
    GM_setValue('isReaderMode', isReaderMode);
    applyReaderMode(isReaderMode);
    render();
}

// Apply initial state immediately, before any React render
applyReaderMode(isReaderMode);

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);

function render() {
    root.render(React.createElement(App, {
        isReaderMode,
        onToggle: toggleReaderMode,
    }));
}

render();
