import { useLanguage } from '../context/LanguageContext'

export default function Warranty() {
  const { t } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          {t({ en: 'Warranty Information', vi: 'Thông Tin Bảo Hành' })}
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                {t({ en: 'Comprehensive Warranty Coverage', vi: 'Bảo Hành Toàn Diện' })}
              </h2>
              <p className="text-green-700">
                {t({ 
                  en: 'All our products come with manufacturer warranty plus additional TechStore protection for complete peace of mind.',
                  vi: 'Tất cả sản phẩm của chúng tôi đều đi kèm bảo hành nhà sản xuất cộng với sự bảo vệ bổ sung của TechStore để hoàn toàn yên tâm.'
                })}
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: 'Warranty Types', vi: 'Các Loại Bảo Hành' })}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="text-lg font-semibold mb-4 text-primary-600">
                  {t({ en: 'Standard Warranty', vi: 'Bảo Hành Tiêu Chuẩn' })}
                </h3>
                <div className="text-2xl font-bold mb-2">1 {t({ en: 'Year', vi: 'Năm' })}</div>
                <p className="text-gray-600 mb-4">
                  {t({ 
                    en: 'Included with all products at no additional cost.',
                    vi: 'Bao gồm với tất cả sản phẩm không tốn thêm chi phí.'
                  })}
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• {t({ en: 'Hardware defects', vi: 'Lỗi phần cứng' })}</li>
                  <li>• {t({ en: 'Manufacturing issues', vi: 'Vấn đề sản xuất' })}</li>
                  <li>• {t({ en: 'Free repairs/replacement', vi: 'Sửa chữa/thay thế miễn phí' })}</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-primary-200">
                <div className="text-center mb-2">
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-bold">
                    {t({ en: 'POPULAR', vi: 'PHỔ BIẾN' })}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-4 text-primary-600">
                  {t({ en: 'Extended Warranty', vi: 'Bảo Hành Mở Rộng' })}
                </h3>
                <div className="text-2xl font-bold mb-2">2-3 {t({ en: 'Years', vi: 'Năm' })}</div>
                <p className="text-gray-600 mb-4">
                  {t({ 
                    en: 'Additional protection with enhanced coverage.',
                    vi: 'Bảo vệ bổ sung với phạm vi bảo hiểm nâng cao.'
                  })}
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• {t({ en: 'All standard coverage', vi: 'Tất cả bảo hiểm tiêu chuẩn' })}</li>
                  <li>• {t({ en: 'Accidental damage', vi: 'Hư hỏng do tai nạn' })}</li>
                  <li>• {t({ en: 'Priority support', vi: 'Hỗ trợ ưu tiên' })}</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border">
                <h3 className="text-lg font-semibold mb-4 text-primary-600">
                  {t({ en: 'Premium Warranty', vi: 'Bảo Hành Cao Cấp' })}
                </h3>
                <div className="text-2xl font-bold mb-2">4-5 {t({ en: 'Years', vi: 'Năm' })}</div>
                <p className="text-gray-600 mb-4">
                  {t({ 
                    en: 'Maximum protection for high-value purchases.',
                    vi: 'Bảo vệ tối đa cho các giao dịch mua có giá trị cao.'
                  })}
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• {t({ en: 'Complete protection', vi: 'Bảo vệ hoàn toàn' })}</li>
                  <li>• {t({ en: 'On-site service', vi: 'Dịch vụ tại chỗ' })}</li>
                  <li>• {t({ en: 'Dedicated support', vi: 'Hỗ trợ chuyên dụng' })}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: 'What\'s Covered', vi: 'Những Gì Được Bảo Hiểm' })}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-green-800">
                  ✓ {t({ en: 'Covered Under Warranty', vi: 'Được Bảo Hiểm Bảo Hành' })}
                </h3>
                <ul className="space-y-2 text-green-700">
                  <li>• {t({ en: 'Hardware component failures', vi: 'Lỗi linh kiện phần cứng' })}</li>
                  <li>• {t({ en: 'Manufacturing defects', vi: 'Lỗi sản xuất' })}</li>
                  <li>• {t({ en: 'Power supply issues', vi: 'Vấn đề nguồn điện' })}</li>
                  <li>• {t({ en: 'Display problems', vi: 'Vấn đề màn hình' })}</li>
                  <li>• {t({ en: 'Keyboard/trackpad malfunctions', vi: 'Trục trặc bàn phím/trackpad' })}</li>
                  <li>• {t({ en: 'Battery degradation (normal wear)', vi: 'Suy giảm pin (hao mòn bình thường)' })}</li>
                  <li>• {t({ en: 'Cooling system failures', vi: 'Lỗi hệ thống làm mát' })}</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-red-800">
                  ✗ {t({ en: 'Not Covered', vi: 'Không Được Bảo Hiểm' })}
                </h3>
                <ul className="space-y-2 text-red-700">
                  <li>• {t({ en: 'Physical damage from accidents', vi: 'Hư hỏng vật lý do tai nạn' })}</li>
                  <li>• {t({ en: 'Liquid spills or water damage', vi: 'Đổ chất lỏng hoặc hư hỏng do nước' })}</li>
                  <li>• {t({ en: 'Damage from misuse or abuse', vi: 'Hư hỏng do sử dụng sai hoặc lạm dụng' })}</li>
                  <li>• {t({ en: 'Virus or software issues', vi: 'Virus hoặc vấn đề phần mềm' })}</li>
                  <li>• {t({ en: 'Cosmetic damage that doesn\'t affect function', vi: 'Hư hỏng thẩm mỹ không ảnh hưởng chức năng' })}</li>
                  <li>• {t({ en: 'Damage from unauthorized repairs', vi: 'Hư hỏng do sửa chữa không được ủy quyền' })}</li>
                  <li>• {t({ en: 'Normal wear and tear', vi: 'Hao mòn bình thường' })}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: 'How to File a Warranty Claim', vi: 'Cách Nộp Đơn Yêu Cầu Bảo Hành' })}
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <ol className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-10 h-10 bg-primary-600 text-white rounded-full text-lg font-bold">1</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {t({ en: 'Contact Support', vi: 'Liên Hệ Hỗ Trợ' })}
                    </h4>
                    <p className="text-gray-600">
                      {t({ 
                        en: 'Call +1 (555) 123-4567 or email warranty@techstore.com with your order number and problem description.',
                        vi: 'Gọi +1 (555) 123-4567 hoặc email warranty@techstore.com với số đơn hàng và mô tả vấn đề của bạn.'
                      })}
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-10 h-10 bg-primary-600 text-white rounded-full text-lg font-bold">2</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {t({ en: 'Diagnostic & Verification', vi: 'Chẩn Đoán & Xác Minh' })}
                    </h4>
                    <p className="text-gray-600">
                      {t({ 
                        en: 'Our technicians will guide you through troubleshooting steps and verify the warranty coverage.',
                        vi: 'Các kỹ thuật viên của chúng tôi sẽ hướng dẫn bạn qua các bước khắc phục sự cố và xác minh bảo hiểm bảo hành.'
                      })}
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-10 h-10 bg-primary-600 text-white rounded-full text-lg font-bold">3</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {t({ en: 'Repair or Replacement', vi: 'Sửa Chữa hoặc Thay Thế' })}
                    </h4>
                    <p className="text-gray-600">
                      {t({ 
                        en: 'If covered, we\'ll either repair your device or provide a replacement. Shipping is included.',
                        vi: 'Nếu được bảo hiểm, chúng tôi sẽ sửa chữa thiết bị của bạn hoặc cung cấp thay thế. Vận chuyển được bao gồm.'
                      })}
                    </p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-10 h-10 bg-primary-600 text-white rounded-full text-lg font-bold">4</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {t({ en: 'Return & Resolution', vi: 'Trả Lại & Giải Quyết' })}
                    </h4>
                    <p className="text-gray-600">
                      {t({ 
                        en: 'Your repaired or replacement device will be returned to you, typically within 5-10 business days.',
                        vi: 'Thiết bị đã sửa chữa hoặc thay thế sẽ được trả lại cho bạn, thường trong vòng 5-10 ngày làm việc.'
                      })}
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: 'Warranty Registration', vi: 'Đăng Ký Bảo Hành' })}
            </h2>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                {t({ en: 'Important: Register Your Product', vi: 'Quan Trọng: Đăng Ký Sản Phẩm' })}
              </h3>
              <p className="text-blue-800 mb-4">
                {t({ 
                  en: 'While not required, registering your product ensures faster warranty claim processing and keeps you informed about important updates.',
                  vi: 'Mặc dù không bắt buộc, việc đăng ký sản phẩm đảm bảo xử lý yêu cầu bảo hành nhanh hơn và giữ cho bạn được thông báo về các cập nhật quan trọng.'
                })}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">
                    {t({ en: 'Registration Benefits:', vi: 'Lợi Ích Đăng Ký:' })}
                  </h4>
                  <ul className="text-blue-700 space-y-1">
                    <li>• {t({ en: 'Faster warranty processing', vi: 'Xử lý bảo hành nhanh hơn' })}</li>
                    <li>• {t({ en: 'Product recall notifications', vi: 'Thông báo thu hồi sản phẩm' })}</li>
                    <li>• {t({ en: 'Software update alerts', vi: 'Cảnh báo cập nhật phần mềm' })}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">
                    {t({ en: 'What You\'ll Need:', vi: 'Bạn Sẽ Cần:' })}
                  </h4>
                  <ul className="text-blue-700 space-y-1">
                    <li>• {t({ en: 'Product serial number', vi: 'Số sê-ri sản phẩm' })}</li>
                    <li>• {t({ en: 'Purchase date and receipt', vi: 'Ngày mua và hóa đơn' })}</li>
                    <li>• {t({ en: 'Contact information', vi: 'Thông tin liên hệ' })}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="text-center bg-primary-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t({ en: 'Warranty Questions?', vi: 'Câu Hỏi Về Bảo Hành?' })}
            </h2>
            <p className="text-gray-600 mb-6">
              {t({ 
                en: 'Our warranty specialists are here to help you understand your coverage.',
                vi: 'Các chuyên gia bảo hành của chúng tôi ở đây để giúp bạn hiểu phạm vi bảo hiểm của mình.'
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+15551234567"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition"
              >
                {t({ en: 'Call Warranty Support', vi: 'Gọi Hỗ Trợ Bảo Hành' })}
              </a>
              <a
                href="mailto:warranty@techstore.com"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                {t({ en: 'Email: warranty@techstore.com', vi: 'Email: warranty@techstore.com' })}
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}