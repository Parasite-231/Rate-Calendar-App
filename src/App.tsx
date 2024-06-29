

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import CssBaseline from "@mui/material/CssBaseline";
import AppRoutes from "./routes/Routes";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <AppRoutes />
    </QueryClientProvider>
  );
};

export default App;
