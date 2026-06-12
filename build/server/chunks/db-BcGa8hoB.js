import { PrismaClient } from '@prisma/client';

var db = globalThis.prisma ?? new PrismaClient({ log: ["error"] });

export { db as d };
//# sourceMappingURL=db-BcGa8hoB.js.map
