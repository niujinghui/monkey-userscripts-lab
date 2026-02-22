import type { MonkeyUserScript } from 'vite-plugin-monkey';

const meta: MonkeyUserScript = {
    name: 'Fraser Valley Today — Flatten Main Content',
    namespace: 'monkey-userscripts-lab',
    match: ['https://fraservalleytoday.ca/*'],
    version: '2.1',
    description: 'Flatten article content for readability by restructuring <main>',
    'run-at': 'document-idle',
};

export default meta;