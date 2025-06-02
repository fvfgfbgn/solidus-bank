
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Shield, Key, AlertTriangle, CheckCircle, Activity, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SecuritySettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    smsNotifications: true,
    emailNotifications: true,
    loginNotifications: true,
    transactionNotifications: true
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Новые пароли не совпадают",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Ошибка",
        description: "Пароль должен содержать минимум 6 символов",
        variant: "destructive",
      });
      return;
    }

    setIsChangingPassword(true);
    
    try {
      // Симуляция смены пароля
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      toast({
        title: "Пароль изменен",
        description: "Ваш пароль успешно обновлен",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось изменить пароль. Попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const loginHistory = [
    { id: 1, time: "15.01.2024 14:30", device: "Chrome на Windows", location: "Москва", success: true },
    { id: 2, time: "15.01.2024 09:15", device: "Mobile App", location: "Москва", success: true },
    { id: 3, time: "14.01.2024 18:45", device: "Safari на MacOS", location: "Санкт-Петербург", success: true },
    { id: 4, time: "13.01.2024 22:10", device: "Chrome на Windows", location: "Неизвестно", success: false },
  ];

  const securityMetrics = {
    securityScore: 85,
    lastPasswordChange: "2 месяца назад",
    activeDevices: 3,
    suspiciousAttempts: 1,
    accountAge: "1 год 3 месяца"
  };

  return (
    <div className="space-y-6">
      {/* Аналитика безопасности аккаунта */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Диагностика безопасности аккаунта
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="font-semibold">Уровень безопасности</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{securityMetrics.securityScore}%</div>
              <div className="text-sm text-gray-500">Высокий уровень</div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">Последняя смена пароля</span>
              </div>
              <div className="text-lg font-bold">{securityMetrics.lastPasswordChange}</div>
              <div className="text-sm text-orange-500">Рекомендуем обновить</div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold">Подозрительные попытки</span>
              </div>
              <div className="text-lg font-bold">{securityMetrics.suspiciousAttempts}</div>
              <div className="text-sm text-gray-500">За последний месяц</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">Активные устройства</span>
              </div>
              <div className="text-lg font-bold">{securityMetrics.activeDevices}</div>
              <div className="text-sm text-gray-600">Устройств с доступом</div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="font-semibold">Возраст аккаунта</span>
              </div>
              <div className="text-lg font-bold">{securityMetrics.accountAge}</div>
              <div className="text-sm text-gray-600">Проверенный аккаунт</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Смена пароля */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Смена пароля
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Текущий пароль</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={isChangingPassword}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">Новый пароль</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isChangingPassword}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Подтвердите новый пароль</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isChangingPassword}
            />
          </div>

          <Button 
            onClick={handlePasswordChange}
            disabled={isChangingPassword}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isChangingPassword ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Изменение...
              </>
            ) : (
              "Изменить пароль"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Настройки уведомлений */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Настройки уведомлений
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>SMS-уведомления</Label>
              <p className="text-sm text-gray-500">Уведомления о входах и операциях</p>
            </div>
            <Switch
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => setSettings({...settings, smsNotifications: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Email-уведомления</Label>
              <p className="text-sm text-gray-500">Важные уведомления на почту</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Уведомления о входе</Label>
              <p className="text-sm text-gray-500">При входе с нового устройства</p>
            </div>
            <Switch
              checked={settings.loginNotifications}
              onCheckedChange={(checked) => setSettings({...settings, loginNotifications: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Уведомления об операциях</Label>
              <p className="text-sm text-gray-500">При совершении операций</p>
            </div>
            <Switch
              checked={settings.transactionNotifications}
              onCheckedChange={(checked) => setSettings({...settings, transactionNotifications: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* История входов */}
      <Card>
        <CardHeader>
          <CardTitle>История входов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {loginHistory.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div>
                  <div className="font-medium">{entry.time}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {entry.device} • {entry.location}
                  </div>
                </div>
                <div className={`text-sm font-medium ${entry.success ? 'text-green-600' : 'text-red-600'}`}>
                  {entry.success ? 'Успешно' : 'Неудачно'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
