import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { makeBucketPublic, type MakeBucketPublicResponse } from '@/lib/make-bucket-public';

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MakeBucketPublicResponse | null>(null);

  const handleMakeBucketPublic = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await makeBucketPublic();
      setResult(response);
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>S3 Bucket Administration</CardTitle>
            <CardDescription>
              Manage S3 bucket public access settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Make Bucket Public</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This will set the bucket policy to allow public read access to all files in the 'files' bucket.
                This action is typically only needed once during initial setup.
              </p>
              <Button 
                onClick={handleMakeBucketPublic}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Make Bucket Public'}
              </Button>
            </div>

            {result && (
              <Alert variant={result.success ? 'default' : 'destructive'}>
                <AlertDescription>
                  {result.success ? (
                    <div>
                      <p className="font-semibold">Success!</p>
                      <p>{result.message}</p>
                      <p className="mt-2 text-sm">
                        <strong>Bucket:</strong> {result.bucket}<br />
                        <strong>Endpoint:</strong> {result.endpoint}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold">Error</p>
                      <p>{result.error}</p>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Configuration Details</h4>
              <dl className="text-sm space-y-1">
                <dt className="font-medium">Bucket Name:</dt>
                <dd className="text-muted-foreground">files</dd>
                <dt className="font-medium mt-2">S3 Endpoint:</dt>
                <dd className="text-muted-foreground">https://bucket.poehali.dev</dd>
                <dt className="font-medium mt-2">Function URL:</dt>
                <dd className="text-muted-foreground break-all">
                  https://functions.poehali.dev/4889ad87-4e40-4135-b708-bf46e2c44285
                </dd>
              </dl>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
