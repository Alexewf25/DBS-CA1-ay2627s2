const { query } = require("../config/database");

const findByUsername = async (username) => {
  const result = await query(
    `SELECT m.id, 
            m.username, 
            m.email, 
            m.password, 
            m.role, 
            m.gender, 
            mr.name AS role_name 
    FROM public.member m 
    JOIN public.member_role mr ON m.role = mr.id 
    WHERE m.username = $1`,
    [username]
  );
  return result.rows[0];
};

const createMember = async (username, email, dob, hashedPassword, gender) => {
  const result = await query(
    "INSERT INTO public.member (username, email, dob, password, role, gender) VALUES ($1, $2, $3, $4, 2, $5) RETURNING id, username, email",
    [username, email, dob, hashedPassword, gender]
  );
  return result.rows[0];
};

module.exports = { findByUsername, createMember };