import { useLanguage } from '../context/LanguageContext'

export default function Support() {
  const { t } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          {t({ en: 'Customer Support', vi: 'Hỗ Trợ Khách Hàng' })}
        </h1>
        
        <p className="text-xl text-gray-600 text-center mb-12">
          {t({ 
            en: 'We\'re here to help! Choose the support option that works best for you.',
            vi: 'Chúng tôi ở đây để giúp đỡ! Chọn tùy chọn hỗ trợ phù hợp nhất với bạn.'
          })}
        </p>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6 text-center border hover:shadow-lg transition">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {t({ en: 'Phone Support', vi: 'Hỗ Trợ Điện Thoại' })}
            </h3>
            <p className="text-gray-600 mb-4">
              {t({ 
                en: 'Speak directly with our support team for immediate assistance.',
                vi: 'Nói chuyện trực tiếp với đội hỗ trợ của chúng tôi để được hỗ trợ ngay lập tức.'
              })}
            </p>
            <p className="font-bold text-lg mb-2">+1 (555) 123-4567</p>
            <p className="text-sm text-gray-500">
              {t({ 
                en: 'Mon-Fri: 8AM-8PM EST\nSat-Sun: 10AM-6PM EST',
                vi: 'Thứ 2-6: 8AM-8PM EST\nThứ 7-CN: 10AM-6PM EST'
              })}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center border hover:shadow-lg transition">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {t({ en: 'Live Chat', vi: 'Trò Chuyện Trực Tiếp' })}
            </h3>
            <p className="text-gray-600 mb-4">
              {t({ 
                en: 'Chat with our support agents in real-time for quick help.',
                vi: 'Trò chuyện với các nhân viên hỗ trợ của chúng tôi theo thời gian thực để được giúp đỡ nhanh chóng.'
              })}
            </p>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
              {t({ en: 'Start Chat', vi: 'Bắt Đầu Trò Chuyện' })}
            </button>
            <p className="text-sm text-gray-500 mt-2">
              {t({ en: 'Available 24/7', vi: 'Có sẵn 24/7' })}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center border hover:shadow-lg transition">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">
              {t({ en: 'Email Support', vi: 'Hỗ Trợ Email' })}
            </h3>
            <p className="text-gray-600 mb-4">
              {t({ 
                en: 'Send us detailed questions and we\'ll respond within 24 hours.',
                vi: 'Gửi cho chúng tôi các câu hỏi chi tiết và chúng tôi sẽ trả lời trong vòng 24 giờ.'
              })}
            </p>
            <p className="font-bold text-lg mb-2">support@techstore.com</p>
            <p className="text-sm text-gray-500">
              {t({ 
                en: 'Response within 24 hours',
                vi: 'Phản hồi trong vòng 24 giờ'
              })}
            </p>
          </div>
        </div>

        {/* Self-Service Options */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t({ en: 'Self-Service Options', vi: 'Tùy Chọn Tự Phục Vụ' })}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="/faq" className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition border">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">{t({ en: 'FAQ', vi: 'Câu Hỏi Thường Gặp' })}</h3>
              <p className="text-gray-600 text-sm">
                {t({ 
                  en: 'Find answers to common questions',
                  vi: 'Tìm câu trả lời cho các câu hỏi phổ biến'
                })}
              </p>
            </a>

            <a href="/warranty" className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">{t({ en: 'Warranty Info', vi: 'Thông Tin Bảo Hành' })}</h3>
              <p className="text-gray-600 text-sm">
                {t({ 
                  en: 'Check warranty status and coverage',
                  vi: 'Kiểm tra trạng thái và phạm vi bảo hành'
                })}
              </p>
            </a>

            <a href="/returns" className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition border">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">{t({ en: 'Returns', vi: 'Trả Hàng' })}</h3>
              <p className="text-gray-600 text-sm">
                {t({ 
                  en: 'Return policy and process',
                  vi: 'Chính sách và quy trình trả hàng'
                })}
              </p>
            </a>

            <a href="/shipping-info" className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition border">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">{t({ en: 'Shipping Info', vi: 'Thông Tin Vận Chuyển' })}</h3>
              <p className="text-gray-600 text-sm">
                {t({ 
                  en: 'Tracking and delivery information',
                  vi: 'Thông tin theo dõi và giao hàng'
                })}
              </p>
            </a>
          </div>
        </section>

        {/* Support Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t({ en: 'Support Categories', vi: 'Danh Mục Hỗ Trợ' })}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                {t({ en: 'Technical Support', vi: 'Hỗ Trợ Kỹ Thuật' })}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t({ en: 'Device setup and configuration', vi: 'Thiết lập và cấu hình thiết bị' })}</li>
                <li>• {t({ en: 'Software installation help', vi: 'Trợ giúp cài đặt phần mềm' })}</li>
                <li>• {t({ en: 'Troubleshooting issues', vi: 'Khắc phục sự cố' })}</li>
                <li>• {t({ en: 'Performance optimization', vi: 'Tối ưu hóa hiệu suất' })}</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                {t({ en: 'Order Support', vi: 'Hỗ Trợ Đơn Hàng' })}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t({ en: 'Order status and tracking', vi: 'Trạng thái và theo dõi đơn hàng' })}</li>
                <li>• {t({ en: 'Shipping and delivery', vi: 'Vận chuyển và giao hàng' })}</li>
                <li>• {t({ en: 'Order changes/cancellation', vi: 'Thay đổi/hủy đơn hàng' })}</li>
                <li>• {t({ en: 'Billing questions', vi: 'Câu hỏi về thanh toán' })}</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                {t({ en: 'Product Information', vi: 'Thông Tin Sản Phẩm' })}
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {t({ en: 'Product specifications', vi: 'Thông số kỹ thuật sản phẩm' })}</li>
                <li>• {t({ en: 'Compatibility questions', vi: 'Câu hỏi về khả năng tương thích' })}</li>
                <li>• {t({ en: 'Product recommendations', vi: 'Khuyến nghị sản phẩm' })}</li>
                <li>• {t({ en: 'Comparisons and reviews', vi: 'So sánh và đánh giá' })}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-white rounded-lg shadow-lg p-8 border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t({ en: 'Send Us a Message', vi: 'Gửi Tin Nhắn Cho Chúng Tôi' })}
          </h2>
          
          <form className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t({ en: 'First Name', vi: 'Tên' })} *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t({ en: 'Last Name', vi: 'Họ' })} *
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t({ en: 'Email Address', vi: 'Địa Chỉ Email' })} *
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t({ en: 'Phone Number', vi: 'Số Điện Thoại' })}
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t({ en: 'Order Number (if applicable)', vi: 'Số Đơn Hàng (nếu có)' })}
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t({ en: 'Support Category', vi: 'Danh Mục Hỗ Trợ' })} *
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" required>
                <option value="">{t({ en: 'Select a category', vi: 'Chọn danh mục' })}</option>
                <option value="technical">{t({ en: 'Technical Support', vi: 'Hỗ Trợ Kỹ Thuật' })}</option>
                <option value="order">{t({ en: 'Order Support', vi: 'Hỗ Trợ Đơn Hàng' })}</option>
                <option value="warranty">{t({ en: 'Warranty Claims', vi: 'Yêu Cầu Bảo Hành' })}</option>
                <option value="returns">{t({ en: 'Returns & Exchanges', vi: 'Trả Hàng & Đổi Hàng' })}</option>
                <option value="general">{t({ en: 'General Inquiry', vi: 'Yêu Cầu Chung' })}</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t({ en: 'Subject', vi: 'Chủ Đề' })} *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t({ en: 'Message', vi: 'Tin Nhắn' })} *
              </label>
              <textarea
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={t({ 
                  en: 'Please provide as much detail as possible about your issue...',
                  vi: 'Vui lòng cung cấp càng nhiều chi tiết càng tốt về vấn đề của bạn...'
                })}
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition font-medium"
              >
                {t({ en: 'Send Message', vi: 'Gửi Tin Nhắn' })}
              </button>
            </div>
          </form>
        </section>

        {/* Emergency Contact */}
        <section className="mt-16 bg-red-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-4">
            {t({ en: 'Emergency Support', vi: 'Hỗ Trợ Khẩn Cấp' })}
          </h2>
          <p className="text-red-700 mb-4">
            {t({ 
              en: 'For critical issues affecting your business operations, contact our emergency hotline.',
              vi: 'Đối với các vấn đề nghiêm trọng ảnh hưởng đến hoạt động kinh doanh của bạn, hãy liên hệ đường dây nóng khẩn cấp của chúng tôi.'
            })}
          </p>
          <div className="text-xl font-bold text-red-800">
            🚨 Emergency: +1 (555) 999-9999
          </div>
          <p className="text-sm text-red-600 mt-2">
            {t({ en: 'Available 24/7 for critical issues', vi: 'Có sẵn 24/7 cho các vấn đề nghiêm trọng' })}
          </p>
        </section>
      </div>
    </div>
  )
}