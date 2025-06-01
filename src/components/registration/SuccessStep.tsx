
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { RegistrationData } from "@/pages/Registration";
import { Link } from "react-router-dom";

type SuccessStepProps = {
  data: RegistrationData;
};

export const SuccessStep = ({ data }: SuccessStepProps) => {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-green-600">
          Регистрация завершена!
        </h2>
        <p className="text-gray-600">
          Добро пожаловать в Solidus Bank, {data.firstName}!
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <h3 className="font-semibold">Ваши данные для входа:</h3>
        <p className="text-sm">
          <span className="font-medium">Контакт:</span> {data.contact}
        </p>
        <p className="text-sm text-gray-500">
          Пароль сохранен и зашифрован
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-gray-600">
          Вы можете войти в систему, используя указанные данные
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/client-dashboard" className="flex-1">
            <Button className="w-full">
              <ArrowRight className="h-4 w-4 mr-2" />
              Войти в личный кабинет
            </Button>
          </Link>
          
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full">
              На главную
            </Button>
          </Link>
        </div>
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p>На ваш контакт отправлено письмо с подтверждением регистрации</p>
        <p>Если у вас возникнут вопросы, обратитесь в службу поддержки</p>
      </div>
    </div>
  );
};
