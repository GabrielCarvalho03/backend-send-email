import { config } from "dotenv";
import { z } from "zod";



if (process.env.NODE_ENV === "test") {
    config({ path: ".env.test" });
  } else {
    config();
  }


const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "production", "test"]),
  EMAIL_PROVIDER: z.string(),
  PASSWORD_EMAIL_PROVIDER: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.log("erro no env", _env.error);

  throw new Error("Erro no env");
}

export const env = _env.data;
