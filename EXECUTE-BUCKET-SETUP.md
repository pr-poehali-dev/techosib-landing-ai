# Execute S3 Bucket Public Access Setup

## Quick Start - Make the Bucket Public NOW

Choose one of the following methods to execute the setup:

### Method 1: Web Interface (Easiest)
```bash
# Start the development server
bun run dev

# Then open in browser:
# http://localhost:5173/admin
# 
# Click "Make Bucket Public" button
```

### Method 2: Command Line with Node.js
```bash
node execute-make-bucket-public.mjs
```

### Method 3: Command Line with curl
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  https://functions.poehali.dev/4889ad87-4e40-4135-b708-bf46e2c44285
```

### Method 4: Using Shell Script
```bash
chmod +x test-bucket-public.sh
./test-bucket-public.sh
```

## Expected Success Output

When successful, you should see:
```json
{
  "success": true,
  "message": "Bucket \"files\" is now public",
  "bucket": "files",
  "endpoint": "https://bucket.poehali.dev"
}
```

## What Happens

The function will:
1. Connect to S3 at `https://bucket.poehali.dev`
2. Set a bucket policy on the `files` bucket
3. Allow public GetObject access to all files

## After Execution

Once successful, files will be publicly accessible at:
```
https://bucket.poehali.dev/files/<your-file-name>
```

Example:
```
https://bucket.poehali.dev/files/image.jpg
```

## Verification

To verify the bucket is public, try accessing a file directly in your browser or with:
```bash
curl -I https://bucket.poehali.dev/files/<existing-file>
```

You should get a 200 OK response (not 403 Forbidden).

## Complete File Reference

All files created for this setup:

**Backend Function:**
- `/backend/make-bucket-public/index.py` - Python handler with boto3
- `/backend/make-bucket-public/requirements.txt` - boto3==1.34.0
- `/backend/make-bucket-public/tests.json` - Test configuration

**Frontend:**
- `/src/pages/Admin.tsx` - Admin web interface at /admin route
- `/src/lib/make-bucket-public.ts` - TypeScript utility function

**Scripts:**
- `/execute-make-bucket-public.mjs` - Node.js script
- `/test-bucket-public.sh` - Shell script

**Documentation:**
- `/BUCKET-SETUP.md` - Detailed setup documentation
- `/EXECUTE-BUCKET-SETUP.md` - This file

**Configuration:**
- `/backend/func2url.json` - Function URLs

## Troubleshooting

If you get an error:

1. **Check credentials**: Ensure AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are set in the backend function environment
2. **Check permissions**: The credentials need `s3:PutBucketPolicy` permission
3. **Check bucket exists**: Verify the 'files' bucket exists at the endpoint
4. **Check endpoint**: Ensure `https://bucket.poehali.dev` is accessible

## Next Steps

After making the bucket public, you can:
1. Upload files to the bucket
2. Access them directly via CDN URLs
3. Use them in your application without proxy functions
