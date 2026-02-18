import { Role } from '@prisma/client';
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: Role;
      companyId: string;
      companyName?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: Role;
    companyId?: string;
    companyName?: string;
  }
}
