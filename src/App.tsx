
import { QueryClient, QueryClientProvider } from "react-query";
import CssBaseline from "@mui/material/CssBaseline";
import AppRoutes from "./routes/Route";

const queryClient = new QueryClient();

const App  = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <AppRoutes />
    </QueryClientProvider>
  );
};

export default App;
