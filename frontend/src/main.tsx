import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./shared/styles";
import { Route, Routes } from "react-router-dom";
import { Footer, Header } from "./widgets";
import { Providers } from "./shared";
import {
  CartPage,
  Homepage,
  LoginPage,
  ProductPage,
  ProfileInfoPage,
  ProfilePage,
  ProfileReviewsPage,
  RegisterPage,
  ShopPage,
} from "./pages";
import { ProfileLayout } from "./layouts";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop/:productId" element={<ProductPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<ProfilePage />} />
            <Route path="/profile/info" element={<ProfileInfoPage />} />
            <Route path="/profile/reviews" element={<ProfileReviewsPage />} />
          </Route>
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
      <Footer />
    </Providers>
  </StrictMode>
);
