
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientManagement } from "@/components/employee/ClientManagement";
import { Communications } from "@/components/employee/Communications";
import { SecretData } from "@/components/admin/SecretData";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { InternalCommunications } from "@/components/admin/InternalCommunications";

export default function EmployeePanel() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("clients");

  // Redirect non-employees
  if (!isAuthenticated || user?.role !== "employee") {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Рабочий кабинет сотрудника</h1>
          
          <div className="mb-6">
            <Card>
              <CardHeader>
                <CardTitle>{user?.name}</CardTitle>
                <CardDescription>
                  {user?.canAccessSecretData 
                    ? "Сотрудник с доступом к секретным данным" 
                    : "Сотрудник без доступа к секретным данным"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Добро пожаловать в рабочий кабинет. Пожалуйста, не забудьте выйти из системы по окончании работы.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="clients">Клиенты</TabsTrigger>
              <TabsTrigger value="communications">Коммуникации с клиентами</TabsTrigger>
              <TabsTrigger value="internal">Внутренние коммуникации</TabsTrigger>
              {user?.canAccessSecretData && (
                <TabsTrigger value="secret">Секретные данные</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="clients">
              <ClientManagement />
            </TabsContent>
            
            <TabsContent value="communications">
              <Communications />
            </TabsContent>
            
            <TabsContent value="internal">
              <InternalCommunications />
            </TabsContent>
            
            {user?.canAccessSecretData && (
              <TabsContent value="secret">
                <SecretData />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
