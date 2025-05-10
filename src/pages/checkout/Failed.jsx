import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHelmet from '../../components/common/PageHelmet';

function CheckoutFailed() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const error = searchParams.get('error');

    return (
        <div className="container py-8">
            <PageHelmet title="Payment Failed" />
            <div className="max-w-2xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Thanh toán thất bại!</h2>
                    <p className="text-gray-600 mb-6">
                        {error === 'payment_failed' 
                            ? 'Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.'
                            : 'Không thể hoàn tất thanh toán. Vui lòng thử lại sau.'}
                    </p>

                    <div className="space-x-4">
                        <button
                            onClick={() => navigate('/checkout')}
                            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark"
                        >
                            Thử lại
                        </button>
                        <button
                            onClick={() => navigate('/cart')}
                            className="bg-gray-100 text-gray-700 px-6 py-2 rounded hover:bg-gray-200"
                        >
                            Quay lại giỏ hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutFailed;