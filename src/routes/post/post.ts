import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export const Post = async (app: FastifyInstance) => {
  app.get("/post", async (request, reply) => {
    const post = await prisma.post.findMany();
    return {
      post,
    };
  });

  app.post("/post", async (request, reply) => {
    const createPostSchema = z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      photo: z.string(),
    });

    const { photo, title, subtitle } = createPostSchema.parse(request.body);

    try {
      const res = await prisma.post.create({
        data: {
          title,
          subtitle,
          photo,
        },
      });

      return { message: "Post created successfully", post: res };
    } catch (err) {
      console.log(err);
    }
  });

  app.delete("/post/:id", async (request, reply) => {
    //@ts-ignore
    const { id } = request.params;
    try {
      const res = await prisma.post.delete({
        where: {
          id,
        },
      });

      return { message: "Post deleted successfully", post: res };
    } catch (err) {
      console.log(err);
    }
  });
};
