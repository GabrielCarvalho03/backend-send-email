"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/https/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);
var import_fastify = __toESM(require("fastify"));
var import_cors = __toESM(require("@fastify/cors"));

// src/routes/email/email.ts
var import_fastify_mailer = __toESM(require("fastify-mailer"));

// src/routes/email/emailOptions.ts
var emailOptions = (props) => {
  return {
    from: "bookease5@gmail.com",
    to: props.email,
    subject: "Reserva foi confirmada!",
    html: `
          <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
              <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #333;">Bem-vindo ao BookEase!</h2>
                <p>Ol\xE1, ${props.name}!</p>
                <p>Estamos muito felizes em t\xEA-lo conosco. Obrigado por se juntar \xE0 nossa comunidade!</p>
                <p>Com o BookEase, voc\xEA pode facilmente reservar suas viagens e estadias com apenas alguns cliques.</p>
                <p>Se voc\xEA tiver alguma d\xFAvida ou precisar de assist\xEAncia, n\xE3o hesite em nos contatar.</p>
                <br></br>
                <p>Seu c\xF3digo de estadia \xE9 :</p>
                 <br></br>
                    <p style="font-weigth:600 ; font-size:22px; text-align:center" >74367834</p>
                    <br></br>
                <p>Atenciosamente,<br>Equipe BookEase</p>
                <hr style="border: none; border-top: 1px solid #ddd;">
                <p style="font-size: 0.9em; color: #555;">Este \xE9 um email autom\xE1tico, por favor, n\xE3o responda.</p>
              </div>
            </body>
          </html>
        `
  };
};

// src/env/index.ts
var import_dotenv = require("dotenv");
var import_zod = require("zod");
if (process.env.NODE_ENV === "test") {
  (0, import_dotenv.config)({ path: ".env.test" });
} else {
  (0, import_dotenv.config)();
}
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["dev", "production", "test"]),
  EMAIL_PROVIDER: import_zod.z.string(),
  PASSWORD_EMAIL_PROVIDER: import_zod.z.string()
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.log("erro no env", _env.error);
  throw new Error("Erro no env");
}
var env = _env.data;

// src/routes/email/transport.ts
var TransportEmail = () => {
  return {
    transport: {
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: env.EMAIL_PROVIDER,
        pass: env.PASSWORD_EMAIL_PROVIDER
      }
    }
  };
};

// src/routes/email/email.ts
var Email = async (app2) => {
  app2.register(import_fastify_mailer.default, TransportEmail);
  app2.post("/send-email/:name/:email", async (resquest) => {
    const { name, email } = resquest.params;
    const emailOptionsWithName = emailOptions({ name, email });
    try {
      await app2.mailer.sendMail(emailOptionsWithName);
      return { message: "Email enviado com sucesso" };
    } catch (error) {
      console.log(error);
      return { message: "Falha ao enviar email" };
    }
  });
};

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/routes/post/post.ts
var import_zod2 = require("zod");
var Post = async (app2) => {
  app2.get("/post", async (request, reply) => {
    const post = await prisma.post.findMany();
    return {
      post
    };
  });
  app2.post("/post", async (request, reply) => {
    const createPostSchema = import_zod2.z.object({
      title: import_zod2.z.string(),
      subtitle: import_zod2.z.string().optional(),
      photo: import_zod2.z.string()
    });
    const { photo, title, subtitle } = createPostSchema.parse(request.body);
    try {
      const res = await prisma.post.create({
        data: {
          title,
          subtitle,
          photo
        }
      });
      return { message: "Post created successfully", post: res };
    } catch (err) {
      console.log(err);
    }
  });
  app2.delete("/post/:id", async (request, reply) => {
    const { id } = request.params;
    try {
      const res = await prisma.post.delete({
        where: {
          id
        }
      });
      return { message: "Post deleted successfully", post: res };
    } catch (err) {
      console.log(err);
    }
  });
};

// src/https/app.ts
var app = (0, import_fastify.default)();
app.register(import_cors.default, {
  origin: "*"
});
app.register(Email);
app.register(Post);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
