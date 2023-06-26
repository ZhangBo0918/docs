import { pluginIndexHtml } from './island-plugin/indexHtml';
import react from '@vitejs/plugin-react';
import { pluginConfig } from './island-plugin/config';
import { pluginRoutes } from './plugin-router';
import { SiteConfig } from 'shared/types';
import { createMdxPlugins } from './plugin-mdx';

export function createVitePlugins(
  config: SiteConfig,
  restartServer: () => Promise<void>
) {
  return [
    react(),
    pluginIndexHtml(),
    pluginConfig(config, restartServer),
    pluginRoutes({ root: config.root }),
    createMdxPlugins()
  ];
}
