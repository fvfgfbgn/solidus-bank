
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RegistrationData } from "@/pages/Registration";

type PersonalInfoStepProps = {
  data: RegistrationData;
  onUpdate: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
};

export const PersonalInfoStep = ({ data, onUpdate, onNext }: PersonalInfoStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [noMiddleName, setNoMiddleName] = useState(false);

  const validateName = (value: string) => {
    const nameRegex = /^[а-яёА-ЯЁ\s]+$/;
    return nameRegex.test(value) && value.trim().length > 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!validateName(data.lastName)) {
      newErrors.lastName = "Фамилия должна содержать только буквы";
    }

    if (!validateName(data.firstName)) {
      newErrors.firstName = "Имя должно содержать только буквы";
    }

    if (!noMiddleName && data.middleName && !validateName(data.middleName)) {
      newErrors.middleName = "Отчество должно содержать только буквы";
    }

    if (Object.keys(newErrors).length === 0) {
      onNext();
    } else {
      setErrors(newErrors);
    }
  };

  const handleNoMiddleNameChange = (checked: boolean) => {
    setNoMiddleName(checked);
    if (checked) {
      onUpdate({ middleName: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="lastName">Фамилия *</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => onUpdate({ lastName: e.target.value })}
            placeholder="Иванов"
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">Пример: Иванов</p>
        </div>

        <div>
          <Label htmlFor="firstName">Имя *</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => onUpdate({ firstName: e.target.value })}
            placeholder="Мария"
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">Пример: Мария</p>
        </div>

        <div>
          <Label htmlFor="middleName">Отчество</Label>
          <Input
            id="middleName"
            value={data.middleName}
            onChange={(e) => onUpdate({ middleName: e.target.value })}
            placeholder="Петровна"
            disabled={noMiddleName}
            className={errors.middleName ? "border-red-500" : ""}
          />
          {errors.middleName && (
            <p className="text-sm text-red-500 mt-1">{errors.middleName}</p>
          )}
          
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox
              id="noMiddleName"
              checked={noMiddleName}
              onCheckedChange={handleNoMiddleNameChange}
            />
            <Label htmlFor="noMiddleName" className="text-sm">
              Нет отчества
            </Label>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Далее
      </Button>
    </form>
  );
};
