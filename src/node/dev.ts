import { createServer } from 'vite';
import { pluginIndexHtml } from './island-plugin/indexHtml';
import react from '@vitejs/plugin-react';
import { PACKAGE_ROOT } from './constants';
import { resolveConfig } from './config';
import { log } from 'console';
import { pluginConfig } from './island-plugin/config';

// https://vitejs.dev/config/
export async function createDevServer(
  root: string,
  restart: () => Promise<void>
) {
  const config = await resolveConfig(root, 'serve', 'development');
  return createServer({
    root,
    plugins: [react(), pluginIndexHtml(), pluginConfig(config, restart)],
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
}
