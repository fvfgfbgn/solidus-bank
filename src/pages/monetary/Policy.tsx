
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function MonetaryPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Денежно-кредитная политика</h1>
          <p className="text-muted-foreground mb-8">Принципы и инструменты денежно-кредитной политики</p>
          
          <div className="py-16 text-center text-muted-foreground">
            <p>Раздел находится в разработке</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
