import { FastifyInstance } from "fastify";
import fastifyMailer from "fastify-mailer";
import { emailOptions } from "./emailOptions";
import { TransportEmail } from "./transport";

export const Email = async (app: FastifyInstance) => {
  app.register(fastifyMailer, TransportEmail);

  app.post("/send-email/:name/:email", async (resquest) => {
    const { name, email } = resquest.params as { name: string, email: string };
    const emailOptionsWithName = emailOptions({ name,  email});

    try {
      await app.mailer.sendMail(emailOptionsWithName);
      return { message: "Email enviado com sucesso" };
    } catch (error) {
      console.log(error);
      return { message: "Falha ao enviar email" };
    }
  });
};
