import cac from 'cac';
import { log } from 'console';
import { build } from './build';
import { resolve } from 'path';

const cli = cac('island').version('1.0.0').help();

cli.command('dev [root]', 'start dev server').action(async (root: string) => {
  log('dev', root);
  const createServer = async () => {
    const { createDevServer } = await import('./dev.js');
    const server = await createDevServer(root, async () => {
      await server.close();
      await createServer();
    });
    await server.listen();
    server.printUrls();
  };
  createServer();
});

cli
  .command('build [root]', 'build in production')
  .action(async (root: string) => {
    try {
      log('resolve前', root);
      root = resolve(root);
      log('resolve后', root);
      await build(root);
    } catch (e) {
      log(e);
    }
  });

cli.parse();
