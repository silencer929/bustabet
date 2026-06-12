import { z } from 'zod';

//#region src/lib/utils/validation.ts
var loginSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(6, "Password must be at least 6 characters")
});
var registerSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	username: z.string().min(3, "Username must be at least 3 characters").regex(/^[a-zA-Z0-9_]+$/, "Alphanumerics and underscores only"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	fullName: z.string().min(2, "Full name is required"),
	phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone format (E.164 required)"),
	country: z.string().min(2, "Country selection is required"),
	currency: z.enum([
		"KES",
		"NGN",
		"GHS",
		"TZS",
		"UGX",
		"ZAR",
		"USD"
	]),
	referralCode: z.string().optional()
});
z.object({
	amount: z.number().positive("Deposit amount must be greater than zero"),
	reference: z.string().min(4, "Transaction reference is required")
});

export { loginSchema as l, registerSchema as r };
//# sourceMappingURL=validation-COmr84X5.js.map
