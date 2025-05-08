
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">О Solidus Bank</h1>
          <p className="text-muted-foreground mb-8">История и основные принципы деятельности</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>История банка</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    Solidus Bank был основан в 1990 году как центральный финансовый институт страны, 
                    призванный обеспечивать стабильность и развитие финансовой системы.
                  </p>
                  <p>
                    На протяжении своей истории банк последовательно развивался, адаптируясь к изменяющимся 
                    экономическим условиям и вызовам времени. Сегодня Solidus Bank играет ключевую роль в 
                    формировании денежно-кредитной политики и обеспечении финансовой стабильности.
                  </p>
                  <h3 className="text-lg font-semibold mt-4">Основные этапы развития</h3>
                  <ul>
                    <li>
                      <strong>1990 год</strong> — Основание Solidus Bank как независимого финансового института.
                    </li>
                    <li>
                      <strong>1992-1995 годы</strong> — Формирование двухуровневой банковской системы.
                    </li>
                    <li>
                      <strong>1998 год</strong> — Успешное преодоление финансового кризиса и укрепление роли банка.
                    </li>
                    <li>
                      <strong>2002-2007 годы</strong> — Период устойчивого экономического роста и финансовой стабилизации.
                    </li>
                    <li>
                      <strong>2008-2010 годы</strong> — Эффективное управление последствиями мирового финансового кризиса.
                    </li>
                    <li>
                      <strong>2014 год</strong> — Переход к режиму инфляционного таргетирования.
                    </li>
                    <li>
                      <strong>2015-2020 годы</strong> — Реформирование финансового сектора и внедрение международных стандартов.
                    </li>
                    <li>
                      <strong>2021-настоящее время</strong> — Цифровая трансформация и укрепление финансового суверенитета.
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Основные принципы и ценности</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>
                    Деятельность Solidus Bank основана на следующих принципах и ценностях:
                  </p>
                  <h3 className="text-lg font-semibold mt-4">Независимость</h3>
                  <p>
                    Банк осуществляет свои функции и полномочия независимо от других государственных органов,
                    что является залогом объективности принимаемых решений.
                  </p>
                  <h3 className="text-lg font-semibold mt-4">Прозрачность</h3>
                  <p>
                    Solidus Bank регулярно информирует общество о своей деятельности, проводимой политике 
                    и принимаемых решениях. Банк стремится к максимальной открытости, обеспечивающей понимание 
                    его действий и доверие общества.
                  </p>
                  <h3 className="text-lg font-semibold mt-4">Ответственность</h3>
                  <p>
                    Банк ответственен за обеспечение стабильности и развитие финансового сектора. 
                    Принимаемые решения основываются на тщательном анализе и учете их долгосрочного влияния.
                  </p>
                  <h3 className="text-lg font-semibold mt-4">Профессионализм</h3>
                  <p>
                    Высокий уровень квалификации сотрудников и применение современных методов работы 
                    позволяют банку эффективно выполнять возложенные на него функции.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Основные функции</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex gap-2">
                      <div className="h-5 w-5 rounded-full bg-solidus-steel-blue flex items-center justify-center text-white text-xs">
                        1
                      </div>
                      <div>
                        <strong className="block mb-1">Денежно-кредитная политика</strong>
                        <p className="text-sm text-muted-foreground">
                          Разработка и реализация денежно-кредитной политики для достижения целевых показателей инфляции
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <div className="h-5 w-5 rounded-full bg-solidus-steel-blue flex items-center justify-center text-white text-xs">
                        2
                      </div>
                      <div>
                        <strong className="block mb-1">Финансовая стабильность</strong>
                        <p className="text-sm text-muted-foreground">
                          Обеспечение устойчивости финансовой системы и развития финансового рынка
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <div className="h-5 w-5 rounded-full bg-solidus-steel-blue flex items-center justify-center text-white text-xs">
                        3
                      </div>
                      <div>
                        <strong className="block mb-1">Эмиссия наличных денег</strong>
                        <p className="text-sm text-muted-foreground">
                          Организация наличного денежного обращения
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-2">
                      <div className="h-5 w-5 rounded-full bg-solidus-steel-blue flex items-center justify-center text-white text-xs">
                        4
                      </div>
                      <div>
                        <strong className="block mb-1">Регулирование и надзор</strong>
                        <p className="text-sm text-muted-foreground">
                          Регулирование, контроль и надзор за деятельностью финансовых организаций
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Ключевые документы</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="border p-3 rounded-md hover:bg-muted/50 transition-colors">
                      <div className="font-medium">Устав Solidus Bank</div>
                      <div className="flex justify-between items-center mt-2 text-sm">
                        <span className="text-muted-foreground">PDF, 1.2 МБ</span>
                        <button className="text-solidus-steel-blue hover:underline">Скачать</button>
                      </div>
                    </li>
                    <li className="border p-3 rounded-md hover:bg-muted/50 transition-colors">
                      <div className="font-medium">Годовой отчет за 2024 год</div>
                      <div className="flex justify-between items-center mt-2 text-sm">
                        <span className="text-muted-foreground">PDF, 5.7 МБ</span>
                        <button className="text-solidus-steel-blue hover:underline">Скачать</button>
                      </div>
                    </li>
                    <li className="border p-3 rounded-md hover:bg-muted/50 transition-colors">
                      <div className="font-medium">Стратегия развития до 2030 года</div>
                      <div className="flex justify-between items-center mt-2 text-sm">
                        <span className="text-muted-foreground">PDF, 3.5 МБ</span>
                        <button className="text-solidus-steel-blue hover:underline">Скачать</button>
                      </div>
                    </li>
                  </ul>
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
