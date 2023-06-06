import { InlineConfig, build as viteBuild } from 'vite';
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants';
import path from 'path';
import type { RollupOutput } from 'rollup';
import fs from 'fs-extra';
import ora from 'ora';

export async function bundle(root: string) {
  const commonBuildConfig = (isServer: boolean): InlineConfig => ({
    mode: 'production',
    root,
    build: {
      assetsDir: isServer ? '' : 'asset',
      ssr: isServer,
      outDir: isServer ? '.temp' : 'build',
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? 'cjs' : 'esm'
        }
      }
    }
  });
  const spinner = ora();
  spinner.start('文件正在打包中...');
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      viteBuild(commonBuildConfig(false)),
      viteBuild(commonBuildConfig(true))
    ]);
    return [clientBundle, serverBundle];
  } catch (error) {
    console.log(error);
    return [null, null];
  }
}

export async function renderPage(
  render: () => string,
  root: string,
  clientBundle: RollupOutput
) {
  const appHtml = render();
  const clientChunck = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  );
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div id="root">${appHtml}</div>
      <script src="/${clientChunck?.fileName}" type="module"></script>
    </body>
    </html>
  `.trim();
  await fs.writeFile(path.join(root, 'build', 'index.html'), html);
  await fs.remove(path.join(root, '.temp'));
}

export async function build(root: string) {
  // await bundle(root);
  // 1. bundle - client 端 + server 端
  const [clientBundle, serverBundle] = await bundle(root);
  if (clientBundle && serverBundle) {
    // 2. 引入server-entry 模块
    const serverEntryPath = path.join(root, '.temp', 'ssr-entry.js');
    // 3. 服务端渲染，生成HTML
    const { render } = require(serverEntryPath);
    await renderPage(render, root, clientBundle as RollupOutput);
  }
}
