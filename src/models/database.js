const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

exports.getUserById = async (userId) => {
    try {
        const query = `
            SELECT id, username, email 
            FROM users 
            WHERE id = $1;
        `;
        const result = await pool.query(query, [userId]);

        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
        console.error('Error fetching user by ID:', err);
        throw err; 
    }
};

exports.setUserContext = async (userId) => {
    try {
        const query = `SELECT set_config('app.user_id', $1, false);`;
        await pool.query(query, [userId.toString()]);
    } catch (err) {
        console.error('Error setting user context:', err);
        throw err;
    }
};
