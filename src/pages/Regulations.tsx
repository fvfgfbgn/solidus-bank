
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RegulatoryDocuments } from "@/components/RegulatoryDocuments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Regulations() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Нормативные акты</h1>
          <p className="text-muted-foreground mb-8">Нормативные документы Solidus Bank</p>
          
          <Tabs defaultValue="current">
            <TabsList className="mb-8">
              <TabsTrigger value="current">Действующие</TabsTrigger>
              <TabsTrigger value="projects">Проекты</TabsTrigger>
              <TabsTrigger value="archive">Архив</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current">
              <RegulatoryDocuments />
            </TabsContent>
            
            <TabsContent value="projects">
              <div className="p-8 text-center text-muted-foreground">
                <p>Проекты нормативных документов в настоящее время отсутствуют</p>
              </div>
            </TabsContent>
            
            <TabsContent value="archive">
              <div className="p-8 text-center text-muted-foreground">
                <p>Архивные документы будут доступны после авторизации в системе</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
