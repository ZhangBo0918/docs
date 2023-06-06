/**
 * 编写配置文件
 */
import { UserConfig as ViteConfiguration } from 'vite';

export type NavItemWithLink = {
  text: string;
  link: string;
};

export interface SidebarGroup {
  text: string;
  items: Array<SidebarItem>;
}

export type SidebarItem = {
  text: string;
  link: string;
};

export interface Sidebar {
  [path: string]: Array<SidebarGroup>;
}

export interface Footer {
  message: string;
}

export interface ThemeConfig {
  nav?: Array<NavItemWithLink>;
  sidebar?: Sidebar;
  footer?: Footer;
}

export interface UserConfig {
  title?: string;
  description?: string;
  themeConfig?: ThemeConfig;
  vite?: ViteConfiguration;
}

export interface SiteConfig {
  root: string;
  configPath?: string;
  siteData: UserConfig;
}
