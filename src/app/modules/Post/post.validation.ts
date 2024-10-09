import { z } from "zod";

const createpostvalidation = z.object({
    body: z.object({
        title: z.string({ required_error: "Title is required." }),
        content: z.string({ required_error: "Content is required." }),
        category: z.string({ required_error: "Category is required." }),
        premiumContent: z.boolean().optional(),
    }),
});




export const PostValidation = {
    createpostvalidation,
};