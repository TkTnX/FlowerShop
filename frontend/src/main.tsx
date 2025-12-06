import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./shared/styles";
import { Route, Routes } from "react-router-dom";
import { Header } from "./widgets";
import { Providers } from "./shared";
import { Homepage, ProductPage } from "./pages";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop/:productId" element={<ProductPage />} />
        </Routes>
      </main>
    </Providers>
  </StrictMode>
);
