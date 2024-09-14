import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    mailer: {
      sendMail: (options: any) => Promise<any>;
    };
  }
}

declare module "fastify-mailer" {
  import { FastifyPluginCallback } from "fastify";

  interface MailerOptions {
    transport: {
      host: string;
      port: number;
      secure: boolean;
      auth: {
        user: string;
        pass: string;
      };
    };
  }

  const fastifyMailer: FastifyPluginCallback<MailerOptions>;
  export default fastifyMailer;
}