# MySQL Database Setup Guide for XAMPP phpMyAdmin

### Prerequisites
- XAMPP installed with Apache and MySQL services
- Node.js (v16 or higher)
- npm or yarn

### Step 1: Start XAMPP Services
1. Open XAMPP Control Panel
2. Start Apache and MySQL services
3. Access phpMyAdmin at http://localhost/phpmyadmin

### Step 2: Create MySQL Databases
1. Open phpMyAdmin in your browser
2. Run the `database-setup-mysql.sql` script to create databases and tables
3. Or use the batch file: `create-databases-mysql.bat`

### Step 3: Configure Environment Variables
Create `.env` files in both service directories with these MySQL settings:

**For product-service/.env:**
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=woocommerce_products
DB_USER=root
DB_PASS=
DB_DIALECT=mysql
```

**For segment-service/.env:**
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=woocommerce_segments
DB_USER=root
DB_PASS=
DB_DIALECT=mysql
PRODUCT_SERVICE_URL=http://localhost:5000
```

### Step 4: Install MySQL Dependencies
```bash
# Install MySQL driver
npm install mysql2

# In each service directory
cd backend/product-service && npm install mysql2
cd ../segment-service && npm install mysql2
```

### Step 5: Create MySQL Connection Files

**Create backend/product-service/src/db.js:**
```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'woocommerce_products',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function connectDB() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL database');
    connection.release();
    return pool;
  } catch (error) {
    console.error('❌ MySQL connection error:', error);
    throw error;
  }
}

module.exports = { connectDB, pool };
```

**Create backend/segment-service/src/db.js:**
```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'woocommerce_segments',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function connectDB() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL database');
    connection.release();
    return pool;
  } catch (error) {
    console.error('❌ MySQL connection error:', error);
    throw error;
  }
}

module.exports = { connectDB, pool };
```

### Step 6: Test MySQL Connection
```bash
# Test MySQL connection
node test-mysql-connection.js

# Start the services
npm run dev
```

### Step 7: Verify Setup
1. Check console logs for "✅ Connected to MySQL"
2. Access phpMyAdmin at http://localhost/phpmyadmin
3. Verify tables exist in both databases
4. Check sample data is loaded

### Troubleshooting
- Ensure XAMPP Apache and MySQL services are running
- Check MySQL port (default: 3306)
- Verify MySQL credentials (default: root with no password)
- Check if databases exist in phpMyAdmin
- Ensure MySQL is accessible via phpMyAdmin

### Alternative: Manual Setup via phpMyAdmin
1. Open http://localhost/phpmyadmin
2. Create databases: woocommerce_products and woocommerce_segments
3. Import database-setup-mysql.sql
4. Verify tables and data are created
