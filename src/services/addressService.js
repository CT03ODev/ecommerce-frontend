import { requestWithAuth } from './request';

export const addressService = {
    getAddresses: async () => {
        return await requestWithAuth({
            url: '/auth/user/addresses',
            method: 'get',
        });
    },

    createAddress: async (data) => {
        return await requestWithAuth({
            url: '/auth/user/addresses',
            method: 'post',
            data,
        });
    },

    updateAddress: async (id, data) => {
        return await requestWithAuth({
            url: `/auth/user/addresses/${id}`,
            method: 'put',
            data,
        });
    },

    deleteAddress: async (id) => {
        return await requestWithAuth({
            url: `/auth/user/addresses/${id}`,
            method: 'delete',
        });
    },
};