-- Drop and create Brands Table
DROP TABLE IF EXISTS public.brands CASCADE;
CREATE TABLE public.brands (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL,
  CONSTRAINT brands_pkey PRIMARY KEY (id),
  CONSTRAINT brands_slug_key UNIQUE (slug)
);

-- Drop and create Categories Table
DROP TABLE IF EXISTS public.categories CASCADE;
CREATE TABLE public.categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL,
  CONSTRAINT categories_pkey PRIMARY KEY (id),
  CONSTRAINT categories_slug_key UNIQUE (slug)
);

-- Drop and create Orders Table
DROP TABLE IF EXISTS public.orders CASCADE;
CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  "user" uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  shipping_price numeric NOT NULL,
  order_price numeric NOT NULL,
  delivery_method text NOT NULL,
  payment_method text NOT NULL,
  items_ids uuid[] NOT NULL,
  products_list jsonb NULL,
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_user_fkey FOREIGN KEY ("user") REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE SET NULL
);

-- Drop and create Products Table
DROP TABLE IF EXISTS public.products CASCADE;
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  stock_quantity bigint NOT NULL,
  sale_price numeric NULL,
  sale_end_date date NULL,
  sizes bigint[] NOT NULL,
  colors text[] NOT NULL,
  images text[] NOT NULL,
  material text NOT NULL,
  slug text NOT NULL,
  brand uuid NOT NULL,
  category uuid NOT NULL,
  CONSTRAINT products_pkey PRIMARY KEY (id),
  CONSTRAINT products_slug_key UNIQUE (slug),
  CONSTRAINT products_brand_fkey FOREIGN KEY (brand) REFERENCES brands(id) ON UPDATE CASCADE,
  CONSTRAINT products_category_fkey FOREIGN KEY (category) REFERENCES categories(id) ON UPDATE CASCADE
);