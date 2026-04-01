import app from './src/app.ts';
import { env } from './src/config/env.ts';
import logger from './src/config/logger.ts';

const PORT = env.PORT;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
