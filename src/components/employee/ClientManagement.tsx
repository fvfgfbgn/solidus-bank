
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, UserPlus, Phone, Mail, Edit } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

type Client = {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: "active" | "inactive" | "potential";
  segment: "individual" | "business" | "premium";
};

const MOCK_CLIENTS: Client[] = [
  {
    id: "client-1",
    name: "Алексей Иванов",
    phone: "+7 (900) 123-4567",
    email: "a.ivanov@example.com",
    status: "active",
    segment: "individual"
  },
  {
    id: "client-2",
    name: "ООО 'ТехноСтрой'",
    phone: "+7 (495) 765-4321",
    email: "info@technostroy.ru",
    status: "active",
    segment: "business"
  },
  {
    id: "client-3",
    name: "Елена Петрова",
    phone: "+7 (912) 555-7890",
    email: "e.petrova@example.com",
    status: "premium",
    segment: "premium"
  },
  {
    id: "client-4",
    name: "Сергей Смирнов",
    phone: "+7 (903) 987-6543",
    email: "s.smirnov@example.com",
    status: "inactive",
    segment: "individual"
  },
  {
    id: "client-5",
    name: "ИП Козлов А.Н.",
    phone: "+7 (499) 111-2233",
    email: "kozlov@example.ru",
    status: "potential",
    segment: "business"
  },
];

export const ClientManagement: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState<Partial<Client>>({
    name: "",
    phone: "",
    email: "",
    status: "potential",
    segment: "individual"
  });

  // Filter clients based on search query
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddClient = () => {
    if (!newClient.name || !newClient.phone || !newClient.email) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Заполните все обязательные поля"
      });
      return;
    }

    const newClientWithId: Client = {
      id: `client-${Date.now()}`,
      name: newClient.name,
      phone: newClient.phone,
      email: newClient.email,
      status: newClient.status as "active" | "inactive" | "potential",
      segment: newClient.segment as "individual" | "business" | "premium"
    };

    setClients(prev => [...prev, newClientWithId]);
    setIsAddDialogOpen(false);
    setNewClient({
      name: "",
      phone: "",
      email: "",
      status: "potential",
      segment: "individual"
    });

    toast({
      title: "Клиент добавлен",
      description: `${newClientWithId.name} успешно добавлен в базу`
    });
  };

  const getStatusBadge = (status: Client["status"]) => {
    const statusClasses = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      potential: "bg-blue-100 text-blue-800",
      premium: "bg-amber-100 text-amber-800"
    };
    
    const statusLabels = {
      active: "Активный",
      inactive: "Неактивный",
      potential: "Потенциальный",
      premium: "Премиум"
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {statusLabels[status]}
      </span>
    );
  };

  const getSegmentBadge = (segment: Client["segment"]) => {
    const segmentClasses = {
      individual: "bg-purple-100 text-purple-800",
      business: "bg-indigo-100 text-indigo-800",
      premium: "bg-amber-100 text-amber-800"
    };
    
    const segmentLabels = {
      individual: "Физ. лицо",
      business: "Бизнес",
      premium: "Премиум"
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${segmentClasses[segment]}`}>
        {segmentLabels[segment]}
      </span>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Управление клиентами</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск клиентов..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Новый клиент
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Имя</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Сегмент</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{getStatusBadge(client.status)}</TableCell>
                  <TableCell>{getSegmentBadge(client.segment)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        toast({
                          title: "Звонок клиенту",
                          description: `Набираем номер ${client.phone}`
                        });
                      }}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        toast({
                          title: "Отправка email",
                          description: `Составляем письмо для ${client.email}`
                        });
                      }}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        toast({
                          title: "Редактирование",
                          description: "Функция в разработке"
                        });
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {filteredClients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    Клиентов не найдено
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить нового клиента</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Имя клиента или название организации</Label>
              <Input
                id="name"
                name="name"
                value={newClient.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                name="phone"
                value={newClient.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newClient.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleAddClient}>Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
