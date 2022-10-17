export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    path: process.env.DATABASE_PATH,
  },
  counterBooks: {
    host: process.env.APP_COUNTER_BOOKS_HOST || 'http://localhost:3002',
  },
});
