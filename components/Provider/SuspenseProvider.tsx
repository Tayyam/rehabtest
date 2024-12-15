import React from "react";
import Loader from "@/components/shared/Loader/Loader";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";

type Props = { children: React.ReactNode };

function SuspenseProvider({ children }: Props) {
  return (
    <main>
      <Suspense
        fallback={
          <section>
            <Loader />
          </section>
        }
      >
        {children}
        <Toaster />
      </Suspense>
    </main>
  );
}

export default SuspenseProvider;
