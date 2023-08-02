import { z } from "zod"

export const PersonalnfoSchema = z.object({
	name: z.string().min(1),
	email: z.string().email({ message: "Please provide a valid email"})
})

export type PersonalInfo = z.infer<typeof PersonalnfoSchema>;

// Delivery form
export const DeliveryInfoSchema = z.object({
	city: z.string().min(1),
	postalCode: z.string(),
	shipping: z.enum(['free', 'fast', 'same_day'])
})

export type DeliveryInfo = z.infer<typeof DeliveryInfoSchema>;

// Payment form

export const PaymentInfoSchema = z.object({
	number: z.string(),
	expirationDate: z.string(),
	securityCode: z.string(),
	saveInfo: z.boolean()
});

export type PaymentInfo = z.infer<typeof PaymentInfoSchema>;
