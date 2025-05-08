
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";

export const Footer = () => {
  const [partnersDialogOpen, setPartnersDialogOpen] = React.useState(false);
  
  return (
    <footer className="bg-solidus-dark-slate text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Solidus Bank</h3>
            <p className="text-solidus-platinum opacity-80">
              Основа вашего будущего. Надежность, проверенная временем.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Разделы сайта</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-solidus-platinum opacity-80 hover:opacity-100 transition-opacity">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/currency" className="text-solidus-platinum opacity-80 hover:opacity-100 transition-opacity">
                  Курсы валют
                </Link>
              </li>
              <li>
                <Link to="/rates" className="text-solidus-platinum opacity-80 hover:opacity-100 transition-opacity">
                  Ставки
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="text-solidus-platinum opacity-80 hover:opacity-100 transition-opacity">
                  Аналитика
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <p className="text-solidus-platinum opacity-80 mb-4">
              Телефон: +7 (800) 000-00-00<br />
              Email: info@solidusbank.ru<br />
              Адрес: г. Москва, ул. Банковская, д. 1
            </p>
            <Button 
              variant="outline" 
              className="text-solidus-platinum border-solidus-platinum hover:bg-solidus-platinum hover:text-solidus-dark-slate"
              onClick={() => setPartnersDialogOpen(true)}
            >
              Партнеры проекта
            </Button>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-solidus-platinum opacity-70">
          &copy; 2025 Solidus Bank. Все права защищены.
        </div>
      </div>
      
      <Dialog open={partnersDialogOpen} onOpenChange={setPartnersDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Партнеры проекта</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <a 
              href="https://kmept.ru/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-md border hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium">КМЭПТ</span>
              <ExternalLink className="h-4 w-4 text-gray-500" />
            </a>
            
            <a 
              href="https://imes.su/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-md border hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium">ИМЭС</span>
              <ExternalLink className="h-4 w-4 text-gray-500" />
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};
