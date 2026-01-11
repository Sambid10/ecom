import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders } from "next/headers";
import * as z from "zod"
import { generateAuthCookie } from "../utils/cookie";
export const authRouter = createTRPCRouter({
    session: baseProcedure.query(async ({ ctx }) => {
        const headers = await getHeaders()
        const session = await ctx.payload.auth({ headers })
        return session
    }),
    register: baseProcedure.input(
        z.object({
            email: z.email(),
            password: z.string(),
            username: z.string().min(3, "Username must be atlesat 3 characters")
                .max(40, "Username must be less than 40 characters")
                .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, "Username can only contin lowercase,numbers and hyphens")
                .refine(
                    (val) => !val.includes("--"), "Username cannot contain --"
                ).transform((val) => val.toLowerCase())
        })
    ).mutation(async ({ input, ctx }) => {
        const exisitingData = await ctx.payload.find({
            collection: "users",
            limit: 1,
            where: {
                username: {
                    equals: input.username
                }
            }
        })
        const exisitingUsername = exisitingData.docs[0]
        if (exisitingUsername) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Username already taken"
            })
        }
        const existingEmail = await ctx.payload.find({
            collection: "users",
            limit: 1,
            where: { email: { equals: input.email } },
        });

        if (existingEmail.docs.length > 0) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Email already taken",
            });
        }

        await ctx.payload.create({
            collection: "users",
            data: {
                email: input.email,
                username: input.username,
                password: input.password
            }
        })

        const data = await ctx.payload.login({
            collection: "users",
            data: {
                email: input.email,
                password: input.password
            }
        })
        if (!data.token) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "failed to login"
            })
        }
        await generateAuthCookie({
            prefix: ctx.payload.config.cookiePrefix,
            value: data.token
        })
    }),
    login: baseProcedure.input(
        z.object({
            email: z.email(),
            password: z.string()
        })
    ).mutation(async ({ ctx, input }) => {
        const data = await ctx.payload.login({
            collection: "users",
            data: {
                email: input.email,
                password: input.password
            }
        })
        if (!data.token) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "failed to login"
            })
        }
        await generateAuthCookie({
            prefix: ctx.payload.config.cookiePrefix,
            value: data.token
        })
        return data

    }),
})