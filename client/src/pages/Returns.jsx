import { useLanguage } from '../context/LanguageContext'
import { formatVND } from '../utils/currency'

export default function Returns() {
  const { t } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          {t({ en: 'Returns & Exchanges', vi: 'Đổi Trả & Trao Đổi' })}
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                {t({ en: '30-Day Return Policy', vi: 'Chính Sách Đổi Trả 30 Ngày' })}
              </h2>
              <p className="text-green-700">
                {t({ 
                  en: 'We offer a hassle-free 30-day return policy on all products. If you\'re not completely satisfied with your purchase, we\'ll make it right.',
                  vi: 'Chúng tôi cung cấp chính sách đổi trả 30 ngày không rắc rối cho tất cả sản phẩm. Nếu bạn không hoàn toàn hài lòng với việc mua hàng, chúng tôi sẽ giải quyết.'
                })}
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: 'Return Conditions', vi: 'Điều Kiện Đổi Trả' })}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="text-lg font-semibold mb-4 text-green-600">
                  ✓ {t({ en: 'Eligible for Return', vi: 'Đủ Điều Kiện Đổi Trả' })}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• {t({ en: 'Item in original condition', vi: 'Sản phẩm ở tình trạng nguyên bản' })}</li>
                  <li>• {t({ en: 'All original packaging included', vi: 'Bao gồm tất cả bao bì nguyên bản' })}</li>
                  <li>• {t({ en: 'All accessories and manuals', vi: 'Tất cả phụ kiện và sách hướng dẫn' })}</li>
                  <li>• {t({ en: 'Within 30 days of purchase', vi: 'Trong vòng 30 ngày kể từ khi mua' })}</li>
                  <li>• {t({ en: 'Valid proof of purchase', vi: 'Chứng từ mua hàng hợp lệ' })}</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="text-lg font-semibold mb-4 text-red-600">
                  ✗ {t({ en: 'Not Eligible for Return', vi: 'Không Đủ Điều Kiện Đổi Trả' })}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• {t({ en: 'Physical damage from misuse', vi: 'Hư hỏng vật lý do sử dụng sai cách' })}</li>
                  <li>• {t({ en: 'Software already installed', vi: 'Phần mềm đã được cài đặt' })}</li>
                  <li>• {t({ en: 'Custom configurations', vi: 'Cấu hình tùy chỉnh' })}</li>
                  <li>• {t({ en: 'Items over 30 days old', vi: 'Sản phẩm quá 30 ngày tuổi' })}</li>
                  <li>• {t({ en: 'Missing original packaging', vi: 'Thiếu bao bì nguyên bản' })}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: 'How to Return an Item', vi: 'Cách Đổi Trả Sản Phẩm' })}
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <ol className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-10 h-10 bg-primary-600 text-white rounded-full text-lg font-bold">1</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {t({ en: 'Contact Customer Service', vi: 'Liên Hệ Dịch Vụ Khách Hàng' })}
                    </h4>
                    <p className="text-gray-600">
                      {t({ 
                        en: 'Call us at +1 (555) 123-4567 or email support@techstore.com to initiate your return.',
                        vi: 'Gọi cho chúng tôi theo số +1 (555) 123-4567 hoặc email support@techstore.com để bắt đầu đổi trả.'
                      })}
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-10 h-10 bg-primary-600 text-white rounded-full text-lg font-bold">2</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {t({ en: 'Get Return Authorization', vi: 'Nhận Ủy Quyền Đổi Trả' })}
                    </h4>
                    <p className="text-gray-600">
                      {t({ 
                        en: 'We\'ll provide you with a Return Authorization (RA) number and return shipping label.',
                        vi: 'Chúng tôi sẽ cung cấp cho bạn số Ủy quyền Đổi trả (RA) và nhãn vận chuyển trả hàng.'
                      })}
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-10 h-10 bg-primary-600 text-white rounded-full text-lg font-bold">3</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {t({ en: 'Pack the Item', vi: 'Đóng Gói Sản Phẩm' })}
                    </h4>
                    <p className="text-gray-600">
                      {t({ 
                        en: 'Securely pack the item with all original accessories and documentation.',
                        vi: 'Đóng gói sản phẩm một cách an toàn với tất cả phụ kiện và tài liệu gốc.'
                      })}
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-10 h-10 bg-primary-600 text-white rounded-full text-lg font-bold">4</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {t({ en: 'Ship the Return', vi: 'Gửi Hàng Trả' })}
                    </h4>
                    <p className="text-gray-600">
                      {t({ 
                        en: 'Use the provided return label and drop off at any authorized shipping location.',
                        vi: 'Sử dụng nhãn trả hàng được cung cấp và gửi tại bất kỳ địa điểm vận chuyển được ủy quyền nào.'
                      })}
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: 'Refund Processing', vi: 'Xử Lý Hoàn Tiền' })}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="text-lg font-semibold mb-4 text-primary-600">
                  {t({ en: 'Processing Time', vi: 'Thời Gian Xử Lý' })}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• {t({ en: 'Inspection: 2-3 business days', vi: 'Kiểm tra: 2-3 ngày làm việc' })}</li>
                  <li>• {t({ en: 'Refund approval: 1 business day', vi: 'Phê duyệt hoàn tiền: 1 ngày làm việc' })}</li>
                  <li>• {t({ en: 'Credit card: 3-5 business days', vi: 'Thẻ tín dụng: 3-5 ngày làm việc' })}</li>
                  <li>• {t({ en: 'PayPal: 1-2 business days', vi: 'PayPal: 1-2 ngày làm việc' })}</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="text-lg font-semibold mb-4 text-primary-600">
                  {t({ en: 'Refund Methods', vi: 'Phương Thức Hoàn Tiền' })}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• {t({ en: 'Original payment method', vi: 'Phương thức thanh toán gốc' })}</li>
                  <li>• {t({ en: 'Store credit available', vi: 'Có tín dụng cửa hàng' })}</li>
                  <li>• {t({ en: 'Exchange for different item', vi: 'Đổi sang sản phẩm khác' })}</li>
                  <li>• {t({ en: 'Gift card option', vi: 'Tùy chọn thẻ quà tặng' })}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: 'Return Shipping', vi: 'Vận Chuyển Trả Hàng' })}
            </h2>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    {t({ en: 'Free Return Shipping', vi: 'Miễn Phí Vận Chuyển Trả Hàng' })}
                  </h3>
                  <ul className="text-blue-700 space-y-1">
                    <li>• {t({ en: 'Defective items', vi: 'Sản phẩm bị lỗi' })}</li>
                    <li>• {t({ en: 'Wrong item shipped', vi: 'Gửi nhầm sản phẩm' })}</li>
                    <li>• {t({ en: `Orders over ${formatVND(500)}`, vi: `Đơn hàng trên ${formatVND(500)}` })}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    {t({ en: 'Customer Pays Shipping', vi: 'Khách Hàng Trả Phí Vận Chuyển' })}
                  </h3>
                  <ul className="text-blue-700 space-y-1">
                    <li>• {t({ en: 'Change of mind', vi: 'Thay đổi ý kiến' })}</li>
                    <li>• {t({ en: 'Ordered wrong item', vi: 'Đặt nhầm sản phẩm' })}</li>
                    <li>• {t({ en: `Orders under ${formatVND(500)}`, vi: `Đơn hàng dưới ${formatVND(500)}` })}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="text-center bg-primary-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t({ en: 'Questions About Returns?', vi: 'Có Câu Hỏi Về Đổi Trả?' })}
            </h2>
            <p className="text-gray-600 mb-6">
              {t({ 
                en: 'Our customer service team is ready to help you with your return.',
                vi: 'Đội ngũ dịch vụ khách hàng của chúng tôi sẵn sàng giúp bạn với việc đổi trả.'
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+15551234567"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition"
              >
                {t({ en: 'Call: +1 (555) 123-4567', vi: 'Gọi: +1 (555) 123-4567' })}
              </a>
              <a
                href="mailto:support@techstore.com"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                {t({ en: 'Email Support', vi: 'Hỗ Trợ Email' })}
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}