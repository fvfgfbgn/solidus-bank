
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Star, StarOff, UserCog, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const EmployeeManagement: React.FC = () => {
  const { employees, toggleSecretAccess, addEmployee } = useAuth();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [newEmployee, setNewEmployee] = useState({
    username: "",
    name: "",
    role: "employee" as const,
    canAccessSecretData: false,
    department: "",
    position: "",
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
      department: "",
      position: "",
    });
  };

  const handleEditEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setIsEditDialogOpen(true);
  };

  const handleDeleteEmployee = (employeeId: string) => {
    toast.info("Удаление сотрудника", {
      description: "Функция удаления находится в разработке",
    });
  };

  const getStatusBadge = (canAccess: boolean) => {
    return canAccess ? (
      <Badge variant="default" className="bg-green-100 text-green-800">
        Доступ есть
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
        Нет доступа
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Управление сотрудниками</CardTitle>
            <p className="text-muted-foreground">
              Управление персоналом и правами доступа
            </p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} size="lg">
            Добавить сотрудника
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-lg">
                      {employee.name[0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      @{employee.username} • ID: {employee.id}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(employee.canAccessSecretData)}
                      <Badge variant="outline">
                        {employee.role === "admin" ? "Администратор" : "Сотрудник"}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant={employee.canAccessSecretData ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSecretAccess(employee.id)}
                    className={employee.canAccessSecretData ? "bg-amber-500 hover:bg-amber-600" : ""}
                  >
                    {employee.canAccessSecretData ? (
                      <Star className="h-4 w-4 mr-2" />
                    ) : (
                      <StarOff className="h-4 w-4 mr-2" />
                    )}
                    {employee.canAccessSecretData ? "Отозвать доступ" : "Предоставить доступ"}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditEmployee(employee)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Редактировать
                  </Button>
                  
                  {employee.role !== "admin" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteEmployee(employee.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Всего сотрудников
                </p>
                <p className="text-3xl font-bold">{employees.length}</p>
              </div>
              <UserCog className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  С секретным доступом
                </p>
                <p className="text-3xl font-bold">
                  {employees.filter(emp => emp.canAccessSecretData).length}
                </p>
              </div>
              <Star className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Администраторов
                </p>
                <p className="text-3xl font-bold">
                  {employees.filter(emp => emp.role === "admin").length}
                </p>
              </div>
              <UserCog className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Диалог добавления сотрудника */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Добавить нового сотрудника</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Имя пользователя *</Label>
              <Input
                id="username"
                name="username"
                value={newEmployee.username}
                onChange={handleInputChange}
                placeholder="employee123"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Полное имя *</Label>
              <Input
                id="name"
                name="name"
                value={newEmployee.name}
                onChange={handleInputChange}
                placeholder="Иван Петров"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Отдел</Label>
              <Input
                id="department"
                name="department"
                value={newEmployee.department}
                onChange={handleInputChange}
                placeholder="IT отдел"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="position">Должность</Label>
              <Input
                id="position"
                name="position"
                value={newEmployee.position}
                onChange={handleInputChange}
                placeholder="Специалист"
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
            <Button onClick={handleAddEmployee}>Добавить сотрудника</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог редактирования */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Редактировать сотрудника</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <p className="text-muted-foreground">
              Редактирование профиля: {selectedEmployee?.name}
            </p>
            <p className="text-sm mt-2">
              Функция находится в разработке
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Закрыть
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
