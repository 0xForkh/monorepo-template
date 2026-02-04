import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchHello } from '@/api/hello';

export const HomePage = () => {
  const [count, setCount] = useState(0);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['hello'],
    queryFn: fetchHello,
  });

  return (
    <div className="space-y-8 text-center">
      <h1 className="text-4xl font-bold">Welcome</h1>
      <p className="text-muted-foreground">A full-stack monorepo template.</p>

      <div className="p-6 border rounded-lg shadow-sm max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-4">
          Backend Status: <span className={error ? "text-red-500" : "text-green-600"}>
            {isLoading ? 'Checking...' : error ? 'Offline' : 'Online'}
          </span>
        </h2>
        {data && <p className="mb-4 italic">"{data.message}"</p>}
        
        <button 
          onClick={() => setCount((c) => c + 1)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
        >
          Interactive Counter: {count}
        </button>
      </div>
    </div>
  );
};
