import { requestWithAuth } from './request';

export const orderService = {
    // Lấy danh sách đơn hàng
    getOrders: async () => {
        const response = await requestWithAuth({
            url: '/orders',
            method: 'GET'
        });
        return response;
    },

    // Lấy chi tiết một đơn hàng
    getOrder: async (orderId) => {
        const response = await requestWithAuth({
            url: `/orders/${orderId}`,
            method: 'GET'
        });
        return response;
    },

    // Tạo đơn hàng mới
    createOrder: async (orderData) => {
        const response = await requestWithAuth({
            url: '/orders',
            method: 'post',
            data: orderData
        });
        return response;
    }
};