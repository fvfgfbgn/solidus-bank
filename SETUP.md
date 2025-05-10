# Полное руководство по установке и запуску проекта Solidus Bank

## Создание портативной версии для Windows (без установки Node.js)

Чтобы создать полностью автономную версию приложения для запуска на Windows без необходимости устанавливать Node.js и npm, следуйте этим шагам:

### Необходимые инструменты (только для создания портативной версии)

- Node.js (версия 16.x или выше)
- npm (обычно устанавливается вместе с Node.js)
- pkg (инструмент для упаковки Node.js приложений в исполняемые файлы)

### Шаги по созданию портативной версии

1. **Установка pkg глобально**:
```bash
npm install -g pkg
```

2. **Сборка проекта**:
```bash
npm run build
```

3. **Создание server.js для обслуживания статических файлов**:
```bash
echo "const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// Обслуживание статических файлов из папки dist
app.use(express.static(path.join(__dirname, 'dist')));

// Обработка всех маршрутов для SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Запуск сервера
const server = app.listen(port, () => {
  console.log(`Приложение Solidus Bank запущено на порту ${port}`);
  console.log(`Откройте браузер и перейдите по адресу: http://localhost:${port}`);
  
  // Автоматическое открытие браузера
  const open = require('open');
  open(`http://localhost:${port}`);
});

// Обработка сигналов завершения для корректного закрытия
process.on('SIGINT', () => {
  console.log('Завершение работы сервера...');
  server.close(() => {
    console.log('Сервер остановлен');
    process.exit(0);
  });
});" > server.js
```

4. **Добавление зависимостей для сервера**:
```bash
npm install express open --save
npm install --save-dev @types/express
```

5. **Создание конфигурации для pkg**:
```bash
echo '{
  "bin": "server.js",
  "pkg": {
    "targets": ["node16-win-x64"],
    "outputPath": "portable",
    "assets": ["dist/**/*"]
  }
}' > pkg.json
```

6. **Упаковка приложения**:
```bash
pkg --config pkg.json .
```

7. **Подготовка директории для распространения**:
```bash
mkdir -p SolidusBank
cp portable/server-win-x64.exe SolidusBank/SolidusBank.exe
cp -r ИНСТРУКЦИЯ.md OFFLINE_GUIDE.md SETUP.md SolidusBank/
```

8. **Упаковка для распространения**:
```bash
# Для Windows (используя PowerShell)
Compress-Archive -Path SolidusBank -DestinationPath SolidusBank-portable.zip

# Для Linux/Mac
zip -r SolidusBank-portable.zip SolidusBank
```

После выполнения этих шагов вы получите файл `SolidusBank-portable.zip`, который содержит портативную версию вашего приложения. Пользователь может распаковать этот архив и запустить приложение без установки Node.js или других зависимостей.

## Подготовка флеш-накопителя

1. **Форматирование флеш-накопителя**:
   - Вставьте флеш-накопитель в USB-порт
   - В Windows откройте Проводник, щелкните правой кнопкой мыши по флеш-накопителю и выберите "Форматировать"
   - Выберите файловую систему NTFS или exFAT (для файлов больше 4 ГБ)
   - Нажмите "Начать"

2. **Копирование файлов**:
   - Распакуйте архив `SolidusBank-portable.zip`
   - Скопируйте всю папку `SolidusBank` на флеш-накопитель
   - Убедитесь, что структура папок сохранена

3. **Дополнительно (рекомендуется)**:
   - Добавьте на флеш-накопитель установщики необходимых драйверов и компонентов:
     - Microsoft Visual C++ Redistributable (последней версии)
     - Современный браузер (портативная версия Chrome или Firefox)

## Системные требования

Для запуска проекта вам потребуются:

- Node.js (версия 16.x или выше)
- npm (обычно устанавливается вместе с Node.js)
- Git (для клонирования репозитория)

## Альтернативные способы установки Node.js и npm

### Для регионов с ограниченным доступом к официальным ресурсам

#### Вариант 1: Использование зеркал (mirrors)

Вы можете загрузить Node.js с региональных зеркал:

- Китайское зеркало: https://npm.taobao.org/mirrors/node/
- Российское зеркало: https://nodejs.org.ru/
- Альтернативные репозитории: https://github.com/nodesource/distributions

#### Вариант 2: Использование nvm (Node Version Manager) через зеркала

```bash
# Установка nvm через альтернативные источники
export NVM_MIRROR=https://npm.taobao.org/mirrors/node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
# или
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Установка Node.js через nvm
nvm install 16
nvm use 16
```

#### Вариант 3: Использование Docker

Если у вас есть доступ к Docker, вы можете использовать его для запуска проекта без установки Node.js:

```bash
# Создайте Dockerfile в корне проекта со следующим содержанием
# Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "run", "dev"]

# Сборка и запуск Docker-контейнера
docker build -t solidus-bank .
docker run -p 8080:8080 solidus-bank
```

#### Вариант 4: Использование локальных пакетов

1. Попросите коллегу или знакомого с доступом к npm загрузить все зависимости:
```bash
# На компьютере с доступом
npm install
npm pack # создаст архив node_modules
```

2. Получите архив и распакуйте его в свой проект.

## Полный список зависимостей проекта

Ниже представлен полный список зависимостей, которые необходимы для работы проекта:

```json
{
  "dependencies": {
    "@hookform/resolvers": "^3.9.0",
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-alert-dialog": "^1.1.1",
    "@radix-ui/react-aspect-ratio": "^1.1.0",
    "@radix-ui/react-avatar": "^1.1.0",
    "@radix-ui/react-checkbox": "^1.1.1",
    "@radix-ui/react-collapsible": "^1.1.0",
    "@radix-ui/react-context-menu": "^2.2.1",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.1",
    "@radix-ui/react-hover-card": "^1.1.1",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-menubar": "^1.1.1",
    "@radix-ui/react-navigation-menu": "^1.2.0",
    "@radix-ui/react-popover": "^1.1.1",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-radio-group": "^1.2.0",
    "@radix-ui/react-scroll-area": "^1.1.0",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slider": "^1.2.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-switch": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-toast": "^1.2.1",
    "@radix-ui/react-toggle": "^1.1.0",
    "@radix-ui/react-toggle-group": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.4",
    "@tanstack/react-query": "^5.56.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.0",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.3.0",
    "input-otp": "^1.2.4",
    "lucide-react": "^0.462.0",
    "next-themes": "^0.3.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.53.0",
    "react-resizable-panels": "^2.1.3",
    "react-router-dom": "^6.26.2",
    "recharts": "^2.12.7",
    "sonner": "^1.5.0",
    "tailwind-merge": "^2.5.2",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.3",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^20.11.25",
    "@types/react": "^18.2.64",
    "@types/react-dom": "^18.2.21",
    "@vitejs/plugin-react-swc": "^3.6.0",
    "autoprefixer": "^10.4.18",
    "lovable-tagger": "^0.1.7",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.4.2",
    "vite": "^5.1.6"
  }
}
```

## Офлайн-установка зависимостей

Если у вас ограниченный доступ к npm, вы можете создать локальный репозиторий пакетов:

1. На компьютере с доступом к npm выполните:
```bash
npm install -g npm-pack-all
cd путь_к_проекту
npm-pack-all
```

2. Это создаст папку `node_modules_packed` с архивами всех зависимостей.

3. Перенесите эту папку на свой компьютер и выполните:
```bash
npm install --offline ./node_modules_packed/*.tgz
```

## Шаги по установке и запуску

### 1. Клонирование репозитория

```bash
git clone <URL_РЕПОЗИТОРИЯ>
cd solidus-bank
```

### 2. Установка зависимостей

Стандартный способ:
```bash
npm install
```

С использованием Yarn:
```bash
yarn install
```

### 3. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```
VITE_API_URL=http://localhost:8080
```

### 4. Запуск проекта в режиме разработки

```bash
npm run dev
```

После этого приложение будет доступно по адресу: `http://localhost:8080`

### 5. Сборка проекта для production

```bash
npm run build
```

Собранные файлы будут размещены в директории `dist`

### 6. Запуск собранного проекта

```bash
npm run preview
```

## Решение возможных проблем

### Проблемы с доступом к npmjs.com

Если у вас проблемы с доступом к npmjs.com, вы можете настроить альтернативный реестр:

```bash
# Настройка Taobao registry (Китай)
npm config set registry https://registry.npm.taobao.org

# Или использование российских зеркал
npm config set registry https://npm.elemecdn.com
```

### Проблемы с зависимостями

Если возникают ошибки при установке зависимостей, можно попробовать:

```bash
# Очистка кэша npm
npm cache clean --force

# Установка с игнорированием скриптов
npm install --ignore-scripts

# Установка без строгих проверок
npm install --no-fund --no-audit
```

## Запуск через CDN (без установки Node.js)

Если установка Node.js абсолютно невозможна, вы можете запустить приложение через CDN сервисы:

1. Соберите проект на компьютере с доступом к npm:
```bash
npm run build
```

2. Загрузите содержимое папки `dist` на статический хостинг:
   - GitHub Pages
   - Netlify
   - Vercel
   - Surge.sh
   - Или любой локальный веб-сервер (Apache, Nginx)

## Структура проекта

```
solidus-bank/
├── public/               # Статические файлы
├── src/                  # Исходный код
│   ├── components/       # React компоненты
│   │   ├── ui/           # UI компоненты (shadcn/ui)
│   │   └── admin/        # Компоненты для админ-панели
│   ├── contexts/         # React контексты
│   ├── hooks/            # Пользовательские хуки
│   ├── lib/              # Утилиты и вспомогательные функции
│   ├── pages/            # Страницы приложения
│   ├── App.tsx           # Корневой компонент приложения
│   └── main.tsx          # Точка входа
└── ... файлы конфигурации
```

## Дополнительная информация

### Ссылки на документацию используемых технологий

- [React](https://reactjs.org/docs/getting-started.html)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Vite](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com/docs/en/v6)
- [Recharts](https://recharts.org/en-US/api)
- [React Query](https://tanstack.com/query/latest/docs/react/overview)

### Особенности портативной версии

- Портативная версия работает только в операционной системе Windows
- Необходимо скопировать все файлы и сохранить структуру папок
- Все файлы данных хранятся в папке с приложением
- Для работы может потребоваться Microsoft Visual C++ Redistributable

### Контакты для поддержки

При возникновении проблем с запуском или работой приложения обращайтесь:
- Email: support@solidus-bank.example.com
- Телефон: +7 (XXX) XXX-XX-XX
