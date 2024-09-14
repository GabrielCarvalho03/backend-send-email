"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/post/post.ts
var post_exports = {};
__export(post_exports, {
  Post: () => Post
});
module.exports = __toCommonJS(post_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/routes/post/post.ts
var import_zod = require("zod");
var Post = async (app) => {
  app.get("/post", async (request, reply) => {
    const post = await prisma.post.findMany();
    return {
      post
    };
  });
  app.post("/post", async (request, reply) => {
    const createPostSchema = import_zod.z.object({
      title: import_zod.z.string(),
      subtitle: import_zod.z.string().optional(),
      photo: import_zod.z.string()
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
  app.delete("/post/:id", async (request, reply) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Post
});
