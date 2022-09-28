import { cp } from 'fs';

cp('src/views', 'dist/src/views', { recursive: true }, () => {});
