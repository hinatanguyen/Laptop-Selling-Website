import { useLanguage } from '../context/LanguageContext'

export default function Terms() {
  const { t } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          {t({ en: 'Terms of Service', vi: 'Điều Khoản Dịch Vụ' })}
        </h1>
        
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <p className="text-blue-800">
            <strong>{t({ en: 'Effective Date:', vi: 'Ngày Hiệu Lực:' })}</strong> {t({ en: 'December 15, 2024', vi: '15 Tháng 12, 2024' })}
          </p>
          <p className="text-blue-700 mt-2">
            {t({ 
              en: 'Welcome to TechStore. By using our services, you agree to these terms. Please read them carefully.',
              vi: 'Chào mừng đến với TechStore. Bằng cách sử dụng dịch vụ của chúng tôi, bạn đồng ý với các điều khoản này. Vui lòng đọc kỹ.'
            })}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '1. Acceptance of Terms', vi: '1. Chấp Nhận Điều Khoản' })}
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700">
                {t({ 
                  en: 'By accessing and using TechStore\'s website, mobile applications, or services (collectively, the "Services"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
                  vi: 'Bằng cách truy cập và sử dụng trang web, ứng dụng di động hoặc dịch vụ của TechStore (gọi chung là "Dịch vụ"), bạn chấp nhận và đồng ý bị ràng buộc bởi các điều khoản và điều khoản của thỏa thuận này. Nếu bạn không đồng ý tuân thủ những điều trên, vui lòng không sử dụng dịch vụ này.'
                })}
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '2. Use License', vi: '2. Giấy Phép Sử Dụng' })}
            </h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-green-800">
                  {t({ en: 'Permitted Uses', vi: 'Sử Dụng Được Phép' })}
                </h3>
                <ul className="text-green-700 space-y-2">
                  <li>• {t({ en: 'Browse and purchase products for personal or business use', vi: 'Duyệt và mua sản phẩm cho mục đích cá nhân hoặc kinh doanh' })}</li>
                  <li>• {t({ en: 'Create and maintain user accounts', vi: 'Tạo và duy trì tài khoản người dùng' })}</li>
                  <li>• {t({ en: 'Access customer support and warranty services', vi: 'Truy cập hỗ trợ khách hàng và dịch vụ bảo hành' })}</li>
                  <li>• {t({ en: 'Use our mobile applications on your devices', vi: 'Sử dụng ứng dụng di động của chúng tôi trên thiết bị của bạn' })}</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-red-800">
                  {t({ en: 'Prohibited Uses', vi: 'Sử Dụng Bị Cấm' })}
                </h3>
                <ul className="text-red-700 space-y-2">
                  <li>• {t({ en: 'Use for any unlawful purpose or to solicit unlawful acts', vi: 'Sử dụng cho bất kỳ mục đích bất hợp pháp nào hoặc để kích động hành vi bất hợp pháp' })}</li>
                  <li>• {t({ en: 'Violate any international, federal, provincial, or state regulations or laws', vi: 'Vi phạm bất kỳ quy định hoặc luật quốc tế, liên bang, tỉnh hoặc tiểu bang nào' })}</li>
                  <li>• {t({ en: 'Infringe upon or violate our intellectual property rights or the rights of others', vi: 'Xâm phạm hoặc vi phạm quyền sở hữu trí tuệ của chúng tôi hoặc quyền của người khác' })}</li>
                  <li>• {t({ en: 'Harass, abuse, or harm another person', vi: 'Quấy rối, lạm dụng hoặc làm hại người khác' })}</li>
                  <li>• {t({ en: 'Use our service to transmit spam or malicious software', vi: 'Sử dụng dịch vụ của chúng tôi để truyền spam hoặc phần mềm độc hại' })}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '3. User Accounts', vi: '3. Tài Khoản Người Dùng' })}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary-600">
                  {t({ en: 'Account Creation', vi: 'Tạo Tài Khoản' })}
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• {t({ en: 'You must be 13 years or older', vi: 'Bạn phải từ 13 tuổi trở lên' })}</li>
                  <li>• {t({ en: 'Provide accurate and complete information', vi: 'Cung cấp thông tin chính xác và đầy đủ' })}</li>
                  <li>• {t({ en: 'Maintain the security of your password', vi: 'Duy trì bảo mật mật khẩu của bạn' })}</li>
                  <li>• {t({ en: 'Notify us of any unauthorized use', vi: 'Thông báo cho chúng tôi về bất kỳ việc sử dụng trái phép nào' })}</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary-600">
                  {t({ en: 'Account Responsibilities', vi: 'Trách Nhiệm Tài Khoản' })}
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• {t({ en: 'You are responsible for all account activity', vi: 'Bạn chịu trách nhiệm cho tất cả hoạt động tài khoản' })}</li>
                  <li>• {t({ en: 'Keep your contact information updated', vi: 'Giữ thông tin liên hệ của bạn được cập nhật' })}</li>
                  <li>• {t({ en: 'Comply with all applicable laws', vi: 'Tuân thủ tất cả luật hiện hành' })}</li>
                  <li>• {t({ en: 'Respect other users and our staff', vi: 'Tôn trọng người dùng khác và nhân viên của chúng tôi' })}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '4. Orders and Payments', vi: '4. Đơn Hàng và Thanh Toán' })}
            </h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-800">
                  {t({ en: 'Order Process', vi: 'Quy Trình Đặt Hàng' })}
                </h3>
                <p className="text-blue-700 mb-4">
                  {t({ 
                    en: 'When you place an order through our service, you warrant that:',
                    vi: 'Khi bạn đặt hàng thông qua dịch vụ của chúng tôi, bạn đảm bảo rằng:'
                  })}
                </p>
                <ul className="text-blue-700 space-y-2">
                  <li>• {t({ en: 'You are legally capable of entering into binding contracts', vi: 'Bạn có khả năng pháp lý để tham gia vào hợp đồng ràng buộc' })}</li>
                  <li>• {t({ en: 'You are at least 18 years old', vi: 'Bạn ít nhất 18 tuổi' })}</li>
                  <li>• {t({ en: 'The information provided is accurate and complete', vi: 'Thông tin cung cấp là chính xác và đầy đủ' })}</li>
                  <li>• {t({ en: 'You have the right to use any payment method provided', vi: 'Bạn có quyền sử dụng bất kỳ phương thức thanh toán nào được cung cấp' })}</li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-yellow-800">
                  {t({ en: 'Pricing and Availability', vi: 'Giá và Tình Trạng Có Sẵn' })}
                </h3>
                <ul className="text-yellow-700 space-y-2">
                  <li>• {t({ en: 'Prices are subject to change without notice', vi: 'Giá có thể thay đổi mà không cần thông báo' })}</li>
                  <li>• {t({ en: 'Product availability is not guaranteed until order confirmation', vi: 'Tình trạng có sẵn của sản phẩm không được đảm bảo cho đến khi xác nhận đơn hàng' })}</li>
                  <li>• {t({ en: 'We reserve the right to limit quantities', vi: 'Chúng tôi giữ quyền giới hạn số lượng' })}</li>
                  <li>• {t({ en: 'Promotional prices may have additional restrictions', vi: 'Giá khuyến mãi có thể có hạn chế bổ sung' })}</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-green-800">
                  {t({ en: 'Payment Terms', vi: 'Điều Khoản Thanh Toán' })}
                </h3>
                <ul className="text-green-700 space-y-2">
                  <li>• {t({ en: 'Payment is due at time of purchase', vi: 'Thanh toán phải trả vào thời điểm mua hàng' })}</li>
                  <li>• {t({ en: 'We accept major credit cards, PayPal, and other listed methods', vi: 'Chúng tôi chấp nhận thẻ tín dụng chính, PayPal và các phương thức được liệt kê khác' })}</li>
                  <li>• {t({ en: 'All payments are processed securely through encrypted connections', vi: 'Tất cả thanh toán được xử lý an toàn thông qua kết nối được mã hóa' })}</li>
                  <li>• {t({ en: 'Failed payments may result in order cancellation', vi: 'Thanh toán thất bại có thể dẫn đến hủy đơn hàng' })}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '5. Shipping and Delivery', vi: '5. Vận Chuyển và Giao Hàng' })}
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">
                    {t({ en: 'Delivery Terms', vi: 'Điều Khoản Giao Hàng' })}
                  </h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• {t({ en: 'Estimated delivery times are not guaranteed', vi: 'Thời gian giao hàng ước tính không được đảm bảo' })}</li>
                    <li>• {t({ en: 'Risk of loss passes to buyer upon delivery', vi: 'Rủi ro mất mát chuyển sang người mua khi giao hàng' })}</li>
                    <li>• {t({ en: 'Signature may be required for high-value orders', vi: 'Có thể yêu cầu chữ ký cho đơn hàng giá trị cao' })}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">
                    {t({ en: 'Shipping Restrictions', vi: 'Hạn Chế Vận Chuyển' })}
                  </h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• {t({ en: 'Some products have geographic restrictions', vi: 'Một số sản phẩm có hạn chế địa lý' })}</li>
                    <li>• {t({ en: 'Additional fees may apply for remote areas', vi: 'Phí bổ sung có thể áp dụng cho các khu vực xa xôi' })}</li>
                    <li>• {t({ en: 'Import duties are customer responsibility', vi: 'Thuế nhập khẩu là trách nhiệm của khách hàng' })}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '6. Returns and Exchanges', vi: '6. Trả Hàng và Đổi Hàng' })}
            </h2>
            
            <div className="bg-primary-50 rounded-lg p-6">
              <p className="text-primary-800 mb-4">
                {t({ 
                  en: 'Our return policy allows returns within 30 days of purchase for most items. Please see our detailed Return Policy for complete terms and conditions.',
                  vi: 'Chính sách trả hàng của chúng tôi cho phép trả hàng trong vòng 30 ngày kể từ khi mua đối với hầu hết các sản phẩm. Vui lòng xem Chính sách Trả hàng chi tiết của chúng tôi để biết các điều khoản và điều kiện đầy đủ.'
                })}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-primary-900 mb-2">
                    {t({ en: 'Return Conditions:', vi: 'Điều Kiện Trả Hàng:' })}
                  </h4>
                  <ul className="text-primary-700 space-y-1">
                    <li>• {t({ en: 'Items must be unused and in original packaging', vi: 'Sản phẩm phải chưa sử dụng và trong bao bì gốc' })}</li>
                    <li>• {t({ en: 'Original receipt or proof of purchase required', vi: 'Yêu cầu hóa đơn gốc hoặc bằng chứng mua hàng' })}</li>
                    <li>• {t({ en: 'Customer pays return shipping unless defective', vi: 'Khách hàng trả phí vận chuyển trả hàng trừ khi bị lỗi' })}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-900 mb-2">
                    {t({ en: 'Non-Returnable Items:', vi: 'Sản Phẩm Không Thể Trả:' })}
                  </h4>
                  <ul className="text-primary-700 space-y-1">
                    <li>• {t({ en: 'Custom or personalized products', vi: 'Sản phẩm tùy chỉnh hoặc cá nhân hóa' })}</li>
                    <li>• {t({ en: 'Software with opened packaging', vi: 'Phần mềm có bao bì đã mở' })}</li>
                    <li>• {t({ en: 'Items damaged by misuse', vi: 'Sản phẩm bị hư hỏng do sử dụng sai' })}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '7. Warranties and Disclaimers', vi: '7. Bảo Hành và Tuyên Bố Từ Chối' })}
            </h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-green-800">
                  {t({ en: 'Product Warranties', vi: 'Bảo Hành Sản Phẩm' })}
                </h3>
                <p className="text-green-700">
                  {t({ 
                    en: 'Products sold include manufacturer warranties as specified. TechStore provides additional warranty services as outlined in our Warranty Policy. We stand behind the quality of our products and will work to resolve any issues covered under warranty.',
                    vi: 'Sản phẩm bán bao gồm bảo hành của nhà sản xuất như quy định. TechStore cung cấp dịch vụ bảo hành bổ sung như được nêu trong Chính sách Bảo hành của chúng tôi. Chúng tôi đảm bảo chất lượng sản phẩm và sẽ làm việc để giải quyết bất kỳ vấn đề nào được bảo hành.'
                  })}
                </p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-yellow-800">
                  {t({ en: 'Service Disclaimers', vi: 'Tuyên Bố Từ Chối Dịch Vụ' })}
                </h3>
                <p className="text-yellow-700 mb-4">
                  {t({ 
                    en: 'While we strive to provide excellent service, please note:',
                    vi: 'Mặc dù chúng tôi nỗ lực cung cấp dịch vụ tuyệt vời, vui lòng lưu ý:'
                  })}
                </p>
                <ul className="text-yellow-700 space-y-2">
                  <li>• {t({ en: 'Website availability is not guaranteed 100% of the time', vi: 'Tính khả dụng của trang web không được đảm bảo 100% thời gian' })}</li>
                  <li>• {t({ en: 'Product information may contain technical inaccuracies', vi: 'Thông tin sản phẩm có thể chứa sai sót kỹ thuật' })}</li>
                  <li>• {t({ en: 'Third-party services are subject to their own terms', vi: 'Dịch vụ bên thứ ba tuân theo điều khoản riêng của họ' })}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '8. Limitation of Liability', vi: '8. Giới Hạn Trách Nhiệm' })}
            </h2>
            
            <div className="bg-red-50 rounded-lg p-6">
              <p className="text-red-800 font-semibold mb-4">
                {t({ en: 'IMPORTANT LEGAL NOTICE', vi: 'THÔNG BÁO PHÁP LÝ QUAN TRỌNG' })}
              </p>
              <p className="text-red-700 mb-4">
                {t({ 
                  en: 'In no event shall TechStore, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, punitive, consequential, or special damages, including lost profits, arising out of your use of the service.',
                  vi: 'Trong mọi trường hợp, TechStore, cũng như các giám đốc, nhân viên, đối tác, đại lý, nhà cung cấp hoặc chi nhanh của mình, không chịu trách nhiệm cho bất kỳ thiệt hại gián tiếp, ngẫu nhiên, trừng phạt, hậu quả hoặc đặc biệt nào, bao gồm lợi nhuận bị mất, phát sinh từ việc bạn sử dụng dịch vụ.'
                })}
              </p>
              <p className="text-red-700">
                {t({ 
                  en: 'Our total liability to you for any damages arising from your use of the service shall not exceed the amount you paid to us in the 12 months preceding the event giving rise to liability.',
                  vi: 'Tổng trách nhiệm của chúng tôi đối với bạn cho bất kỳ thiệt hại nào phát sinh từ việc bạn sử dụng dịch vụ sẽ không vượt quá số tiền bạn đã trả cho chúng tôi trong 12 tháng trước sự kiện gây ra trách nhiệm.'
                })}
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '9. Indemnification', vi: '9. Bồi Thường' })}
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700">
                {t({ 
                  en: 'You agree to defend, indemnify, and hold harmless TechStore and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney\'s fees).',
                  vi: 'Bạn đồng ý bảo vệ, bồi thường và giữ TechStore cùng với người được cấp phép và người cấp phép, cùng nhân viên, nhà thầu, đại lý, cán bộ và giám đốc của họ không bị tổn hại từ tất cả các khiếu nại, thiệt hại, nghĩa vụ, tổn thất, trách nhiệm, chi phí hoặc nợ, và chi phí (bao gồm nhưng không giới hạn phí luật sư).'
                })}
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '10. Termination', vi: '10. Chấm Dứt' })}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary-600">
                  {t({ en: 'Your Right to Terminate', vi: 'Quyền Chấm Dứt Của Bạn' })}
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• {t({ en: 'You may terminate your account at any time', vi: 'Bạn có thể chấm dứt tài khoản bất kỳ lúc nào' })}</li>
                  <li>• {t({ en: 'Contact customer service for assistance', vi: 'Liên hệ dịch vụ khách hàng để được hỗ trợ' })}</li>
                  <li>• {t({ en: 'Outstanding orders will be fulfilled', vi: 'Đơn hàng đang chờ sẽ được hoàn thành' })}</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-primary-600">
                  {t({ en: 'Our Right to Terminate', vi: 'Quyền Chấm Dứt Của Chúng Tôi' })}
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• {t({ en: 'We may suspend/terminate accounts for violations', vi: 'Chúng tôi có thể tạm ngừng/chấm dứt tài khoản do vi phạm' })}</li>
                  <li>• {t({ en: 'Notice will be provided when possible', vi: 'Thông báo sẽ được cung cấp khi có thể' })}</li>
                  <li>• {t({ en: 'Valid warranties remain in effect', vi: 'Bảo hành hợp lệ vẫn có hiệu lực' })}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '11. Governing Law', vi: '11. Luật Điều Chỉnh' })}
            </h2>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-blue-800">
                {t({ 
                  en: 'These Terms shall be interpreted and governed by the laws of the State of California, United States, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of our services will be resolved in the courts of San Francisco County, California.',
                  vi: 'Các Điều khoản này sẽ được giải thích và điều chỉnh bởi luật của Bang California, Hoa Kỳ, không quan tâm đến các quy định xung đột pháp luật. Bất kỳ tranh chấp nào phát sinh từ các Điều khoản này hoặc việc bạn sử dụng dịch vụ của chúng tôi sẽ được giải quyết tại tòa án của Quận San Francisco, California.'
                })}
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '12. Changes to Terms', vi: '12. Thay Đổi Điều Khoản' })}
            </h2>
            
            <div className="bg-yellow-50 rounded-lg p-6">
              <p className="text-yellow-800 mb-4">
                {t({ 
                  en: 'We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.',
                  vi: 'Chúng tôi giữ quyền sửa đổi hoặc thay thế các Điều khoản này bất kỳ lúc nào. Nếu một sửa đổi là quan trọng, chúng tôi sẽ cố gắng cung cấp thông báo ít nhất 30 ngày trước khi bất kỳ điều khoản mới nào có hiệu lực.'
                })}
              </p>
              <p className="text-yellow-700">
                {t({ 
                  en: 'Your continued use of the service after any such changes constitutes your acceptance of the new Terms of Service.',
                  vi: 'Việc bạn tiếp tục sử dụng dịch vụ sau bất kỳ thay đổi nào như vậy tạo thành sự chấp nhận của bạn đối với Điều khoản Dịch vụ mới.'
                })}
              </p>
            </div>
          </section>

          <section className="bg-primary-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t({ en: 'Questions About These Terms?', vi: 'Câu Hỏi Về Các Điều Khoản Này?' })}
            </h2>
            <p className="text-gray-600 mb-6">
              {t({ 
                en: 'If you have any questions about these Terms of Service, please contact us:',
                vi: 'Nếu bạn có bất kỳ câu hỏi nào về Điều khoản Dịch vụ này, vui lòng liên hệ với chúng tôi:'
              })}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="font-semibold text-gray-900">{t({ en: 'Email', vi: 'Email' })}</p>
                <p className="text-primary-600">legal@techstore.com</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900">{t({ en: 'Phone', vi: 'Điện Thoại' })}</p>
                <p className="text-primary-600">+1 (555) 123-4567</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900">{t({ en: 'Mail', vi: 'Thư' })}</p>
                <p className="text-primary-600">
                  TechStore Legal Dept<br />
                  123 Tech Street<br />
                  San Francisco, CA 94105
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}