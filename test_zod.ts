import { z } from "zod"; try { z.string().parse(123); } catch (e: any) { console.log("errors:", e.errors); console.log("issues:", e.issues); }
