#!/bin/bash

echo "Calling function to make bucket public..."
echo ""

RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -w "\n%{http_code}" \
  https://functions.poehali.dev/4889ad87-4e40-4135-b708-bf46e2c44285)

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "Status Code: $HTTP_CODE"
echo ""
echo "Response Body:"
echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
echo ""

if echo "$BODY" | grep -q '"success": true'; then
  echo "✓ SUCCESS: Bucket is now public!"
else
  echo "✗ FAILED: Check the error message above"
fi
