import React, { useEffect, useState } from 'react';
import { Blocks, Puzzle, Terminal, Github, CheckCircle2, Copy } from 'lucide-react';
import { pluginManager } from './core/PluginManager';
import { ExamplePlugin } from './plugins/example-plugin';
import { Plugin } from './core/types';

// Register plugins
pluginManager.register(ExamplePlugin);

export default function App() {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPlugins(pluginManager.getPlugins());
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install && npm run dev');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold text-xl tracking-tight">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Blocks className="w-5 h-5 text-white" />
            </div>
            <span>PluginCore</span>
          </div>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
          </a>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Extensible <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Plugin Architecture</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            A modular, open-source plugin system. Easily integrate new functionalities, UI widgets, and core hooks without modifying the base application.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column: System Status & Loaded Plugins */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Puzzle className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-bold">Registered Plugins</h2>
              </div>
              
              <div className="space-y-4">
                {plugins.map((plugin) => (
                  <div key={plugin.manifest.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-slate-900">{plugin.manifest.name}</h3>
                      <span className="text-xs font-mono bg-slate-200 text-slate-700 px-2 py-1 rounded-md">
                        v{plugin.manifest.version}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{plugin.manifest.description}</p>
                    <div className="text-xs text-slate-500 font-mono">
                      ID: {plugin.manifest.id} | Author: {plugin.manifest.author}
                    </div>
                  </div>
                ))}
                
                {plugins.length === 0 && (
                  <div className="text-center py-8 text-slate-500 text-sm">
                    No plugins registered yet.
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/50">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400 text-sm font-mono">Quick Start</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-slate-400 text-sm mb-4">Check the README.md for full instructions on how to create a new plugin.</p>
                <div className="bg-black/50 rounded-lg p-3 flex justify-between items-center">
                  <code className="text-green-400 text-sm font-mono">npm install && npm run dev</code>
                  <button onClick={handleCopy} className="text-slate-400 hover:text-white transition-colors">
                    {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Plugin UI Injection Area */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Blocks className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold">Plugin UI Injections</h2>
            </div>
            <p className="text-sm text-slate-500 mb-6">
              Below are the UI components dynamically injected by the registered plugins. The core app doesn't know what these are!
            </p>
            
            <div className="space-y-4">
              {pluginManager.getWidgets().map((Widget, index) => (
                <div key={index}>
                  {Widget}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
