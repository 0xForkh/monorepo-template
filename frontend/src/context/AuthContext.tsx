import { useState, type ReactNode } from 'react';
import { AuthContext, type User } from './auth-context';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string) => {
    // TODO: Implement actual login logic
    console.log('Logging in', email);
    setUser({ id: '1', email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
