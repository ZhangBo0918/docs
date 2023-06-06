import { createServer } from 'vite';
import { pluginIndexHtml } from './island-plugin/indexHtml';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export function createDevServer(root: string) {
  return createServer({
    root,
    plugins: [react(), pluginIndexHtml()]
  });
}
