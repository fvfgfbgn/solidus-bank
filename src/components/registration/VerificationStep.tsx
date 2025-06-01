
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { RegistrationData } from "@/pages/Registration";
import { toast } from "@/components/ui/use-toast";

type VerificationStepProps = {
  data: RegistrationData;
  onUpdate: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
};

export const VerificationStep = ({ data, onUpdate, onNext }: VerificationStepProps) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const maskContact = (contact: string, type: "phone" | "email") => {
    if (type === "phone") {
      return contact.replace(/(\+7)(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 *** *** $4-$5");
    } else {
      const [username, domain] = contact.split("@");
      return `${username.charAt(0)}***@${domain}`;
    }
  };

  const handleResendCode = () => {
    setTimeLeft(60);
    setCanResend(false);
    toast({
      title: "Код отправлен",
      description: "Новый код подтверждения отправлен на ваш контакт",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.verificationCode.length === 4) {
      // Здесь должна быть проверка кода
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-4">
        <p className="text-gray-600">
          Код отправлен на {maskContact(data.contact, data.contactType)}
        </p>

        <div className="flex justify-center">
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

        <div className="space-y-2">
          {!canResend ? (
            <p className="text-sm text-gray-500">
              Отправить код повторно через {timeLeft} сек.
            </p>
          ) : (
            <Button
              type="button"
              variant="link"
              onClick={handleResendCode}
              className="text-blue-600"
            >
              Отправить код повторно
            </Button>
          )}
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={data.verificationCode.length !== 4}
      >
        Подтвердить
      </Button>
    </form>
  );
};
