import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('freelansters_token'));
  const [isLoading, setIsLoading] = useState(true);

  // Check auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('freelansters_token');
      if (storedToken) {
        try {
          const res = await authApi.getMe();
          if (res.data && res.data._id) {
            setUser(res.data);
          } else {
            // Stored token was invalid
            localStorage.removeItem('freelansters_token');
            setUser(null);
          }
        } catch (err) {
          console.warn("Session check failed:", err.message);
          localStorage.removeItem('freelansters_token');
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authApi.login({ email, password });
      if (res.data && res.data.token) {
        localStorage.setItem('freelansters_token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        return { success: true, user: res.data.user };
      }
      return { success: false, error: res.data.error || "Login failed" };
    } catch (err) {
      const msg = err.response?.data?.error || err.message || "Invalid credentials";
      return { success: false, error: msg };
    }
  };

  const register = async (userData) => {
    try {
      const res = await authApi.register(userData);
      if (res.data && res.data.token) {
        localStorage.setItem('freelansters_token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        return { success: true, user: res.data.user };
      }
      return { success: false, error: res.data.error || "Registration failed" };
    } catch (err) {
      const msg = err.response?.data?.error || err.message || "Registration failed";
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.warn("Logout API call error:", err.message);
    } finally {
      localStorage.removeItem('freelansters_token');
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        // Legacy UserContext compatibility:
        state: !!user,
        dispatch: () => {}
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Also export UserContext for backwards compatibility
export const UserContext = AuthContext;
export default AuthContext;
