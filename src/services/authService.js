// Add this function to your existing authService
export const updatePassword = async (data) => {
    const response = await request({
        url: '/auth/update-password',
        method: 'put',
        data: {
            current_password: data.current_password,
            password: data.password,
            password_confirmation: data.password_confirmation
        }
    });
    return response;
};