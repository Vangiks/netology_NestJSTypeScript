require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  yandexClientId: process.env.YANDEX_CLIENT_ID,
  yandexClienSecret: process.env.YANDEX_CLIENT_SECRET,
  yandexCallbackUrl: process.env.YANDEX_CALLBACK_URL,
};

module.exports = config;
