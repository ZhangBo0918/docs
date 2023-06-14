import { createServer } from 'vite';
import { pluginIndexHtml } from './island-plugin/indexHtml';
import react from '@vitejs/plugin-react';
import { PACKAGE_ROOT } from './constants';
import { resolveConfig } from './config';
import { pluginConfig } from './island-plugin/config';
import { pluginRoutes } from './plugin-router';

// https://vitejs.dev/config/
export async function createDevServer(
  root: string,
  restart: () => Promise<void>
) {
  const config = await resolveConfig(root, 'serve', 'development');
  return createServer({
    root: PACKAGE_ROOT,
    plugins: [
      react(),
      pluginIndexHtml(),
      pluginConfig(config, restart),
      pluginRoutes({ root: config.root })
    ],
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
}
