import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
    PORT: z.string().default('3000'),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

const _env = EnvSchema.safeParse(process.env);
if (!_env.success) {
    console.error('❌ Invalid environment variables', _env.error.flatten().fieldErrors);
    process.exit(1);
}

export const env = _env.data;
