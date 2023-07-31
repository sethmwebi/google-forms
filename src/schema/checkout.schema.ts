import { z } from "zod"

export const PersonalnfoSchema = z.object({
	name: z.string().min(1),
	email: z.string().email({ message: "Please provide a valid email"})
})

export type PersonalInfo = z.infer<typeof PersonalnfoSchema>;
