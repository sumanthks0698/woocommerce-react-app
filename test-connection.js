const { connectDB } = require('./backend/product-service/src/db');

async function testConnections() {
    console.log('🔄 Testing database connections...\n');
    
    try {
        console.log('1. Testing Product Service DB...');
        await connectDB();
        console.log('✅ Product service database connected successfully!\n');
        
        console.log('🎉 Database connection established!');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        console.log('\n💡 Check setup-instructions.md for troubleshooting steps');
    }
}

testConnections();
