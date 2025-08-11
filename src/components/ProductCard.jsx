function ProductCard({ product }) {
  return (
    <div style={styles.card}>
      <h3>{product.title}</h3>
      <p>Price: {product.price}</p>
      <p>Status: {product.stock_status}</p>
      <p>Stock: {product.stock_quantity ?? 'N/A'}</p>
      <p>Category: {product.category}</p>
      <p>Tags: {product.tags?.join(', ')}</p>
      {product.on_sale && <span style={styles.sale}>On Sale!</span>}
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd',
    padding: '10px',
    margin: '10px',
    borderRadius: '6px',
    backgroundColor: '#fff'
  },
  sale: {
    color: 'red',
    fontWeight: 'bold'
  }
};

export default ProductCard;
