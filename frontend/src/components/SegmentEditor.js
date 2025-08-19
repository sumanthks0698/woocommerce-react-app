import React, { useState } from 'react';
import { Filter, RotateCcw, Info } from 'lucide-react';

const SegmentEditor = ({ onEvaluate, onReset, loading, results }) => {
  const [rules, setRules] = useState('price > 1000\nstock_status = instock\non_sale = true');

  const handleEvaluate = () => {
    onEvaluate(rules);
  };

  const handleReset = () => {
    setRules('');
    onReset();
  };

  const exampleRules = [
    'price > 5000',
    'category = Smartphones', 
    'stock_status = instock',
    'on_sale = true',
    'stock_quantity >= 10'
  ];

  return (
    <div className="space-y-6">
      {/* Rule Editor */}
      <div className="card">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Define Filter Conditions</h2>
          <p className="text-gray-600 text-sm">Enter filter rules (one per line):</p>
        </div>

        <div className="form-group">
          <textarea
            className="form-textarea"
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            placeholder="Enter your filter rules here..."
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleEvaluate}
            disabled={loading || !rules.trim()}
            className="btn-primary flex-1"
          >
            {loading ? (
              <div className="loading" />
            ) : (
              <Filter className="w-4 h-4" />
            )}
            Evaluate Filter
          </button>
          <button
            onClick={handleReset}
            className="btn-secondary"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        {/* Examples */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800 font-medium mb-2">Examples:</p>
              <p className="text-xs text-blue-700 font-mono">
                {exampleRules.join(', ')}
              </p>
            </div>
          </div>
        </div>

        {/* Supported Operators */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Supported operators:</strong>
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            {['=', '!=', '>', '<', '>=', '<='].map(op => (
              <code key={op} className="px-2 py-1 bg-gray-200 rounded text-gray-800">
                {op}
              </code>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="card">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Filter Results ({results.count} products)
            </h3>
          </div>
          
          <div className="json-display">
            {JSON.stringify(results, null, 2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default SegmentEditor;