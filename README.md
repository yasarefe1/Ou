# Open Source Plugin System

A lightweight, extensible plugin architecture built with React and TypeScript. This boilerplate allows you to easily integrate new website functionalities by dropping them into the `plugins/` directory.

## 🚀 Features
- **Decoupled Architecture**: Plugins are self-contained and modular.
- **Manifest-driven**: Every plugin has a `manifest.json` for metadata.
- **Lifecycle Hooks**: Plugins can execute code on initialization via the `initialize` method.
- **UI Injection**: Plugins can inject React components into the core application dynamically.

## 📁 Directory Structure
```text
src/
├── core/
│   ├── PluginManager.ts   # Core logic for registering and loading plugins
│   └── types.ts           # TypeScript interfaces for the plugin system
├── plugins/
│   └── example-plugin/    # Example plugin directory
│       ├── index.tsx      # Plugin entry point
│       └── manifest.json  # Plugin metadata
└── App.tsx                # Main application where plugins are rendered
```

## 🛠️ How to Add a New Plugin

1. **Create a Directory**: Create a new folder under `src/plugins/` (e.g., `src/plugins/my-plugin/`).
2. **Create a Manifest**: Add a `manifest.json` file to define your plugin's metadata.
   ```json
   {
     "id": "com.myname.myplugin",
     "name": "My Awesome Plugin",
     "version": "1.0.0",
     "description": "Does awesome things.",
     "author": "Your Name"
   }
   ```
3. **Create the Entry Point**: Add an `index.tsx` file that implements the `Plugin` interface.
   ```typescript
   import { Plugin } from '../../core/types';
   import manifest from './manifest.json';

   export const MyPlugin: Plugin = {
     manifest,
     initialize: (context) => {
       context.log('My plugin is ready!');
     },
     renderWidget: () => (
       <div className="my-widget">Hello from My Plugin!</div>
     )
   };
   ```
4. **Register the Plugin**: Import and register your plugin in `src/App.tsx` (or wherever you initialize your app).
   ```typescript
   import { pluginManager } from './core/PluginManager';
   import { MyPlugin } from './plugins/my-plugin';

   pluginManager.register(MyPlugin);
   ```

## 🤝 Contributing
Feel free to fork this repository, add your own core APIs to `PluginContext`, create new plugins, and submit a pull request!
