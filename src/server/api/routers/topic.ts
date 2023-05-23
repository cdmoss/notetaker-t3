import { z } from "zod";
import { type PrismaPromise, type Topic } from "@prisma/client";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const topicRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }): PrismaPromise<Topic[]> => {
    return ctx.prisma.topic.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.topic.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),
});
