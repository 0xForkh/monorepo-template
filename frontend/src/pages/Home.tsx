import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchHello } from '@/api/hello';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const HomePage = () => {
  const { isLoading, error } = useQuery({
    queryKey: ['hello'],
    queryFn: fetchHello,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Monorepo Template</h1>
      <p className="text-muted-foreground max-w-md">
        A full-stack starter with React, Express, Prisma, and shadcn/ui.
      </p>

      <Badge variant={error ? 'destructive' : isLoading ? 'secondary' : 'outline'}>
        Backend: {isLoading ? 'Checking...' : error ? 'Offline' : 'Online'}
      </Badge>

      <Button asChild variant="outline">
        <Link to="/component-showcase">
          Component Showcase <ArrowRight />
        </Link>
      </Button>
    </div>
  );
};
