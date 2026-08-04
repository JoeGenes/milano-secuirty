import { app, handler } from './netlify/functions/server.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT || 3001);

if (!process.env.NETLIFY && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
  app.listen(PORT, () => {
    console.log(`[Milano Security Server] API Server running on http://localhost:${PORT}`);
  });
}

export { app, handler };
export { buildFallbackMailto } from './netlify/functions/server.js';

