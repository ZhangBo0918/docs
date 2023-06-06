import { Plugin } from 'vite';
import {
  DEFAULT_TEMPLATE_PATH,
  PACKAGE_ROOT,
  CLIENT_ENTRY_PATH
} from '../constants/index';
import { readFile } from 'fs/promises';
import { log } from 'console';

export function pluginIndexHtml(): Plugin {
  return {
    name: 'island:index-html',
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              type: 'module',
              src: `/@fs/${CLIENT_ENTRY_PATH}`
            },
            injectTo: 'body'
          }
        ]
      };
    },
    configureServer(server) {
      return () => {
        log(PACKAGE_ROOT);
        server.middlewares.use(async (req, res) => {
          let content = await readFile(DEFAULT_TEMPLATE_PATH, 'utf-8');
          content = await server.transformIndexHtml(
            req.url as string,
            content,
            req.originalUrl
          );
          res.setHeader('Context-Type', 'text/html');
          res.end(content);
        });
      };
    }
  };
}
