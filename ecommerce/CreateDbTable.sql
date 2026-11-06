-- ============================================
-- CREATE DATABASE (run separately in psql)
-- ============================================
-- CREATE DATABASE ecommerce;

-- ============================================
-- DROP EXISTING TABLES (for clean setup)
-- ============================================
DROP TABLE IF EXISTS public.comment CASCADE;
DROP TABLE IF EXISTS public.review CASCADE;
DROP TABLE IF EXISTS public.sale_order_item CASCADE;
DROP TABLE IF EXISTS public.sale_order CASCADE;
DROP TABLE IF EXISTS public.member CASCADE;
DROP TABLE IF EXISTS public.member_role CASCADE;
DROP TABLE IF EXISTS public.product CASCADE;

-- ============================================
-- CREATE TABLES (Pre-existing schema)
-- ============================================

CREATE TABLE public.member_role (
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(25)
);

CREATE TABLE public.member (
    id SERIAL PRIMARY KEY,
    username CHARACTER VARYING(50) NOT NULL UNIQUE,
    email CHARACTER VARYING(50) NOT NULL UNIQUE,
    dob DATE NOT NULL,
    password CHARACTER VARYING(255) NOT NULL,
    role INTEGER NOT NULL,
    gender CHARACTER(1) NOT NULL,
    CONSTRAINT fk_member_role_id FOREIGN KEY (role) REFERENCES public.member_role(id)
);

CREATE TABLE public.product (
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(255),
    description TEXT,
    unit_price NUMERIC NOT NULL,
    stock_quantity NUMERIC DEFAULT 0 NOT NULL,
    country CHARACTER VARYING(100),
    product_type CHARACTER VARYING(50),
    image_url CHARACTER VARYING(255) DEFAULT '/images/product.png',
    manufactured_on TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE public.sale_order (
    id SERIAL PRIMARY KEY,
    member_id INTEGER,
    order_datetime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    status CHARACTER VARYING(10),
    CONSTRAINT fk_sale_order_member FOREIGN KEY (member_id) REFERENCES public.member(id)
);

CREATE TABLE public.sale_order_item (
    id SERIAL PRIMARY KEY,
    sale_order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity NUMERIC NOT NULL,
    CONSTRAINT fk_sale_order_item_sale_order FOREIGN KEY (sale_order_id) REFERENCES public.sale_order(id),
    CONSTRAINT fk_sale_order_item_product FOREIGN KEY (product_id) REFERENCES public.product(id)
);

-- ============================================
-- NEW TABLES: Review & Comment (Student Task)
-- ============================================

CREATE TABLE public.review (
    id SERIAL PRIMARY KEY,
    member_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_review_member FOREIGN KEY (member_id) REFERENCES public.member(id),
    CONSTRAINT fk_review_product FOREIGN KEY (product_id) REFERENCES public.product(id)
);

CREATE TABLE public.comment (
    id SERIAL PRIMARY KEY,
    review_id INTEGER NOT NULL,
    member_id INTEGER NOT NULL,
    parent_comment_id INTEGER DEFAULT NULL,  -- supports nested/reply comments
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    CONSTRAINT fk_comment_review FOREIGN KEY (review_id) REFERENCES public.review(id) ON DELETE CASCADE,
    CONSTRAINT fk_comment_member FOREIGN KEY (member_id) REFERENCES public.member(id),
    CONSTRAINT fk_comment_parent FOREIGN KEY (parent_comment_id) REFERENCES public.comment(id) ON DELETE CASCADE
);