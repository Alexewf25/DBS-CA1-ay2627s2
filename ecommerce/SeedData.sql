-- ============================================
-- SEED: member_role
-- ============================================
INSERT INTO public.member_role (id, name) VALUES
(1, 'ADMIN'),
(2, 'USER');

SELECT setval('public.member_role_id_seq', 2, true);

-- ============================================
-- SEED: member
-- Passwords are bcrypt hashes of 'Password1!'
-- ============================================
INSERT INTO public.member (id, username, email, dob, password, role, gender) VALUES
(1,  'admin',        'admin@shop.com',        '1985-03-15', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 'M'),
(2,  'johnsmith',    'john@example.com',      '1995-06-20', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, 'M'),
(3,  'janetaylor',   'jane@example.com',      '1998-11-05', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, 'F'),
(4,  'mikewong',     'mike@example.com',      '1990-02-28', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, 'M'),
(5,  'sarahlee',     'sarah@example.com',     '2000-07-14', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, 'F'),
(6,  'davidtan',     'david@example.com',     '1993-09-30', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, 'M'),
(7,  'emilychua',    'emily@example.com',     '1997-04-18', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, 'F'),
(8,  'ryanng',       'ryan@example.com',      '1988-12-01', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, 'M'),
(9,  'lisamei',      'lisa@example.com',      '2002-08-22', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, 'F'),
(10, 'tomkoh',       'tom@example.com',       '1991-01-10', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, 'M'),
(11, 'nancylim',     'nancy@example.com',     '1996-05-25', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, 'F'),
(12, 'kevinoh',      'kevin@example.com',     '1983-10-08', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, 'M'),
(13, 'gracetan',     'grace@example.com',     '1999-03-17', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, 'F'),
(14, 'bennylow',     'benny@example.com',     '1987-07-04', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 2, 'M');

SELECT setval('public.member_id_seq', 14, true);

-- ============================================
-- SEED: product (Stainless Steel Bottles)
-- ============================================
INSERT INTO public.product (id, name, description, unit_price, stock_quantity, country, product_type, image_url, manufactured_on) VALUES
(1,  'HydroMax Classic 500ml',         'A sleek 500ml single-wall stainless steel bottle, perfect for everyday hydration. Lightweight and durable with a leak-proof lid.',                                          18.90,  150, 'Singapore', 'Classic Bottle',     '/images/product.png', '2024-01-15 08:00:00'),
(2,  'HydroMax Insulated 750ml',       'Double-wall vacuum insulated 750ml bottle. Keeps drinks cold for 24 hours and hot for 12 hours. Features a wide-mouth opening for easy filling.',                         34.90,  120, 'Singapore', 'Insulated Bottle',   '/images/product.png', '2024-02-10 09:00:00'),
(3,  'HydroMax Pro 1 Litre',           'Heavy-duty 1-litre insulated bottle designed for outdoor adventures. BPA-free, sweat-proof exterior and includes a carabiner clip.',                                      42.90,   80, 'Singapore', 'Insulated Bottle',   '/images/product.png', '2024-03-05 10:00:00'),
(4,  'HydroMax Slim 350ml',            'Compact and slim 350ml bottle that fits in most cup holders and bags. Ideal for children and commuters. Available in brushed steel finish.',                               15.90,  200, 'Japan',     'Classic Bottle',     '/images/product.png', '2024-01-20 08:30:00'),
(5,  'HydroMax Sport 600ml',           'Ergonomic 600ml sports bottle with a flip-top straw lid. Insulated to keep drinks cold during intense workouts. Includes a non-slip grip sleeve.',                        38.90,   95, 'South Korea','Sports Bottle',     '/images/product.png', '2024-04-01 11:00:00'),
(6,  'HydroMax Tumbler 480ml',         'Wide-mouth 480ml tumbler with a sliding lid. Perfect for coffee, tea or cold beverages. Fits standard car cup holders.',                                                  29.90,  110, 'Singapore', 'Tumbler',            '/images/product.png', '2024-02-28 09:30:00'),
(7,  'HydroMax Kids 300ml',            'Fun and colourful 300ml bottle designed for kids. Lightweight, BPA-free and features a secure push-button lid to prevent spills.',                                        14.90,  180, 'Japan',     'Kids Bottle',        '/images/product.png', '2024-03-15 08:00:00'),
(8,  'HydroMax Infuser 600ml',         '600ml bottle with a built-in fruit infuser basket. Stainless steel body with a removable infuser rod. Great for flavoured water and detox drinks.',                       36.90,   70, 'South Korea','Infuser Bottle',    '/images/product.png', '2024-04-10 10:30:00'),
(9,  'HydroMax Flask 250ml',           'Compact 250ml hip flask-style bottle. Fits easily in a jacket pocket. Double-wall insulated to keep espresso or spirits at the right temperature.',                       22.90,   60, 'Germany',   'Flask',              '/images/product.png', '2024-01-30 07:00:00'),
(10, 'HydroMax Straw Bottle 700ml',    '700ml bottle with a built-in straw and carry handle. Insulated for all-day freshness. Ideal for hiking, cycling and outdoor activities.',                                 39.90,   85, 'Singapore', 'Sports Bottle',      '/images/product.png', '2024-05-01 09:00:00'),
(11, 'HydroMax Matte Black 500ml',     'Stylish matte black 500ml insulated bottle with a powder-coated finish. Keeps drinks cold for 24 hours. A popular choice for office and gym use.',                       32.90,  130, 'Singapore', 'Insulated Bottle',   '/images/product.png', '2024-03-20 08:00:00'),
(12, 'HydroMax Pastel Series 500ml',   'Limited edition 500ml bottle in pastel colour tones. Double-wall insulated with a soft-touch exterior. Comes in pink, mint and lavender.',                               33.90,  100, 'Japan',     'Insulated Bottle',   '/images/product.png', '2024-04-15 10:00:00'),
(13, 'HydroMax Collapsible 500ml',     'Innovative collapsible 500ml bottle made from food-grade stainless steel panels. Folds flat when empty for easy storage. Great for travel.',                             45.90,   50, 'Germany',   'Travel Bottle',      '/images/product.png', '2024-05-10 11:00:00'),
(14, 'HydroMax Filtered 800ml',        '800ml bottle with an integrated carbon filter that removes chlorine and impurities. Ideal for travel and outdoor use where water quality is uncertain.',                   55.90,   40, 'Germany',   'Filtered Bottle',    '/images/product.png', '2024-02-05 09:00:00'),
(15, 'HydroMax Corporate 500ml',       'Premium 500ml corporate gift bottle with laser-engraving-ready surface. Comes in a gift box. Minimum order of 10 units for custom engraving.',                           28.90,  250, 'Singapore', 'Corporate Gift',     '/images/product.png', '2024-01-10 08:00:00'),
(16, 'HydroMax Titanium 600ml',        'Ultra-lightweight 600ml bottle made from aerospace-grade titanium-coated stainless steel. Exceptionally durable and corrosion-resistant.',                               89.90,   30, 'Japan',     'Premium Bottle',     '/images/product.png', '2024-06-01 10:00:00'),
(17, 'HydroMax Brew Bottle 500ml',     '500ml bottle with a built-in tea strainer. Brew loose-leaf tea directly in the bottle. Double-wall insulated to maintain the perfect steeping temperature.',              37.90,   75, 'South Korea','Tea Bottle',        '/images/product.png', '2024-03-25 09:30:00'),
(18, 'HydroMax Protein Shaker 700ml',  '700ml shaker bottle with a stainless steel mixing ball. Leak-proof and odour-resistant. Ideal for protein shakes and pre-workout drinks.',                               31.90,   90, 'Singapore', 'Sports Bottle',      '/images/product.png', '2024-04-20 08:30:00'),
(19, 'HydroMax Narrow Mouth 1 Litre',  '1-litre narrow-mouth bottle for easy sipping without a straw. Insulated with a durable stainless steel exterior. Includes a loop cap for carrying.',                     44.90,   65, 'Germany',   'Insulated Bottle',   '/images/product.png', '2024-05-15 10:00:00'),
(20, 'HydroMax Bamboo Cap 500ml',      '500ml insulated bottle with a sustainable bamboo lid. Eco-friendly design combining stainless steel durability with natural bamboo aesthetics.',                          35.90,  115, 'Singapore', 'Eco Bottle',         '/images/product.png', '2024-06-10 09:00:00');

SELECT setval('public.product_id_seq', 20, true);

-- ============================================
-- SEED: sale_order
-- ============================================
INSERT INTO public.sale_order (id, member_id, order_datetime, status) VALUES
(1,  2,  '2025-01-05 10:30:00', 'COMPLETED'),
(2,  3,  '2025-01-08 14:15:00', 'COMPLETED'),
(3,  4,  '2025-01-12 09:00:00', 'COMPLETED'),
(4,  5,  '2025-01-15 16:45:00', 'COMPLETED'),
(5,  6,  '2025-01-20 11:00:00', 'COMPLETED'),
(6,  7,  '2025-01-22 13:30:00', 'COMPLETED'),
(7,  8,  '2025-02-01 10:00:00', 'COMPLETED'),
(8,  9,  '2025-02-05 15:00:00', 'COMPLETED'),
(9,  10, '2025-02-10 09:30:00', 'COMPLETED'),
(10, 11, '2025-02-14 12:00:00', 'COMPLETED'),
(11, 12, '2025-02-18 14:00:00', 'COMPLETED'),
(12, 13, '2025-02-22 10:30:00', 'COMPLETED'),
(13, 14, '2025-02-25 16:00:00', 'COMPLETED'),
(14, 2,  '2025-03-01 11:00:00', 'COMPLETED'),
(15, 3,  '2025-03-05 13:00:00', 'COMPLETED'),
(16, 4,  '2025-03-10 09:00:00', 'PACKING'),
(17, 5,  '2025-03-12 14:30:00', 'PACKING'),
(18, 6,  '2025-03-15 10:00:00', 'CANCELLED'),
(19, 7,  '2025-03-18 15:00:00', 'COMPLETED'),
(20, 8,  '2025-03-20 11:30:00', 'COMPLETED'),
(21, 2,  '2025-04-01 10:00:00', 'COMPLETED'),
(22, 9,  '2025-04-05 14:00:00', 'COMPLETED'),
(23, 10, '2025-04-08 09:30:00', 'PACKING'),
(24, 11, '2025-04-10 12:00:00', 'COMPLETED'),
(25, 12, '2025-04-15 16:00:00', 'COMPLETED'),
(26, 13, '2025-04-18 10:30:00', 'CANCELLED'),
(27, 14, '2025-04-20 13:00:00', 'COMPLETED'),
(28, 3,  '2025-04-22 11:00:00', 'COMPLETED'),
(29, 5,  '2025-04-25 14:30:00', 'COMPLETED'),
(30, 6,  '2025-04-28 09:00:00', 'COMPLETED'),
(31, 2,  '2025-05-02 10:00:00', 'PACKING');

SELECT setval('public.sale_order_id_seq', 31, true);

-- ============================================
-- SEED: sale_order_item
-- ============================================
INSERT INTO public.sale_order_item (id, sale_order_id, product_id, quantity) VALUES
(1,  1,  1,  2),
(2,  1,  5,  1),
(3,  2,  2,  1),
(4,  2,  7,  3),
(5,  3,  3,  1),
(6,  3,  11, 2),
(7,  4,  4,  4),
(8,  4,  6,  1),
(9,  5,  8,  1),
(10, 5,  12, 2),
(11, 6,  9,  1),
(12, 6,  13, 1),
(13, 7,  10, 2),
(14, 7,  14, 1),
(15, 8,  15, 5),
(16, 8,  1,  1),
(17, 9,  16, 1),
(18, 9,  2,  2),
(19, 10, 17, 1),
(20, 10, 5,  2),
(21, 11, 18, 2),
(22, 11, 6,  1),
(23, 12, 19, 1),
(24, 12, 3,  1),
(25, 13, 20, 2),
(26, 13, 7,  2),
(27, 14, 1,  3),
(28, 14, 11, 1),
(29, 15, 2,  2),
(30, 15, 8,  1),
(31, 16, 4,  2),
(32, 17, 5,  1),
(33, 18, 9,  1),
(34, 19, 10, 3),
(35, 19, 15, 2),
(36, 20, 12, 1),
(37, 20, 16, 1),
(38, 21, 3,  1),
(39, 21, 17, 2),
(40, 22, 6,  2),
(41, 22, 18, 1),
(42, 23, 13, 1),
(43, 24, 14, 1),
(44, 24, 20, 3),
(45, 25, 1,  2),
(46, 25, 4,  1),
(47, 26, 7,  1),
(48, 27, 19, 1),
(49, 27, 2,  1),
(50, 28, 11, 2),
(51, 28, 5,  1);

SELECT setval('public.sale_order_item_id_seq', 51, true);

-- ============================================
-- SEED: review (sample data for testing)
-- ============================================
INSERT INTO public.review (id, member_id, product_id, rating, review_text, created_at, updated_at) VALUES
(1, 2, 1, 5, 'Excellent bottle! Very sturdy and keeps water cold all day.', '2025-01-20 10:00:00', '2025-01-20 10:00:00'),
(2, 3, 2, 4, 'Great insulation. The wide mouth makes it easy to clean.', '2025-01-25 14:00:00', '2025-01-25 14:00:00'),
(3, 4, 3, 5, 'Perfect for hiking. The carabiner clip is very handy.', '2025-01-28 09:00:00', '2025-01-28 09:00:00'),
(4, 5, 4, 3, 'Decent bottle but the lid feels a bit flimsy.', '2025-02-01 11:00:00', '2025-02-01 11:00:00'),
(5, 2, 5, 4, 'Love the flip-top straw. Very convenient at the gym.', '2025-03-15 10:00:00', '2025-03-15 10:00:00'),
(6, 3, 2, 5, 'Bought a second one. Absolutely worth the price.', '2025-03-20 13:00:00', '2025-03-20 13:00:00');

SELECT setval('public.review_id_seq', 6, true);

-- ============================================
-- SEED: comment (sample data for testing)
-- ============================================
INSERT INTO public.comment (id, review_id, member_id, parent_comment_id, comment_text, created_at) VALUES
(1, 1, 3, NULL, 'I agree! I have the same bottle and it is fantastic.', '2025-01-21 09:00:00'),
(2, 1, 4, NULL, 'How long does it actually keep drinks cold?', '2025-01-21 10:30:00'),
(3, 1, 5, 2,    'In my experience, about 20 hours in Singapore weather!', '2025-01-21 11:00:00'),
(4, 2, 2, NULL, 'Does it fit in a standard bag bottle pocket?', '2025-01-26 08:00:00'),
(5, 2, 6, 4,    'Yes it does, I use it with my backpack daily.', '2025-01-26 09:30:00'),
(6, 3, 7, NULL, 'Great review! Is the carabiner clip sold separately?', '2025-01-29 10:00:00');

SELECT setval('public.comment_id_seq', 6, true);