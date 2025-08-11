# WooCommerce Products & Segments - Test Cases Guide

## 🧪 Test Cases for UI Testing

### Test Case 1: Basic Product Display
**Objective**: Verify products are loaded and displayed correctly
**Steps**:
1. Start both backend services:
   ```bash
   cd backend/product-service && npm run dev
   cd backend/segment-service && npm run dev
   ```
2. Start frontend:
   ```bash
   npm run dev
   ```
3. Open browser at `http://localhost:5173`
4. **Expected Result**: See 5 products displayed in a grid layout

### Test Case 2: Product Card Details
**Objective**: Verify product information displays correctly
**Test Data**: Check these specific products:
- **iPhone 15 Pro**: Price $999.99, Status: instock, Stock: 25
- **Samsung Galaxy S24**: Price $899.99, Status: instock, Stock: 30, **On Sale!**
- **MacBook Air M3**: Price $1299.99, Status: instock, Stock: 15
- **Sony WH-1000XM5**: Price $349.99, Status: instock, Stock: 50, **On Sale!**
- **Nike Air Max**: Price $129.99, Status: outofstock, Stock: 0

### Test Case 3: Simple Segment Filtering
**Objective**: Test basic segment filtering functionality
**Test Queries**:
1. **Price Filter**: `price > 1000`
   - **Expected**: Shows MacBook Air M3 ($1299.99) and iPhone 15 Pro ($999.99)
2. **Stock Status**: `stock_status = instock`
   - **Expected**: Shows all products except Nike Air Max
3. **Sale Items**: `on_sale = true`
   - **Expected**: Shows Samsung Galaxy S24 and Sony WH-1000XM5

### Test Case 4: Complex Segment Filtering
**Objective**: Test complex rule combinations
**Test Queries**:
1. **Electronics + Price**: `category = Electronics AND price > 500`
   - **Expected**: iPhone 15 Pro, Samsung Galaxy S24, MacBook Air M3
2. **In Stock + Sale**: `stock_status = instock AND on_sale = true`
   - **Expected**: Samsung Galaxy S24, Sony WH-1000XM5
3. **Stock Quantity**: `stock_quantity > 20`
   - **Expected**: iPhone 15 Pro (25), Samsung Galaxy S24 (30), Sony WH-1000XM5 (50)

### Test Case 5: Edge Cases
**Objective**: Test edge cases and error handling
**Test Queries**:
1. **Empty Rules**: Leave rules empty and submit
   - **Expected**: Shows all products (no filtering)
2. **Invalid Syntax**: `price > abc`
   - **Expected**: Error handling (check console for errors)
3. **Non-existent Field**: `color = red`
   - **Expected**: No results or error handling

### Test Case 6: API Endpoints Testing
**Objective**: Test backend API endpoints directly
**Test Commands**:
```bash
# Test product service
curl http://localhost:3001/products

# Test segment service
curl -X POST http://localhost:3002/segments/evaluate \
  -H "Content-Type: application/json" \
  -d '{"conditions": "price > 1000"}'
```

### Test Case 7: Database Connection Verification
**Objective**: Verify database connectivity
**Test Script**:
```bash
node test-db-connection.js
```
**Expected Output**:
```
✅ Successfully connected to SQL Server!
📊 Found 5 products in database
✅ Connection closed successfully
```

### Test Case 8: Performance Testing
**Objective**: Test response times
**Test Steps**:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Submit various segment queries
4. **Expected**: API responses under 1 second

### Test Case 9: Responsive Design
**Objective**: Test UI responsiveness
**Test Steps**:
1. Resize browser window
2. Test on mobile device (if available)
3. **Expected**: Grid layout adapts to screen size

### Test Case 10: Error Handling
**Objective**: Test error scenarios
**Test Steps**:
1. Stop backend services
2. Try to load products
3. **Expected**: Graceful error handling in UI

## 🎯 Quick Test Checklist

- [ ] All 5 products display correctly
- [ ] Product cards show correct information
- [ ] Segment filtering works with simple rules
- [ ] Segment filtering works with complex rules
- [ ] API endpoints return JSON data
- [ ] Database connection is successful
- [ ] No console errors
- [ ] Responsive design works
- [ ] Error handling is graceful

## 🔧 Troubleshooting Commands

```bash
# Check if services are running
netstat -ano | findstr :3001
netstat -ano | findstr :3002

# Check database connection
node test-db-connection.js

# Check SQL Server status
sc query MSSQLSERVER

# Check logs
cd backend/product-service && type logs.txt
cd backend/segment-service && type logs.txt
```

## 📊 Expected Test Results Summary

| Test Case | Expected Result | Status |
|-----------|-----------------|--------|
| Product Display | 5 products shown | ⏳ |
| Product Details | Correct info displayed | ⏳ |
| Simple Filtering | Works correctly | ⏳ |
| Complex Filtering | Works correctly | ⏳ |
| API Endpoints | Return JSON data | ⏳ |
| Database | Connected successfully | ⏳ |
| Performance | < 1 second response | ⏳ |
| Responsive | Adapts to screen size | ⏳ |
| Error Handling | Graceful handling | ⏳ |
