
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Leader = {
  id: string;
  name: string;
  position: string;
  photo: string;
  bio: string;
};

const MANAGEMENT: Leader[] = [
  {
    id: "leader-1",
    name: "Алексей Иванович Смирнов",
    position: "Председатель Solidus Bank",
    photo: "https://via.placeholder.com/150",
    bio: "Возглавляет Solidus Bank с 2020 года. Имеет более 25 лет опыта работы в финансовом секторе. Кандидат экономических наук, автор множества научных работ по финансовой стабильности и монетарной политике.",
  },
  {
    id: "leader-2",
    name: "Елена Павловна Козлова",
    position: "Первый заместитель Председателя",
    photo: "https://via.placeholder.com/150",
    bio: "Курирует вопросы денежно-кредитной политики и экономического прогнозирования. В системе Solidus Bank работает с 2012 года. Доктор экономических наук, профессор.",
  },
  {
    id: "leader-3",
    name: "Сергей Николаевич Петров",
    position: "Заместитель Председателя",
    photo: "https://via.placeholder.com/150",
    bio: "Отвечает за вопросы финансовой стабильности и регулирования финансового рынка. В Solidus Bank с 2015 года. Кандидат экономических наук.",
  },
  {
    id: "leader-4",
    name: "Анна Викторовна Соколова",
    position: "Заместитель Председателя",
    photo: "https://via.placeholder.com/150",
    bio: "Курирует вопросы наличного денежного обращения и расчетов. Работает в системе Solidus Bank с 2008 года. Кандидат экономических наук.",
  },
  {
    id: "leader-5",
    name: "Михаил Дмитриевич Волков",
    position: "Заместитель Председателя",
    photo: "https://via.placeholder.com/150",
    bio: "Отвечает за информационные технологии и цифровизацию. В Solidus Bank с 2018 года. Доктор технических наук.",
  },
  {
    id: "leader-6",
    name: "Ольга Александровна Новикова",
    position: "Директор Юридического департамента",
    photo: "https://via.placeholder.com/150",
    bio: "Руководит юридической службой банка. В Solidus Bank работает с 2016 года. Кандидат юридических наук.",
  },
];

const BOARD_MEMBERS = [
  "Алексей Иванович Смирнов — Председатель Совета директоров",
  "Елена Павловна Козлова — Член Совета директоров",
  "Сергей Николаевич Петров — Член Совета директоров",
  "Анна Викторовна Соколова — Член Совета директоров",
  "Михаил Дмитриевич Волков — Член Совета директоров",
  "Игорь Васильевич Кузнецов — Независимый директор",
  "Татьяна Сергеевна Морозова — Независимый директор",
  "Владимир Петрович Белов — Независимый директор",
  "Наталья Андреевна Климова — Независимый директор",
];

export default function Management() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Руководство</h1>
          <p className="text-muted-foreground mb-8">Руководящий состав Solidus Bank</p>
          
          <div className="space-y-12">
            {/* Executive Management */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Исполнительное руководство</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MANAGEMENT.map((leader) => (
                  <Card key={leader.id}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center mb-4">
                        <img 
                          src={leader.photo} 
                          alt={leader.name} 
                          className="w-32 h-32 rounded-full object-cover mb-4"
                        />
                        <h3 className="font-bold text-center">{leader.name}</h3>
                        <p className="text-center text-muted-foreground">{leader.position}</p>
                      </div>
                      <p className="text-sm">{leader.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Board of Directors */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Совет директоров</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Состав Совета директоров</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {BOARD_MEMBERS.map((member, index) => (
                      <li key={index} className="py-2 border-b last:border-0">
                        {member}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Organizational Structure */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Организационная структура</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Структура Solidus Bank</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    Организационная структура Solidus Bank построена в соответствии с 
                    основными функциями и задачами, возложенными на центральный банк.
                  </p>
                  <h3 className="text-lg font-semibold mt-4">Основные подразделения</h3>
                  <ul>
                    <li><strong>Департамент денежно-кредитной политики</strong> — разработка и реализация монетарной политики</li>
                    <li><strong>Департамент финансовой стабильности</strong> — анализ и мониторинг рисков финансовой системы</li>
                    <li><strong>Департамент банковского регулирования и надзора</strong> — регулирование и надзор за банками</li>
                    <li><strong>Департамент наличного денежного обращения</strong> — эмиссия и организация обращения наличных денег</li>
                    <li><strong>Департамент национальной платежной системы</strong> — развитие и регулирование платежной системы</li>
                    <li><strong>Департамент информационных технологий</strong> — развитие и поддержка ИТ-инфраструктуры</li>
                    <li><strong>Юридический департамент</strong> — правовое обеспечение деятельности банка</li>
                    <li><strong>Департамент международных отношений</strong> — сотрудничество с международными организациями</li>
                  </ul>
                  <div className="text-center mt-4">
                    <button className="text-solidus-steel-blue hover:underline">
                      Скачать полную организационную структуру (PDF)
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
