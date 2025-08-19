import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  stock_status: {
    type: String,
    required: true,
    enum: ['instock', 'outofstock', 'onbackorder']
  },
  stock_quantity: {
    type: Number,
    default: null
  },
  category: {
    type: String,
    default: ''
  },
  tags: [{
    type: String
  }],
  on_sale: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);