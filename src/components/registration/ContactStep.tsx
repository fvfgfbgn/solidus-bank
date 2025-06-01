
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Phone, Mail } from "lucide-react";
import { RegistrationData } from "@/pages/Registration";

type ContactStepProps = {
  data: RegistrationData;
  onUpdate: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
};

export const ContactStep = ({ data, onUpdate, onNext }: ContactStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.startsWith("8")) {
      return "+7" + digits.slice(1);
    }
    if (digits.startsWith("7")) {
      return "+" + digits;
    }
    return "+7" + digits;
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+7\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePhoneChange = (value: string) => {
    if (data.contactType === "phone") {
      const formattedPhone = formatPhone(value);
      onUpdate({ contact: formattedPhone });
      // Очищаем ошибки при изменении
      if (errors.contact) {
        setErrors(prev => ({ ...prev, contact: "" }));
      }
    }
  };

  const handleEmailChange = (value: string) => {
    if (data.contactType === "email") {
      onUpdate({ contact: value });
      // Очищаем ошибки при изменении
      if (errors.contact) {
        setErrors(prev => ({ ...prev, contact: "" }));
      }
    }
  };

  const handleContactTypeChange = (value: "phone" | "email") => {
    // Очищаем ошибки при смене типа контакта
    setErrors({});
    onUpdate({ contactType: value, contact: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!data.contact.trim()) {
      newErrors.contact = data.contactType === "phone" 
        ? "Введите номер телефона" 
        : "Введите email адрес";
    } else if (data.contactType === "phone" && !validatePhone(data.contact)) {
      newErrors.contact = "Введите корректный номер телефона";
    } else if (data.contactType === "email" && !validateEmail(data.contact)) {
      newErrors.contact = "Введите корректный email адрес";
    }

    if (Object.keys(newErrors).length === 0) {
      onNext();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Выберите способ связи</Label>
          <RadioGroup
            value={data.contactType}
            onValueChange={handleContactTypeChange}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="phone" id="phone" />
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Телефон
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="contact">
            {data.contactType === "phone" ? "Номер телефона" : "Email адрес"}
          </Label>
          <Input
            id="contact"
            type={data.contactType === "email" ? "email" : "tel"}
            value={data.contact}
            onChange={(e) => {
              if (data.contactType === "phone") {
                handlePhoneChange(e.target.value);
              } else {
                handleEmailChange(e.target.value);
              }
            }}
            placeholder={
              data.contactType === "phone" 
                ? "+7 (999) 123-45-67" 
                : "example@mail.com"
            }
            className={errors.contact ? "border-red-500" : ""}
          />
          {errors.contact && (
            <p className="text-sm text-red-500 mt-1">{errors.contact}</p>
          )}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            <span className="flex items-center gap-2">
              {data.contactType === "phone" ? 
                <Phone className="h-4 w-4" /> : 
                <Mail className="h-4 w-4" />
              }
              Код подтверждения будет отправлен на указанный контакт
            </span>
          </p>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Получить код
      </Button>
    </form>
  );
};
