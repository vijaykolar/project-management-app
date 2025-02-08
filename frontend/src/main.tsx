import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NuqsAdapter } from "nuqs/adapters/react";
import { ThemeProvider } from "@/components/theme-provider";

import "./index.css";
import App from "./App.tsx";
import QueryProvider from "./context/query-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryProvider>
        <NuqsAdapter>
          <App />
        </NuqsAdapter>
        <Toaster />
      </QueryProvider>
    </ThemeProvider>
  </StrictMode>
);
