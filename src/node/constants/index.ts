import path from 'path';

// export const PACKAGE_ROOT = path.join(__dirname, '..', '..', '..');
export const PACKAGE_ROOT = path.join(__dirname, '..'); // 打包后的路径要改成这样

export const RUNTIME_PATH = path.join(PACKAGE_ROOT, 'src', 'runtime');

export const CLIENT_ENTRY_PATH = path.join(RUNTIME_PATH, 'client-entry.tsx');

export const DEFAULT_TEMPLATE_PATH = path.join(PACKAGE_ROOT, 'template.html');

export const SERVER_ENTRY_PATH = path.join(RUNTIME_PATH, 'ssr-entry.tsx');
