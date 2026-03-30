import { Plugin, PluginContext } from './types';
import React from 'react';

class PluginManager {
  private plugins: Map<string, Plugin> = new Map();
  private context: PluginContext;

  constructor() {
    // Provide core APIs to plugins
    this.context = {
      log: (msg) => console.log(`[PluginCore] ${msg}`)
    };
  }

  register(plugin: Plugin) {
    if (this.plugins.has(plugin.manifest.id)) {
      console.warn(`Plugin ${plugin.manifest.id} is already registered.`);
      return;
    }
    this.plugins.set(plugin.manifest.id, plugin);
    
    // Initialize the plugin
    plugin.initialize(this.context);
  }

  getPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  getWidgets(): React.ReactNode[] {
    return this.getPlugins()
      .map(p => p.renderWidget ? p.renderWidget() : null)
      .filter(Boolean);
  }
}

export const pluginManager = new PluginManager();
