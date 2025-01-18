import React, { createContext, useState, useEffect, useCallback } from "react";

// Create Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle initial loading state
  const [error, setError] = useState(null);

  // Load user from localStorage or validate token
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (storedUser && token) {
          // Optional: Validate token with an API
          const isValid = await validateToken(token);
          if (isValid) {
            setUser(JSON.parse(storedUser));
          } else {
            clearStorage();
          }
        }
      } catch (err) {
        console.error("Failed to initialize authentication:", err);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  // Login function with token handling
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const { userData, token } = await response.json();
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = useCallback(() => {
    setUser(null);
    clearStorage();
  }, []);

  // Clear localStorage
  const clearStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Validate token (example: make API call to check token validity)
  const validateToken = async (token) => {
    try {
      const response = await fetch("/api/validate-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
