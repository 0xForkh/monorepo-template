import { Outlet, Link } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">VayMarket</Link>
        <nav className="gap-4 flex">
          <Link to="/" className="hover:underline">Home</Link>
          {/* Add more links here */}
        </nav>
      </header>
      <main className="flex-1 p-4 container mx-auto">
        <Outlet />
      </main>
      <footer className="border-t p-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Chechen Global Marketplace
      </footer>
    </div>
  );
};
