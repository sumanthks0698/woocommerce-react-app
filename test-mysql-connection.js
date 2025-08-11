const mysql = require('mysql2/promise');

// MySQL configuration for XAMPP phpMyAdmin
const config = {
  host: 'localhost',
  user: 'root',
  password: '', // Default XAMPP MySQL password is empty
  database: 'woocommerce_products',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

async function testConnection() {
    try {
        console.log('🔄 Testing MySQL database connection for XAMPP...');
        
        // Create connection
        const connection = await mysql.createConnection(config);
        
        console.log('✅ Successfully connected to MySQL!');
        
        // Test query
        const [rows] = await connection.execute('SELECT COUNT(*) as productCount FROM products');
        console.log(`📊 Found ${rows[0].productCount} products in database`);
        
        // Test segments database
        await connection.changeUser({ database: 'woocommerce_segments' });
        const [segmentRows] = await connection.execute('SELECT COUNT(*) as segmentCount FROM segments');
        console.log(`📊 Found ${segmentRows[0].segmentCount} segments in database`);
        
        await connection.end();
        console.log('✅ Connection closed successfully');
    } catch (err) {
        console.error('❌ MySQL connection failed:', err.message);
        console.log('\n🔧 Troubleshooting tips:');
        console.log('1. Ensure XAMPP MySQL service is running');
        console.log('2. Check if MySQL is running on port 3306');
        console.log('3. Verify MySQL credentials (default: root with no password)');
        console.log('4. Check if databases exist: run create-databases-mysql.bat');
        console.log('5. Ensure MySQL is accessible via phpMyAdmin');
    }
}

testConnection();
