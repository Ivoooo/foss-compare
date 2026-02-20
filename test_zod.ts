import { z, ZodError } from "zod"; try { z.string().parse(123); } catch (e: unknown) { if (e instanceof ZodError) { console.log("issues:", e.issues); } }
