import { useLanguage } from '../context/LanguageContext'
import { formatVND } from '../utils/currency'

export default function ShippingInfo() {
  const { t } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          {t({ en: 'Shipping Information', vi: 'Thông Tin Vận Chuyển' })}
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: 'Shipping Options', vi: 'Tùy Chọn Vận Chuyển' })}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="text-lg font-semibold mb-2 text-primary-600">
                  {t({ en: 'Standard Shipping', vi: 'Vận Chuyển Tiêu Chuẩn' })}
                </h3>
                <p className="text-2xl font-bold mb-2">
                  {t({ en: 'FREE', vi: 'MIỄN PHÍ' })}
                </p>
                <p className="text-gray-600 mb-4">
                  {t({ en: '5-7 business days', vi: '5-7 ngày làm việc' })}
                </p>
                <p className="text-sm text-gray-500">
                  {t({ 
                    en: `Available on orders over ${formatVND(500)}`,
                    vi: `Áp dụng cho đơn hàng trên ${formatVND(500)}`
                  })}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="text-lg font-semibold mb-2 text-primary-600">
                  {t({ en: 'Express Shipping', vi: 'Vận Chuyển Nhanh' })}
                </h3>
                <p className="text-2xl font-bold mb-2">{formatVND(19.99)}</p>
                <p className="text-gray-600 mb-4">
                  {t({ en: '2-3 business days', vi: '2-3 ngày làm việc' })}
                </p>
                <p className="text-sm text-gray-500">
                  {t({ 
                    en: 'Fastest delivery option',
                    vi: 'Tùy chọn giao hàng nhanh nhất'
                  })}
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="text-lg font-semibold mb-2 text-primary-600">
                  {t({ en: 'Overnight Shipping', vi: 'Vận Chuyển Qua Đêm' })}
                </h3>
                <p className="text-2xl font-bold mb-2">{formatVND(39.99)}</p>
                <p className="text-gray-600 mb-4">
                  {t({ en: 'Next business day', vi: 'Ngày làm việc tiếp theo' })}
                </p>
                <p className="text-sm text-gray-500">
                  {t({ 
                    en: 'Order by 2 PM EST',
                    vi: 'Đặt hàng trước 2 giờ chiều EST'
                  })}
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: 'Processing Time', vi: 'Thời Gian Xử Lý' })}
            </h2>
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <p className="text-gray-700">
                {t({ 
                  en: 'Orders are typically processed within 1-2 business days. Orders placed after 2 PM EST on Friday will be processed the following Monday.',
                  vi: 'Đơn hàng thường được xử lý trong vòng 1-2 ngày làm việc. Đơn hàng được đặt sau 2 giờ chiều EST vào thứ Sáu sẽ được xử lý vào thứ Hai tuần sau.'
                })}
              </p>
            </div>
            
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t({ 
                  en: 'In-stock items ship within 1-2 business days',
                  vi: 'Hàng có sẵn gửi trong 1-2 ngày làm việc'
                })}
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t({ 
                  en: 'Custom configurations may require additional 2-3 days',
                  vi: 'Cấu hình tùy chỉnh có thể cần thêm 2-3 ngày'
                })}
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {t({ 
                  en: 'You will receive tracking information once your order ships',
                  vi: 'Bạn sẽ nhận được thông tin theo dõi khi đơn hàng được gửi'
                })}
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: 'Shipping Areas', vi: 'Khu Vực Vận Chuyển' })}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="text-lg font-semibold mb-4 text-primary-600">
                  {t({ en: 'Domestic Shipping', vi: 'Vận Chuyển Nội Địa' })}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t({ 
                    en: 'We ship to all 50 US states, including Alaska and Hawaii.',
                    vi: 'Chúng tôi gửi hàng đến tất cả 50 bang Mỹ, bao gồm Alaska và Hawaii.'
                  })}
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• {t({ en: `Free shipping on orders over ${formatVND(500)}`, vi: `Miễn phí vận chuyển cho đơn hàng trên ${formatVND(500)}` })}</li>
                  <li>• {t({ en: 'No PO Box shipping', vi: 'Không gửi hàng đến hộp thư bưu điện' })}</li>
                  <li>• {t({ en: `Signature required for orders over ${formatVND(1000)}`, vi: `Yêu cầu chữ ký cho đơn hàng trên ${formatVND(1000)}` })}</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="text-lg font-semibold mb-4 text-primary-600">
                  {t({ en: 'International Shipping', vi: 'Vận Chuyển Quốc Tế' })}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t({ 
                    en: 'We currently ship to Canada, UK, and select EU countries.',
                    vi: 'Chúng tôi hiện gửi hàng đến Canada, Anh và một số quốc gia EU được chọn.'
                  })}
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• {t({ en: 'Shipping rates calculated at checkout', vi: 'Phí vận chuyển được tính khi thanh toán' })}</li>
                  <li>• {t({ en: 'Customs duties may apply', vi: 'Có thể áp dụng thuế hải quan' })}</li>
                  <li>• {t({ en: '7-14 business days delivery', vi: 'Giao hàng trong 7-14 ngày làm việc' })}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: 'Tracking Your Order', vi: 'Theo Dõi Đơn Hàng' })}
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-primary-600 text-white rounded-full text-sm font-bold">1</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {t({ en: 'Order Confirmation', vi: 'Xác Nhận Đơn Hàng' })}
                    </h4>
                    <p className="text-gray-600">
                      {t({ 
                        en: 'You\'ll receive an email confirmation with your order details.',
                        vi: 'Bạn sẽ nhận được email xác nhận với chi tiết đơn hàng.'
                      })}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-primary-600 text-white rounded-full text-sm font-bold">2</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {t({ en: 'Processing', vi: 'Xử Lý' })}
                    </h4>
                    <p className="text-gray-600">
                      {t({ 
                        en: 'Your order is being prepared and packaged.',
                        vi: 'Đơn hàng của bạn đang được chuẩn bị và đóng gói.'
                      })}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-primary-600 text-white rounded-full text-sm font-bold">3</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {t({ en: 'Shipped', vi: 'Đã Gửi' })}
                    </h4>
                    <p className="text-gray-600">
                      {t({ 
                        en: 'You\'ll receive tracking information via email and SMS.',
                        vi: 'Bạn sẽ nhận được thông tin theo dõi qua email và SMS.'
                      })}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-primary-600 text-white rounded-full text-sm font-bold">4</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {t({ en: 'Delivered', vi: 'Đã Giao' })}
                    </h4>
                    <p className="text-gray-600">
                      {t({ 
                        en: 'Your order arrives at your specified address.',
                        vi: 'Đơn hàng của bạn đến địa chỉ được chỉ định.'
                      })}
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          <section className="text-center bg-primary-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t({ en: 'Need Help with Shipping?', vi: 'Cần Hỗ Trợ Về Vận Chuyển?' })}
            </h2>
            <p className="text-gray-600 mb-6">
              {t({ 
                en: 'Our customer service team is here to help with any shipping questions.',
                vi: 'Đội ngũ dịch vụ khách hàng của chúng tôi sẵn sàng giúp đỡ với bất kỳ câu hỏi về vận chuyển nào.'
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@techstore.com"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition"
              >
                {t({ en: 'Email Support', vi: 'Hỗ Trợ Email' })}
              </a>
              <a
                href="tel:+15551234567"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                {t({ en: 'Call: +1 (555) 123-4567', vi: 'Gọi: +1 (555) 123-4567' })}
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}