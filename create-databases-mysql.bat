@echo off
echo Creating MySQL databases and tables for XAMPP phpMyAdmin...

REM MySQL configuration - adjust these values as needed
set MYSQL_HOST=localhost
set MYSQL_PORT=3306
set MYSQL_USER=root
set MYSQL_PASSWORD=
set MYSQL_PATH="C:\xampp\mysql\bin\mysql.exe"

echo Creating databases...
%MYSQL_PATH% -h %MYSQL_HOST% -P %MYSQL_PORT% -u %MYSQL_USER% -e "CREATE DATABASE IF NOT EXISTS woocommerce_products;"
%MYSQL_PATH% -h %MYSQL_HOST% -P %MYSQL_PORT% -u %MYSQL_USER% -e "CREATE DATABASE IF NOT EXISTS woocommerce_segments;"

echo Creating products table...
%MYSQL_PATH% -h %MYSQL_HOST% -P %MYSQL_PORT% -u %MYSQL_USER% -D woocommerce_products -e ^
"CREATE TABLE IF NOT EXISTS products (id INT PRIMARY KEY, title VARCHAR(255) NOT NULL, price DECIMAL(10,2), stock_status VARCHAR(50), stock_quantity INT, category VARCHAR(100), tags TEXT, on_sale BOOLEAN DEFAULT FALSE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"

echo Creating segments table...
%MYSQL_PATH% -h %MYSQL_HOST% -P %MYSQL_PORT% -u %MYSQL_USER% -D woocommerce_segments -e ^
"CREATE TABLE IF NOT EXISTS segments (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, rules TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"

echo Inserting sample data...
%MYSQL_PATH% -h %MYSQL_HOST% -P %MYSQL_PORT% -u %MYSQL_USER% -D woocommerce_products -e ^
"INSERT INTO products (id, title, price, stock_status, stock_quantity, category, tags, on_sale, created_at) VALUES (1, 'iPhone 15 Pro', 999.99, 'instock', 25, 'Electronics', 'phone,apple,flagship', 0, NOW()), (2, 'Samsung Galaxy S24', 899.99, 'instock', 30, 'Electronics', 'phone,samsung,android', 1, NOW()), (3, 'MacBook Air M3', 1299.99, 'instock', 15, 'Electronics', 'laptop,apple,portable', 0, NOW()), (4, 'Sony WH-1000XM5', 349.99, 'instock', 50, 'Electronics', 'headphones,sony,wireless', 1, NOW()), (5, 'Nike Air Max', 129.99, 'outofstock', 0, 'Fashion', 'shoes,nike,sneakers', 0, NOW());"

echo Creating indexes for better performance...
%MYSQL_PATH% -h %MYSQL_HOST% -P %MYSQL_PORT% -u %MYSQL_USER% -D woocommerce_products -e ^
"CREATE INDEX idx_category ON products(category); CREATE INDEX idx_stock_status ON products(stock_status); CREATE INDEX idx_on_sale ON products(on_sale); CREATE INDEX idx_price ON products(price);"

echo MySQL database setup complete!
pause
