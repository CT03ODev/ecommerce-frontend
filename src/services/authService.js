// Add this function to your existing authService
export const updatePassword = async (data) => {
    return await requestWithAuth({
        url: '/auth/update-password',
        method: 'put',
        data,
    });
};