import path from 'path';
import fs from 'fs-extra';
import * as exaca from 'execa';

const exampleDir = path.resolve(__dirname, '../e2e/playground/basic');
const ROOT = path.resolve(__dirname, '..');
// 把子进程的信息传给父进程，进行显示
const defaultConfig = {
  stdout: process.stdout,
  stdin: process.stdin,
  stderr: process.stderr
};

async function prepareE2E() {
  if (!fs.existsSync(path.resolve(__dirname, '../dist'))) {
    exaca.commandSync('pnpm build', {
      cwd: ROOT,
      ...defaultConfig
    });
  }
  exaca.commandSync('npx playwright install', {
    cwd: ROOT,
    ...defaultConfig
  });
  exaca.commandSync('pnpm dev', {
    cwd: exampleDir,
    ...defaultConfig
  });
}

prepareE2E();
