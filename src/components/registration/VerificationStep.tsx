
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Phone, Mail, RotateCcw } from "lucide-react";
import { RegistrationData } from "@/pages/Registration";

type VerificationStepProps = {
  data: RegistrationData;
  onUpdate: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
};

export const VerificationStep = ({ data, onUpdate, onNext }: VerificationStepProps) => {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (data.verificationCode.length !== 4) {
      newErrors.verificationCode = "Введите 4-значный код";
    }

    if (Object.keys(newErrors).length === 0) {
      onNext();
    } else {
      setErrors(newErrors);
    }
  };

  const handleResendCode = () => {
    setCountdown(60);
    setCanResend(false);
    // Симуляция отправки нового кода
    console.log("Код отправлен повторно");
  };

  const formatContact = (contact: string, type: "phone" | "email") => {
    if (type === "phone") {
      return contact.replace(/(\+7)(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 *** *** $4-$5");
    }
    return contact.replace(/(.{2}).*(@.*)/, "$1***$2");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          {data.contactType === "phone" ? (
            <Phone className="h-12 w-12 text-blue-500" />
          ) : (
            <Mail className="h-12 w-12 text-blue-500" />
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Подтвердите контакт</h3>
          <p className="text-gray-600">
            Код отправлен на {formatContact(data.contact, data.contactType)}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="verificationCode">Введите код подтверждения</Label>
            <div className="flex justify-center mt-2">
              <InputOTP
                maxLength={4}
                value={data.verificationCode}
                onChange={(value) => onUpdate({ verificationCode: value })}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {errors.verificationCode && (
              <p className="text-sm text-red-500 mt-1 text-center">{errors.verificationCode}</p>
            )}
          </div>

          <div className="text-center space-y-2">
            {!canResend ? (
              <p className="text-sm text-gray-500">
                Повторная отправка кода через {countdown} сек
              </p>
            ) : (
              <Button
                type="button"
                variant="ghost"
                onClick={handleResendCode}
                className="text-blue-600 hover:text-blue-800"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Отправить код повторно
              </Button>
            )}
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Подтвердить
      </Button>
    </form>
  );
};
