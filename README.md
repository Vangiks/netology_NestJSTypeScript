# Дипломная работа по курсу Нетологии-NestJS-TypeScript

## Переменные окружения:

Переменные окружения можно указать в .env файле и в файле docker-compose:
PORT=
DATABASE_PATH=
JWT_SECRET_TOKEN=
JWT_EXPIRATION_TIME=

Пример (для .env файла):
DATABASE_PATH=mongodb://root:example@127.0.0.1:27017/
PORT=3000
JWT_SECRET_TOKEN=123
JWT_EXPIRATION_TIME=1d

## 1. Запуск проекта

Для запуска проекта необходимо:

- Через Docker

1. Указать переменные окружения: 
DATABASE_PATH=mongodb://root:example@mongo:27017/, а остальные указать можно как в примере.
2. "docker-compose up -d" - для запуск контейнеров MongoDB, Mongo-Express и Backend.

- Через npm
1. В файле docker-compose закомментировать контейнер "backend".
2. yarn - установка зависимостей.
3. yarn build - произвести сборку проекта.
4. yarn start:prod - запуск сборки проекта.

## 2. Тестирование/проверка WebSockets

Для тестирования/проверки WS можно использовать index.html в папке "public":
1. В переменную "token" надо указать access_token, который можно получить после авторизации.
2. В переменную "chatId" надо указать id support-request.
