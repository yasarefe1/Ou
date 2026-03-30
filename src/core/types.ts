import { ReactNode } from 'react';

export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
}

export interface PluginContext {
  // Core APIs exposed to plugins
  log: (message: string) => void;
  // In a real app, you might expose things like:
  // registerRoute: (path: string, component: ReactNode) => void;
  // registerMenuItem: (label: string, onClick: () => void) => void;
}

export interface Plugin {
  manifest: PluginManifest;
  initialize: (context: PluginContext) => void;
  renderWidget?: () => ReactNode;
}
