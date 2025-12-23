#!/usr/bin/env node

const MAKE_BUCKET_PUBLIC_URL = "https://functions.poehali.dev/4889ad87-4e40-4135-b708-bf46e2c44285";

console.log("Calling function to make bucket public...");
console.log(`URL: ${MAKE_BUCKET_PUBLIC_URL}\n`);

try {
  const response = await fetch(MAKE_BUCKET_PUBLIC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  console.log(`Status Code: ${response.status}`);
  
  const data = await response.json();
  
  console.log('\nResponse:');
  console.log(JSON.stringify(data, null, 2));
  
  if (data.success) {
    console.log(`\n✓ SUCCESS: Bucket '${data.bucket}' is now public!`);
    console.log(`Endpoint: ${data.endpoint}`);
    console.log(`Message: ${data.message}`);
    process.exit(0);
  } else {
    console.log(`\n✗ FAILED: ${data.error}`);
    process.exit(1);
  }
} catch (error) {
  console.error('\n✗ ERROR:', error.message);
  process.exit(1);
}
