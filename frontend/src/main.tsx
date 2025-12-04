import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./shared/styles";
import { Header } from "./shared";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </main>
    </BrowserRouter>
  </StrictMode>
);
