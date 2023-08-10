import { z } from "zod";

const cardNumberRegex = '\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b'

export const PersonalnfoSchema = z.object({
	name: z.string({ required_error: "Name is required" }).min(1),
	email: z.string().email({ message: "Please provide a valid email" }),
	password: z.string(),
	confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, { message: "Passwords don't match!", path: ["confirmPassword"]});

export type PersonalInfo = z.infer<typeof PersonalnfoSchema>;

// Delivery form
export const DeliveryInfoSchema = z.object({
	city: z.string().min(1),
	postalCode: z.string(),
	address: z.string(),
	shipping: z.enum(["free", "fast", "same_day"]),
});

export type DeliveryInfo = z.infer<typeof DeliveryInfoSchema>;

// Payment form

export const PaymentInfoSchema = z.object({
	number: z.string().regex(/\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/),
	expirationDate: z
		.string()
		.regex(/^(0[1-9]|1[0-2])\/\d{4}$/)
		.refine(
			(val) => {
				let [month, year] = val.split("/");
				let date = new Date(parseInt(year), parseInt(month) - 1);
				return date > new Date();
			},
			{ message: "Card is expired" },
		),
	securityCode: z.coerce.number().gte(100).lte(999),
	saveInfo: z.boolean(),
});

export type PaymentInfo = z.infer<typeof PaymentInfoSchema>;

export const CheckoutInfoSchema =
	DeliveryInfoSchema.merge(PersonalnfoSchema).merge(PaymentInfoSchema);

export type CheckoutData = z.infer<typeof CheckoutInfoSchema>;
