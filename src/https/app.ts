import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { Email } from "../routes/email/email";
import { Post } from "@/routes/post/post";

export const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.register(Email);
app.register(Post);
