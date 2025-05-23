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

            const user = await response.json();

            if (!user) {
                // Если пользователь не найден, очищаем localStorage
                localStorage.removeItem('authToken');
                console.log(`Пользователь с id=${id} не найден. LocalStorage очищен.`);
            }

            return user;    

        } catch (error) {
            console.error("Ошибка при получении пользователя по ID:", error);
            // Если ошибка, очищаем localStorage
            localStorage.removeItem('authToken');
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
    },
    updateUserPortfolio: async (id, updatedPortfolio) => {
        try {
            const user = await server.getUserById(id); // Fetch the user by ID

            if (!user) {
                throw new Error(`Пользователь с id=${id} не найден.`);
            }

            // Update the portfolio of the user
            user.portfolio = updatedPortfolio;

            // Now send the updated user data back to the server
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user) // Send the updated user object
            });

            if (!response.ok) {
                throw new Error(`Ошибка при обновлении портфолио пользователя с id=${id}: ${response.statusText}`);
            }

            return await response.json(); // Return the updated user data
        } catch (error) {
            console.error("Ошибка при обновлении портфолио пользователя:", error);
            throw error;
        }
    },

    updateUserEducation: async (id, updatedEducation) => {
        try {
            const user = await server.getUserById(id); // Fetch the user by ID

            if (!user) {
                throw new Error(`Пользователь с id=${id} не найден.`);
            }

            // Update the education of the user
            user.education = updatedEducation;

            // Now send the updated user data back to the server
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user) // Send the updated user object
            });

            if (!response.ok) {
                throw new Error(`Ошибка при обновлении портфолио пользователя с id=${id}: ${response.statusText}`);
            }

            return await response.json(); // Return the updated user data
        } catch (error) {
            console.error("Ошибка при обновлении портфолио пользователя:", error);
            throw error;
        }
    },
    updateUserExperience: async (id, updatedExperience) => {
        try {
            const user = await server.getUserById(id); // Fetch the user by ID

            if (!user) {
                throw new Error(`Пользователь с id=${id} не найден.`);
            }

            // Update the education of the user
            user.experience = updatedExperience;

            // Now send the updated user data back to the server
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user) // Send the updated user object
            });

            if (!response.ok) {
                throw new Error(`Ошибка при обновлении портфолио пользователя с id=${id}: ${response.statusText}`);
            }

            return await response.json(); // Return the updated user data
        } catch (error) {
            console.error("Ошибка при обновлении портфолио пользователя:", error);
            throw error;
        }
    },
    updateUserSkills: async (id, updatedSkills) => {
        try {
            const user = await server.getUserById(id); // Fetch the user by ID

            if (!user) {
                throw new Error(`Пользователь с id=${id} не найден.`);
            }

            // Update the education of the user
            user.skills = updatedSkills;

            // Now send the updated user data back to the server
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user) // Send the updated user object
            });

            if (!response.ok) {
                throw new Error(`Ошибка при обновлении портфолио пользователя с id=${id}: ${response.statusText}`);
            }

            return await response.json(); // Return the updated user data
        } catch (error) {
            console.error("Ошибка при обновлении портфолио пользователя:", error);
            throw error;
        }
    },
    updateUserLanguages: async (id, updatedLanguages) => {
        try {
            const user = await server.getUserById(id); // Fetch the user by ID

            if (!user) {
                throw new Error(`Пользователь с id=${id} не найден.`);
            }

            // Update the education of the user
            user.languages = updatedLanguages;

            // Now send the updated user data back to the server
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user) // Send the updated user object
            });

            if (!response.ok) {
                throw new Error(`Ошибка при обновлении портфолио пользователя с id=${id}: ${response.statusText}`);
            }

            return await response.json(); // Return the updated user data
        } catch (error) {
            console.error("Ошибка при обновлении портфолио пользователя:", error);
            throw error;
        }
    },
    updateUserHobbies: async (id, updatedHobbies) => {
        try {
            const user = await server.getUserById(id); // Fetch the user by ID

            if (!user) {
                throw new Error(`Пользователь с id=${id} не найден.`);
            }

            // Update the education of the user
            user.hobbies = updatedHobbies;

            // Now send the updated user data back to the server
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user) // Send the updated user object
            });

            if (!response.ok) {
                throw new Error(`Ошибка при обновлении портфолио пользователя с id=${id}: ${response.statusText}`);
            }

            return await response.json(); // Return the updated user data
        } catch (error) {
            console.error("Ошибка при обновлении портфолио пользователя:", error);
            throw error;
        }
    },
};
