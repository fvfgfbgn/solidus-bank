
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Shield, Key, Smartphone, Monitor, MapPin } from "lucide-react";

export const SecuritySettings = () => {
  const [settings, setSettings] = useState({
    smsNotifications: true,
    emailNotifications: true,
    loginNotifications: true,
    transactionNotifications: true
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const activeSessions = [
    { id: 1, device: "Chrome на Windows", location: "Москва, Россия", time: "Сейчас", current: true },
    { id: 2, device: "Mobile App на iPhone", location: "Москва, Россия", time: "2 часа назад", current: false },
    { id: 3, device: "Safari на MacOS", location: "Санкт-Петербург, Россия", time: "1 день назад", current: false },
  ];

  const loginHistory = [
    { id: 1, time: "15.01.2024 14:30", device: "Chrome на Windows", location: "Москва", success: true },
    { id: 2, time: "15.01.2024 09:15", device: "Mobile App", location: "Москва", success: true },
    { id: 3, time: "14.01.2024 18:45", device: "Safari на MacOS", location: "Санкт-Петербург", success: true },
    { id: 4, time: "13.01.2024 22:10", device: "Chrome на Windows", location: "Неизвестно", success: false },
  ];

  return (
    <div className="space-y-6">
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
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">Новый пароль</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Подтвердите новый пароль</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button>Изменить пароль</Button>
        </CardContent>
      </Card>

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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Активные сеансы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      {session.device}
                      {session.current && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Текущий</span>}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {session.location} • {session.time}
                    </div>
                  </div>
                </div>
                {!session.current && (
                  <Button variant="outline" size="sm">
                    Завершить
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <Button variant="destructive" size="sm">
              Завершить все сеансы кроме текущего
            </Button>
          </div>
        </CardContent>
      </Card>

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
                  <div className="text-sm text-gray-500">{entry.device} • {entry.location}</div>
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
