exports.getUser = async (req, res) => {
    const { getUserById, setUserContext } = require('../models/database');

    try {
        const userId = req.user.id; 

        await setUserContext(userId);

        const user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ id: user.id, username: user.username, email: user.email });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};