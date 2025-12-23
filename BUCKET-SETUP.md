# S3 Bucket Public Access Setup

## Overview
This document describes the setup for making the S3 'files' bucket public for direct CDN access.

## Backend Function Created

### Location
`/backend/make-bucket-public/`

### Files Created
1. **index.py** - Main handler that uses boto3 to set bucket policy
2. **requirements.txt** - Dependencies (boto3==1.34.0)
3. **tests.json** - Test configuration

### Function Details
- **Endpoint**: `https://functions.poehali.dev/4889ad87-4e40-4135-b708-bf46e2c44285`
- **Method**: POST
- **Bucket Name**: `files`
- **S3 Endpoint**: `https://bucket.poehali.dev`
- **Credentials**: Uses `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables

### Bucket Policy Applied
The function sets a bucket policy that allows public read access to all objects:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::files/*"
    }
  ]
}
```

## How to Make Bucket Public

### Option 1: Using the Admin Web Interface (Recommended)
1. Start the development server: `bun run dev`
2. Navigate to `http://localhost:5173/admin` in your browser
3. Click the "Make Bucket Public" button
4. View the result on the page

### Option 2: Using the Node.js Script
```bash
node execute-make-bucket-public.mjs
```

### Option 3: Using the Shell Script
```bash
chmod +x test-bucket-public.sh
./test-bucket-public.sh
```

### Option 4: Using TypeScript Utility
```typescript
import { makeBucketPublic } from '@/lib/make-bucket-public';

const result = await makeBucketPublic();
if (result.success) {
  console.log('Bucket is now public!');
} else {
  console.error('Failed:', result.error);
}
```

### Option 5: Direct HTTP Request
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  https://functions.poehali.dev/4889ad87-4e40-4135-b708-bf46e2c44285
```

## Expected Response

### Success Response
```json
{
  "success": true,
  "message": "Bucket \"files\" is now public",
  "bucket": "files",
  "endpoint": "https://bucket.poehali.dev"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Failed to make bucket public: <error details>"
}
```

## After Making Bucket Public

Once the bucket is public, images can be accessed directly via:
```
https://bucket.poehali.dev/files/<filename>
```

For example:
```
https://bucket.poehali.dev/files/image.jpg
```

## Files Reference

### Backend Function
- `/backend/make-bucket-public/index.py` - Main handler
- `/backend/make-bucket-public/requirements.txt` - Dependencies
- `/backend/make-bucket-public/tests.json` - Test configuration

### Frontend
- `/src/pages/Admin.tsx` - Admin web interface
- `/src/lib/make-bucket-public.ts` - TypeScript utility

### Utility Scripts
- `/execute-make-bucket-public.mjs` - Node.js execution script
- `/test-bucket-public.sh` - Shell script with curl

### Configuration
- `/backend/func2url.json` - Function URL mapping

## Security Notes

1. This function should only be called once during initial setup
2. The bucket policy allows public read access to ALL files in the bucket
3. Write operations still require authentication
4. The function requires AWS credentials with appropriate permissions

## Troubleshooting

If the function fails:
1. Check that AWS credentials are properly configured in the environment
2. Verify that the credentials have `s3:PutBucketPolicy` permission
3. Ensure the bucket name 'files' exists
4. Check the S3 endpoint is accessible: `https://bucket.poehali.dev`