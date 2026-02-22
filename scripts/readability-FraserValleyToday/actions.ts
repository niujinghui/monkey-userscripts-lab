function applyReaderMode(enabled: boolean) {
    if (!enabled) {
        return;
    }

    const main = document.querySelector('main');
    if (!main) return;

    // Step 1 & 2:
    // Find all sc-sidebar-wrapper blocks inside <main>
    const wrappers = Array.from(
        main.querySelectorAll('div.sc-sidebar-wrapper')
    );

    if (wrappers.length === 0) return;

    // We'll collect the flattened nodes here, preserving order
    const collectedNodes: Element[] = [];

    wrappers.forEach(wrapper => {
        // Step 3:
        // Find sc-content inside each wrapper
        const content = wrapper.querySelector('div.sc-content');
        if (!content) return;

        // Step 4:
        // Collect h1, span.sc-time, and p in DOM order
        const nodes = content.querySelectorAll(
            'section.content-feature h1, section.content-feature span.sc-time, p'
        );

        nodes.forEach(node => {
            collectedNodes.push(node);
        });
    });

    // Clean everything inside <main>
    main.innerHTML = '';

    // Reattach nodes directly under <main>, preserving sequence
    collectedNodes.forEach(node => {
        main.appendChild(node);
    });
}

export { applyReaderMode }