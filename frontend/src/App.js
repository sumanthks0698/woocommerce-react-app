import React, { useState, useEffect } from 'react';
import { Package, Filter, RefreshCw, Download, AlertCircle, CheckCircle } from 'lucide-react';
import ProductGrid from './components/ProductGrid';
import SegmentEditor from './components/SegmentEditor';
import apiService from './services/apiService';
import './index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [segmentResults, setSegmentResults] = useState(null);
  const [loading, setLoading] = useState({
    products: false,
    ingest: false,
    segment: false
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const fetchProducts = async () => {
    setLoading(prev => ({ ...prev, products: true }));
    try {
      const response = await apiService.getProducts();
      setProducts(response.products || []);
      if (response.products?.length === 0) {
        showNotification('No products found. Try ingesting products first.', 'warning');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      showNotification('Failed to fetch products', 'error');
    } finally {
      setLoading(prev => ({ ...prev, products: false }));
    }
  };

  const handleIngestProducts = async () => {
    setLoading(prev => ({ ...prev, ingest: true }));
    try {
      const response = await apiService.ingestProducts();
      showNotification(`Successfully ingested ${response.count} products`);
      await fetchProducts();
    } catch (error) {
      console.error('Error ingesting products:', error);
      showNotification('Failed to ingest products', 'error');
    } finally {
      setLoading(prev => ({ ...prev, ingest: false }));
    }
  };

  const handleEvaluateSegment = async (rules) => {
    if (!rules.trim()) {
      showNotification('Please enter some rules to evaluate', 'warning');
      return;
    }

    setLoading(prev => ({ ...prev, segment: true }));
    try {
      const response = await apiService.evaluateSegment(rules);
      setSegmentResults(response);
      showNotification(`Found ${response.count} products matching your criteria`);
    } catch (error) {
      console.error('Error evaluating segment:', error);
      showNotification(error.response?.data?.details || 'Failed to evaluate segment', 'error');
      setSegmentResults(null);
    } finally {
      setLoading(prev => ({ ...prev, segment: false }));
    }
  };

  const resetResults = () => {
    setSegmentResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">WooCommerce Product Segmenter</h1>
                <p className="text-gray-600">Filter and analyze your product catalog</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchProducts}
                disabled={loading.products}
                className="btn-secondary"
              >
                <RefreshCw className={`w-4 h-4 ${loading.products ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleIngestProducts}
                disabled={loading.ingest}
                className="btn-primary"
              >
                {loading.ingest ? (
                  <div className="loading" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                Ingest Products
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 ${
          notification.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
          notification.type === 'warning' ? 'bg-yellow-50 text-yellow-800 border border-yellow-200' :
          'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          {notification.message}
        </div>
      )}

      {/* Main Content */}
      <main className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Segment Editor */}
          <div className="space-y-6">
            <SegmentEditor
              onEvaluate={handleEvaluateSegment}
              onReset={resetResults}
              loading={loading.segment}
              results={segmentResults}
            />
          </div>

          {/* Right Column - Products */}
          <div>
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  {segmentResults ? `Filtered Products (${segmentResults.count})` : `All Products (${products.length})`}
                </h2>
              </div>
            </div>
            <ProductGrid 
              products={segmentResults ? segmentResults.products : products}
              loading={loading.products}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;