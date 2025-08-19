import React from 'react';
import { Package, Tag, Calendar, DollarSign } from 'lucide-react';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStockBadge = (status, quantity) => {
    switch (status) {
      case 'instock':
        return <span className="badge badge-success">In Stock</span>;
      case 'outofstock':
        return <span className="badge badge-error">Out of Stock</span>;
      case 'onbackorder':
        return <span className="badge badge-warning">On Backorder</span>;
      default:
        return <span className="badge badge-error">Unknown</span>;
    }
  };

  return (
    <div className="card hover:shadow-xl transition-all duration-200">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
              {product.title}
            </h3>
            <div className="flex items-center gap-2">
              {getStockBadge(product.stock_status, product.stock_quantity)}
              {product.on_sale && (
                <span className="badge" style={{ background: '#fbbf24', color: '#92400e' }}>
                  On Sale
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          <span className="text-2xl font-bold text-green-600">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-3 text-sm text-gray-600">
          {/* Category */}
          {product.category && (
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>Category: {product.category}</span>
            </div>
          )}

          {/* Stock Quantity */}
          {product.stock_quantity !== null && (
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>Stock: {product.stock_quantity} units</span>
            </div>
          )}

          {/* Created Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Created: {formatDate(product.created_at)}</span>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              {product.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{product.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Product ID */}
        <div className="text-xs text-gray-400 border-t pt-3">
          ID: {product.id}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;