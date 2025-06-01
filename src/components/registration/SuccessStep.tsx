
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
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
        <h3 className="text-xl font-semibold text-green-700">
          Регистрация успешно завершена!
        </h3>
        <p className="text-gray-600">
          Добро пожаловать в Банк Solidus, {data.firstName}!
        </p>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-sm text-green-700">
          Ваша заявка на регистрацию принята. В ближайшее время с вами свяжется сотрудник банка для завершения оформления услуг.
        </p>
      </div>

      <div className="space-y-3">
        <Button asChild className="w-full">
          <Link to="/client-dashboard">
            Перейти в личный кабинет
          </Link>
        </Button>
        
        <Button variant="outline" asChild className="w-full">
          <Link to="/">
            Вернуться на главную
          </Link>
        </Button>
      </div>
    </div>
  );
};
