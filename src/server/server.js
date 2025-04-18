const API_URL = 'https://67fb6f7c8ee14a54262a0775.mockapi.io/data';
const SECONDS_IN_50_DAYS = 50 * 24 * 60 * 60;

export const server = {
    createUser: async (data) => {
        try {
            if (!data.user || !data.user.firstName || !data.user.lastName || !data.user.userName || !data.password) {
                throw new Error("Недостаточно данных для создания пользователя.");
            }

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    date: Math.floor(Date.now() / 1000)
                })
            });

            if (!response.ok) {
                throw new Error(`Ошибка при создании пользователя: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Ошибка при создании пользователя:", error);
            throw error;
        }
    },

    getAllUsers: async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Ошибка при получении пользователей: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Ошибка при получении пользователей:", error);
            throw error;
        }
    },

    getUserById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) {
                throw new Error(`Ошибка при получении пользователя с id=${id}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Ошибка при получении пользователя по ID:", error);
            throw error;
        }
    },

    deleteUser: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error(`Ошибка при удалении пользователя с id=${id}: ${response.statusText}`);
            }
            console.log(`Пользователь с id=${id} удалён.`);
        } catch (error) {
            console.error("Ошибка при удалении пользователя:", error);
            throw error;
        }
    },

    updateUser: async (id, data) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Ошибка при обновлении пользователя с id=${id}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Ошибка при обновлении пользователя:", error);
            throw error;
        }
    },

    deleteOldUsers: async () => {
        try {
            const users = await server.getAllUsers();
            const now = Math.floor(Date.now() / 1000);
            const oldUsers = users.filter(user => (now - user.date) > SECONDS_IN_50_DAYS);

            if (oldUsers.length > 0) {
                await Promise.all(oldUsers.map(user => server.deleteUser(user.id)));
                console.log(`Удалено старых аккаунтов: ${oldUsers.length}`);
            } else {
                console.log("Нет старых аккаунтов для удаления.");
            }
        } catch (error) {
            console.error("Ошибка при удалении старых аккаунтов:", error);
            throw error;
        }
    }
};
