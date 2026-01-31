import { Link } from 'wouter';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from 'antd';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-muted-foreground/20">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Page not found</h2>
        <p className="mt-2 text-muted-foreground">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button type="primary" icon={<Home className="h-4 w-4" />}>
              Go home
            </Button>
          </Link>
          <Button
            icon={<ArrowLeft className="h-4 w-4" />}
            onClick={() => window.history.back()}
          >
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}
