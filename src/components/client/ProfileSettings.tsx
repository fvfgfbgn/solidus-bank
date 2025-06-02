
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Phone, MapPin, Calendar, Save, Edit3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ProfileSettings = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Реальные данные клиента (в будущем будут браться из контекста или API)
  const [profile, setProfile] = useState({
    firstName: "Иван",
    lastName: "Петров",
    middleName: "Александрович",
    email: "ivan.petrov@email.com",
    phone: "+7 (999) 123-45-67",
    birthDate: "1985-03-15",
    address: "г. Москва, ул. Тверская, д. 15, кв. 42",
    citizenship: "Российская Федерация",
    passportSeries: "45 12",
    passportNumber: "123456",
    passportDate: "2015-05-20",
    passportIssued: "ОУФМС России по г. Москве"
  });

  const [originalProfile, setOriginalProfile] = useState({ ...profile });

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Симуляция сохранения данных
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOriginalProfile({ ...profile });
      setIsEditing(false);
      
      toast({
        title: "Данные сохранены",
        description: "Ваши персональные данные успешно обновлены",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить данные. Попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setProfile({ ...originalProfile });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Настройки профиля</h2>
        {!isEditing && (
          <Button 
            onClick={handleEdit}
            variant="outline" 
            className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            <Edit3 className="h-4 w-4" />
            Редактировать
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Персональная информация
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastName">Фамилия</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="firstName">Имя</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="middleName">Отчество</Label>
              <Input
                id="middleName"
                value={profile.middleName}
                onChange={(e) => setProfile({...profile, middleName: e.target.value})}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthDate">Дата рождения</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="birthDate"
                  type="date"
                  value={profile.birthDate}
                  onChange={(e) => setProfile({...profile, birthDate: e.target.value})}
                  disabled={!isEditing}
                  className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="citizenship">Гражданство</Label>
              <Select 
                value={profile.citizenship} 
                onValueChange={(value) => setProfile({...profile, citizenship: value})}
                disabled={!isEditing}
              >
                <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Российская Федерация">Российская Федерация</SelectItem>
                  <SelectItem value="Иное">Иное</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Контактная информация</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                disabled={!isEditing}
                className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                disabled={!isEditing}
                className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Адрес проживания</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="address"
                value={profile.address}
                onChange={(e) => setProfile({...profile, address: e.target.value})}
                disabled={!isEditing}
                className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Паспортные данные</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="passportSeries">Серия паспорта</Label>
              <Input
                id="passportSeries"
                value={profile.passportSeries}
                onChange={(e) => setProfile({...profile, passportSeries: e.target.value})}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
                placeholder="XX XX"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="passportNumber">Номер паспорта</Label>
              <Input
                id="passportNumber"
                value={profile.passportNumber}
                onChange={(e) => setProfile({...profile, passportNumber: e.target.value})}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
                placeholder="XXXXXX"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="passportDate">Дата выдачи</Label>
            <Input
              id="passportDate"
              type="date"
              value={profile.passportDate}
              onChange={(e) => setProfile({...profile, passportDate: e.target.value})}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="passportIssued">Кем выдан</Label>
            <Input
              id="passportIssued"
              value={profile.passportIssued}
              onChange={(e) => setProfile({...profile, passportIssued: e.target.value})}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />
          </div>
        </CardContent>
      </Card>

      {isEditing && (
        <div className="flex gap-4">
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Сохранение...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Сохранить изменения
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleCancel}
            disabled={isSaving}
            className="flex-1"
          >
            Отменить
          </Button>
        </div>
      )}
    </div>
  );
};
