
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

type User = {
  id: string;
  username: string;
  role: "admin" | "employee" | "client";
  name: string;
  canAccessSecretData?: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  addEmployee: (employee: Omit<User, "id">) => void;
  employees: User[];
  toggleSecretAccess: (employeeId: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Mock data
const ADMIN_USER: User = {
  id: "admin-1",
  username: "0000",
  role: "admin",
  name: "Администратор",
  canAccessSecretData: true,
};

const INITIAL_EMPLOYEES: User[] = [
  {
    id: "emp-1",
    username: "employee1",
    role: "employee",
    name: "Иван Петров",
    canAccessSecretData: false,
  },
  {
    id: "emp-2",
    username: "employee2",
    role: "employee",
    name: "Анна Смирнова",
    canAccessSecretData: true,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [employees, setEmployees] = useState<User[]>(INITIAL_EMPLOYEES);

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("solidusUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("solidusUser");
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Admin login
    if (username === "0000" && password === "admin") {
      setUser(ADMIN_USER);
      localStorage.setItem("solidusUser", JSON.stringify(ADMIN_USER));
      toast({
        title: "Успешный вход в систему",
        description: "Добро пожаловать, Администратор!",
      });
      return true;
    }

    // Employee login
    const employee = employees.find(emp => emp.username === username && password === "password");
    if (employee) {
      setUser(employee);
      localStorage.setItem("solidusUser", JSON.stringify(employee));
      toast({
        title: "Успешный вход в систему",
        description: `Добро пожаловать, ${employee.name}!`,
      });
      return true;
    }

    toast({
      variant: "destructive",
      title: "Ошибка входа",
      description: "Неверное имя пользователя или пароль",
    });
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("solidusUser");
    toast({
      title: "Выход из системы",
      description: "Вы успешно вышли из системы",
    });
  };

  const addEmployee = (employee: Omit<User, "id">) => {
    const newEmployee = {
      ...employee,
      id: `emp-${Date.now()}`,
    };
    
    setEmployees(prev => [...prev, newEmployee]);
    toast({
      title: "Сотрудник добавлен",
      description: `${newEmployee.name} успешно добавлен в систему`,
    });
  };
  
  const toggleSecretAccess = (employeeId: string) => {
    setEmployees(prev => 
      prev.map(emp => 
        emp.id === employeeId 
          ? { ...emp, canAccessSecretData: !emp.canAccessSecretData }
          : emp
      )
    );
    
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      const newState = !employee.canAccessSecretData;
      toast({
        title: newState ? "Доступ предоставлен" : "Доступ отозван",
        description: `${employee.name} ${newState ? "получил" : "потерял"} доступ к секретным данным`,
      });
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        login, 
        logout, 
        addEmployee,
        employees,
        toggleSecretAccess
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
