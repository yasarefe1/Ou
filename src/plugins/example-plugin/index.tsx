import React from 'react';
import { Plugin } from '../../core/types';
import manifest from './manifest.json';
import { Sparkles } from 'lucide-react';

export const ExamplePlugin: Plugin = {
  manifest,
  initialize: (context) => {
    context.log(`Initializing ${manifest.name} v${manifest.version}...`);
  },
  renderWidget: () => {
    return (
      <div key={manifest.id} className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-start space-x-3">
        <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-indigo-900">{manifest.name} Widget</h4>
          <p className="text-sm text-indigo-700 mt-1">
            This UI is injected directly from the plugin system! The core application doesn't know about this specific component.
          </p>
        </div>
      </div>
    );
  }
};
