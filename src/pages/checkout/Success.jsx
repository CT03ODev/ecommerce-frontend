import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { orderService } from '../../services/orderService';
import PageHelmet from '../../components/common/PageHelmet';

function CheckoutSuccess() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('order_id');

    const { data: order, isLoading } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => orderService.getOrder(orderId),
        enabled: !!orderId
    });

    useEffect(() => {
        if (!orderId) {
            navigate('/');
        }
    }, [orderId, navigate]);

    if (isLoading) {
        return (
            <div className="container py-8">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <PageHelmet title="Payment Success" />
            <div className="max-w-2xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Thanh toán thành công!</h2>
                    <p className="text-gray-600 mb-6">Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý.</p>
                    
                    {order && (
                        <div className="text-left bg-gray-50 p-4 rounded-lg mb-6">
                            <h3 className="font-medium mb-2">Chi tiết đơn hàng:</h3>
                            <p>Mã đơn hàng: {order.order_number}</p>
                            <p>Tổng tiền: ${order.total_amount}</p>
                        </div>
                    )}

                    <div className="space-x-4">
                        <button
                            onClick={() => navigate('/account/orders')}
                            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark"
                        >
                            Xem đơn hàng
                        </button>
                        <button
                            onClick={() => navigate('/shop')}
                            className="bg-gray-100 text-gray-700 px-6 py-2 rounded hover:bg-gray-200"
                        >
                            Tiếp tục mua sắm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutSuccess;