# Визуализация выравнивания аминокислотных последовательностей

[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MUI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)

![image](https://downloader.disk.yandex.ru/preview/80dd8ef1b0ae2316f476555784c2fd37209ef08f768cf5f2636bd53490872d13/684b60ff/41-mIGXwWxCZmnuLWPjxAAXK7vJ35pc1n3uOY4bMS3-ARdI8m3n0g-Mmq05ni4TQc-eXet0x8W1XK2436EKGlA%3D%3D?uid=0&filename=2025-06-12_22-21-28.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v3&size=2048x2048)
> Визуализация фрагмента α-цепи человеческого гемоглобина

Инструмент для визуального сравнения двух аминокислотных последовательностей.

## Основные фичи

- Цветовая схема — каждая аминокислота подсвечена согласно её физико-химическому классу;
- Подсветка различий — во второй строке визуализации фон получают только символы, отличающиеся от первой;
- Валидация ввода;
- Нативный поиск через Ctrl/Cmd + F;
- Динамический перенос строк;
- Авто-копирование выделенного фрагмента.

## Запуск проекта

1. Клонируйте проект

```bash
git clone https://github.com/AliceHab/amino.git
```

2. Перейдите в директорию проекта

```bash
cd amino
```

3. Установите зависимости

```bash
npm install
```

4. Запустите проект

```bash
npm run dev
```

5. Откройте http://localhost:5173 

## Используемые технологии

| Категория                | Стек                                      |
| ------------------------ | ----------------------------------------- |
| UI-фреймворк             | **React 19**, **TypeScript 5**            |
| Сборка                   | **Vite**                                  |
| Компонентная библиотека  | **Material UI v5**, **notistack** (toast) |
| Деплой                   | **gh-pages** + GitHub Actions             |

## Контакты

email: maksim.efremof@gmail.com  
tg: https://t.me/areyoubaka