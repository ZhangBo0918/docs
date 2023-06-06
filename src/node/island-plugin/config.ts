import { SiteConfig } from 'shared/types';
import { Plugin } from 'vite';

const SITE_DATA_ID = 'island:site-data';

export function pluginConfig(config: SiteConfig): Plugin {
  return {
    name: 'island:site-data',
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return '\0' + SITE_DATA_ID;
      }
    },
    load(id) {
      if (id === '\0' + SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`;
      }
    },
    async handleHotUpdate(ctx) {
      const customWatchFiles = [config.configPath];
      const include = (id: string) =>
        customWatchFiles.some((file) => id.includes(file as string));
      if (include(ctx.file)) {
        console.log('该更新了');
        // 在配置数据更新后，需要重启Dev Server
        // 1. 重启vite的server，无效果，因为没读取配置
        // 2. 重启dev.ts的createServer
      }
    }
  };
}