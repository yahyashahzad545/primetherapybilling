const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    console.log('✅ Supabase connection successful!');
    
    const tableCount = await prisma.$queryRaw`SELECT count(*) as count FROM information_schema.tables WHERE table_schema = 'public';`;
    console.log('📊 Tables in public schema:', tableCount[0].count);
    
    const blogCount = await prisma.blog.count();
    console.log('📝 Blog table rows:', blogCount);
    
    await prisma.$disconnect();
    console.log('🔌 Disconnected successfully.');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection().catch(console.error);
