## Что за проект
- Backend: Django 5.2 + DRF, TokenAuthentication, CORS (разрешено `http://localhost:5173`/`127.0.0.1:5173`), SQLite, статика/медиа в `uploads/`, кастомная модель пользователя `user.User`. Подключены приложения `product`, `review`, `user`, `cart`, `cartItem`, `favoriteItem`.
- Frontend: React + TypeScript (Vite), React Router, TanStack Query, axios с интерцептором токена, react-hook-form + zod, react-toastify. Базовый URL для API берётся из `VITE_PUBLIC_SERVER_URL`.
- Статика фронта в `frontend/public`, стили CSS по блокам.

## Маршруты фронтенда (React Router)
```
26:43:frontend/src/main.tsx
<Route path="/" element={<Homepage />} />
<Route path="/shop/:productId" element={<ProductPage />} />
<Route path="/auth/register" element={<RegisterPage />} />
<Route path="/auth/login" element={<LoginPage />} />
<Route path="/profile" element={<ProfileLayout />}>
  <Route index element={<ProfilePage />} />
  <Route path="/profile/info" element={<ProfileInfoPage />} />
  <Route path="/profile/reviews" element={<ProfileReviewsPage />} />
  <Route path="/profile/favorites" element={<ProfileFavoritesPage />} />
</Route>
<Route path="/shop" element={<ShopPage />} />
<Route path="/cart" element={<CartPage />} />
<Route path="*" element={<NotFoundPage />} />
```

## Основные API (Django)
Базовые префиксы смотрим в `backend/urls.py`: `admin/`, `products/`, `auth/` (стандартные Django auth-views), `reviews/`, `users/`, `cart/`, `cart-items/`, `favorites/`.
```
22:31:backend/backend/urls.py
path('products/', include("product.urls"))
path("auth/", include("django.contrib.auth.urls"))
path("reviews/", include("review.urls"))
path("users/", include('user.urls'))
path("cart/", include("cart.urls"))
path('cart-items/', include('cartItem.urls'))
path('favorites/', include('favoriteItem.urls'))
```

### Пользователи (`users/`)
- `POST /users/auth/register/` — регистрация, создаёт пользователя, выдаёт token, создаёт корзину.
- `POST /users/auth/login/` — логин, возвращает token.
- `GET /users/me/` — данные текущего пользователя (требует токен).
- `PATCH /users/edit/` — частичное редактирование профиля + загрузка аватара (multipart).

### Продукты (`products/`)
- `GET /products/` — список с query-параметрами `orderBy`, `title` (фильтр по названию).
- `GET /products/<id>/` — один продукт.

### Отзывы (`reviews/`)
- `GET /reviews/` — последние 4 отзыва.
- `GET /reviews/user-reviews/` — отзывы текущего пользователя (требует токен).
- `GET /reviews/<productId>/` — все отзывы товара.
- `POST /reviews/<productId>/create/` — создать отзыв (требует токен), пересчитывает рейтинг товара.
- `DELETE /reviews/<review_id>/delete/` — удалить отзыв (проверка владельца).

### Корзина (`cart/`, `cart-items/`)
- `GET /cart/` — корзина текущего пользователя (требует токен).
- `POST /cart-items/add/` — добавить товар (productId), авто-инкремент если уже есть.
- `PATCH /cart-items/quantity/` — `action: plus|minus`, `cartItemId`, пересчёт totalPrice.
- `DELETE /cart-items/delete/<cartItemId>/` — удалить позицию.
- `DELETE /cart-items/clear/` — очистить корзину.

### Избранное (`favorites/`)
- `POST /favorites/<productId>/` — переключить избранное для текущего пользователя (требует токен).

## Модели данных (главное)
- `Product`: `title`, `price`, `description`, `rating (1-5)`, связанные `images` (`ProductImage.image`), `reviews`.
- `Review`: `text`, `rating(1-5)`, `user`, `product`, `created_at`.
- `User` (кастомный `AbstractUser`): поля `avatar`, `phone`, `gender`, `address`.
- `Cart`: `user`, `totalPrice`; `cartItems` (FK).
- `CartItem`: `product`, `quantity`, `cart`.
- `FavoriteItem`: `product`, `user`.

## Как фронт использует API
- axios настроен с `baseURL` и добавляет заголовок `Authorization: Token <token>` из `localStorage`.
- TanStack Query тянет данные: товары (`/products`), товар (`/products/:id`), корзина (`/cart/`), пользователь (`/users/me`), отзывы (`/reviews`, `/reviews/user-reviews/`).
- Мутации: регистрация/логин, добавление в корзину/избранное, изменение количества/удаление/очистка корзины, добавление отзыва, редактирование профиля (FormData).
- Формы: react-hook-form + zod-схемы для auth, профиля, отзыва.

## Где смотреть дальше
- Настройки DRF/CORS/БД: `backend/backend/settings.py`.
- Сериализаторы и бизнес-логика: `backend/*/serializers.py`, `backend/*/views.py`.
- Переменная окружения фронта: `frontend/.env` (нужно создать) с `VITE_PUBLIC_SERVER_URL=http://localhost:8000/` (пример).
- Команды: backend `python manage.py runserver`, фронт `npm install && npm run dev` из `frontend`.