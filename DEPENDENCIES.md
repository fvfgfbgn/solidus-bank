
# Полный список зависимостей проекта Solidus Bank

## Основные зависимости

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
    "express": "^4.18.2",
    "input-otp": "^1.2.4",
    "lucide-react": "^0.462.0",
    "next-themes": "^0.3.0",
    "open": "^10.0.4",
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
  }
}
```

## Зависимости для разработки

```json
{
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.11.25",
    "@types/react": "^18.2.64",
    "@types/react-dom": "^18.2.21",
    "@vitejs/plugin-react-swc": "^3.6.0",
    "autoprefixer": "^10.4.18",
    "lovable-tagger": "^0.1.7",
    "postcss": "^8.4.35",
    "pkg": "^5.8.1",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.4.2",
    "vite": "^5.1.6"
  }
}
```

## Требования для портативной версии

В портативной версии все необходимые зависимости уже включены в исполняемый файл, поэтому пользователю не требуется устанавливать Node.js, npm или какие-либо пакеты. Однако для корректной работы портативной версии может потребоваться:

1. **Microsoft Visual C++ Redistributable** (последней версии)
2. **Современный веб-браузер**:
   - Google Chrome
   - Mozilla Firefox
   - Microsoft Edge
   - Opera

## Системные зависимости

Портативная версия приложения зависит от следующих системных компонентов:

- **Операционная система**: Windows 10 или новее (x64)
- **Минимальные требования к оборудованию**:
  - Процессор: 1 ГГц или быстрее
  - Оперативная память: 2 ГБ
  - Свободное место на диске: 500 МБ

## Дополнительная информация

Приложение использует следующие технологии:

1. **React** - библиотека для создания пользовательских интерфейсов
2. **TypeScript** - типизированный JavaScript
3. **Tailwind CSS** - утилитарный CSS-фреймворк
4. **Vite** - инструмент сборки для быстрой разработки
5. **Express** - веб-фреймворк для Node.js (используется в портативной версии)
6. **Recharts** - библиотека для создания графиков и диаграмм
7. **React Query** - библиотека для управления состоянием и запросами

Все эти зависимости упаковываются в портативную версию и не требуют отдельной установки.
