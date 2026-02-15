import type { MonkeyUserScript } from 'vite-plugin-monkey';

const meta: MonkeyUserScript = {
    name: 'Readability for CBC News',
    namespace: 'monkey-userscripts-lab',
    match: ['https://www.cbc.ca/news/*'],
    grant: ['GM_addStyle', 'GM_getValue', 'GM_setValue'],
    version: '0.1.0',
    description: 'Make CBC News articles more readable',
};

export default meta;