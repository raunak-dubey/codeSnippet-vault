import { createBrowserLogger } from '@repo/logger';

const logger = createBrowserLogger(process.env.NODE_ENV);

export default logger;
