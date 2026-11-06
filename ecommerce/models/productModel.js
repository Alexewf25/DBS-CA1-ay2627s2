const { query } = require("../config/database");

const getAllProducts = async () => {
  const result = await query("SELECT * FROM public.product ORDER BY id");
  return result.rows;
};

const getProductById = async (id) => {
  const result = await query("SELECT * FROM public.product WHERE id = $1", [id]);
  return result.rows[0];
};

const getProductWithReviews = async (id) => {
  const product = await query("SELECT * FROM public.product WHERE id = $1", [id]);
  const reviews = await query(
    `SELECT r.id, r.rating, r.review_text, r.updated_at,
            m.username AS member_username
     FROM public.review r
     JOIN public.member m ON r.member_id = m.id
     WHERE r.product_id = $1
     ORDER BY r.updated_at DESC`,
    [id]
  );
  return { product: product.rows[0], reviews: reviews.rows };
};

module.exports = { getAllProducts, getProductById, getProductWithReviews };