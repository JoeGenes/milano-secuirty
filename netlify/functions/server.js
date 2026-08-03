import serverless from 'serverless-http';
import { app, handler as existingHandler } from '../../netilify/functions/server.js';

export const handler = existingHandler || serverless(app);
