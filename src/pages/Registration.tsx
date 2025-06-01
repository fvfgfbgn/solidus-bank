
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { PersonalInfoStep } from "@/components/registration/PersonalInfoStep";
import { ContactStep } from "@/components/registration/ContactStep";
import { VerificationStep } from "@/components/registration/VerificationStep";
import { PasswordStep } from "@/components/registration/PasswordStep";
import { SuccessStep } from "@/components/registration/SuccessStep";

export type RegistrationData = {
  lastName: string;
  firstName: string;
  middleName: string;
  contactType: "phone" | "email";
  contact: string;
  password: string;
  verificationCode: string;
};

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({
    lastName: "",
    firstName: "",
    middleName: "",
    contactType: "phone",
    contact: "",
    password: "",
    verificationCode: "",
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const stepTitles = {
    1: "Личные данные",
    2: "Контактные данные", 
    3: "Подтверждение контакта",
    4: "Создание пароля",
    5: "Регистрация завершена"
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data: Partial<RegistrationData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <ContactStep
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <VerificationStep
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <PasswordStep
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
          />
        );
      case 5:
        return <SuccessStep data={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                {currentStep > 1 && currentStep < 5 && (
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Назад
                  </Button>
                )}
                <div className="flex-1" />
                <div className="text-sm text-muted-foreground">
                  Шаг {currentStep} из {totalSteps}
                </div>
              </div>
              
              <Progress value={progress} className="mb-4" />
              
              <CardTitle className="text-center">
                {stepTitles[currentStep as keyof typeof stepTitles]}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {renderStep()}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Registration;
