"use client"

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";





interface ProviderProps {
  children?: ReactNode;
  session?: Session;
}

const Provider = ({ children, session }: ProviderProps) => (
<SessionProvider session={session}>
  {children}
</SessionProvider>
);

export default Provider;

