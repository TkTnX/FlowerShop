import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};
