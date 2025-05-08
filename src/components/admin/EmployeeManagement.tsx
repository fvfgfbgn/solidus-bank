
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Star, StarOff, UserCog } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const EmployeeManagement: React.FC = () => {
  const { employees, toggleSecretAccess, addEmployee } = useAuth();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    username: "",
    name: "",
    role: "employee" as const,
    canAccessSecretData: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddEmployee = () => {
    if (!newEmployee.username || !newEmployee.name) {
      toast.error("Ошибка", {
        description: "Заполните все обязательные поля",
      });
      return;
    }

    addEmployee(newEmployee);
    setIsAddDialogOpen(false);
    setNewEmployee({
      username: "",
      name: "",
      role: "employee",
      canAccessSecretData: false,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Управление сотрудниками</CardTitle>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          Добавить сотрудника
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">ID</th>
                <th className="text-left py-3 px-4">Пользователь</th>
                <th className="text-left py-3 px-4">Имя</th>
                <th className="text-left py-3 px-4">Доступ к секретным данным</th>
                <th className="text-right py-3 px-4">Действия</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">{employee.id}</td>
                  <td className="py-3 px-4">{employee.username}</td>
                  <td className="py-3 px-4 font-medium">{employee.name}</td>
                  <td className="py-3 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSecretAccess(employee.id)}
                      className={employee.canAccessSecretData ? "text-amber-500" : "text-muted-foreground"}
                    >
                      {employee.canAccessSecretData ? (
                        <Star className="h-4 w-4 mr-2" />
                      ) : (
                        <StarOff className="h-4 w-4 mr-2" />
                      )}
                      {employee.canAccessSecretData ? "Доступ предоставлен" : "Доступ не предоставлен"}
                    </Button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        toast.info("Редактирование профиля", {
                          description: "Функция находится в разработке",
                        });
                      }}
                    >
                      <UserCog className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Добавить сотрудника</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Имя пользователя</Label>
              <Input
                id="username"
                name="username"
                value={newEmployee.username}
                onChange={handleInputChange}
                placeholder="Введите имя пользователя"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Полное имя</Label>
              <Input
                id="name"
                name="name"
                value={newEmployee.name}
                onChange={handleInputChange}
                placeholder="Введите полное имя"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="secretAccess"
                checked={newEmployee.canAccessSecretData}
                onCheckedChange={(checked) =>
                  setNewEmployee((prev) => ({
                    ...prev,
                    canAccessSecretData: checked === true,
                  }))
                }
              />
              <Label htmlFor="secretAccess">Доступ к секретным данным</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleAddEmployee}>Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
