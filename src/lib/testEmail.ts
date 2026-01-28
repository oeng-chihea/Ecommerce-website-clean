import { testEmailConnection } from './emailService';

async function runEmailTest() {
  console.log('🧪 Testing email configuration...');
  const result = await testEmailConnection();
  
  if (result.success) {
    console.log('✅ Email service is ready!');
    process.exit(0);
  } else {
    console.log('❌ Email setup failed:', result.error);
    process.exit(1);
  }
}

runEmailTest();