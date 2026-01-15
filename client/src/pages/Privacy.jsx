import { useLanguage } from '../context/LanguageContext'

export default function Privacy() {
  const { t } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          {t({ en: 'Privacy Policy', vi: 'Chính Sách Bảo Mật' })}
        </h1>
        
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <p className="text-blue-800">
            <strong>{t({ en: 'Last Updated:', vi: 'Cập Nhật Lần Cuối:' })}</strong> {t({ en: 'December 15, 2024', vi: '15 Tháng 12, 2024' })}
          </p>
          <p className="text-blue-700 mt-2">
            {t({ 
              en: 'At TechStore, we are committed to protecting your privacy and ensuring the security of your personal information.',
              vi: 'Tại TechStore, chúng tôi cam kết bảo vệ quyền riêng tư của bạn và đảm bảo an ninh thông tin cá nhân của bạn.'
            })}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '1. Information We Collect', vi: '1. Thông Tin Chúng Tôi Thu Thập' })}
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  {t({ en: 'Personal Information', vi: 'Thông Tin Cá Nhân' })}
                </h3>
                <p className="text-gray-700 mb-4">
                  {t({ 
                    en: 'When you create an account, make a purchase, or contact us, we may collect:',
                    vi: 'Khi bạn tạo tài khoản, mua hàng hoặc liên hệ với chúng tôi, chúng tôi có thể thu thập:'
                  })}
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>{t({ en: 'Name and contact information (email, phone, address)', vi: 'Tên và thông tin liên hệ (email, điện thoại, địa chỉ)' })}</li>
                  <li>{t({ en: 'Payment information (processed securely by our payment partners)', vi: 'Thông tin thanh toán (được xử lý an toàn bởi đối tác thanh toán)' })}</li>
                  <li>{t({ en: 'Order history and preferences', vi: 'Lịch sử đặt hàng và sở thích' })}</li>
                  <li>{t({ en: 'Account credentials and profile information', vi: 'Thông tin đăng nhập và hồ sơ tài khoản' })}</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  {t({ en: 'Automatically Collected Information', vi: 'Thông Tin Tự Động Thu Thập' })}
                </h3>
                <p className="text-gray-700 mb-4">
                  {t({ 
                    en: 'When you use our website or services, we automatically collect:',
                    vi: 'Khi bạn sử dụng trang web hoặc dịch vụ của chúng tôi, chúng tôi tự động thu thập:'
                  })}
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>{t({ en: 'Browser and device information', vi: 'Thông tin trình duyệt và thiết bị' })}</li>
                  <li>{t({ en: 'IP address and location data', vi: 'Địa chỉ IP và dữ liệu vị trí' })}</li>
                  <li>{t({ en: 'Usage patterns and navigation behavior', vi: 'Mẫu sử dụng và hành vi điều hướng' })}</li>
                  <li>{t({ en: 'Cookies and similar tracking technologies', vi: 'Cookie và công nghệ theo dõi tương tự' })}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '2. How We Use Your Information', vi: '2. Cách Chúng Tôi Sử Dụng Thông Tin Của Bạn' })}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-green-800">
                  {t({ en: 'Service Delivery', vi: 'Cung Cấp Dịch Vụ' })}
                </h3>
                <ul className="text-green-700 space-y-2">
                  <li>• {t({ en: 'Process and fulfill orders', vi: 'Xử lý và thực hiện đơn hàng' })}</li>
                  <li>• {t({ en: 'Provide customer support', vi: 'Cung cấp hỗ trợ khách hàng' })}</li>
                  <li>• {t({ en: 'Send order confirmations and updates', vi: 'Gửi xác nhận và cập nhật đơn hàng' })}</li>
                  <li>• {t({ en: 'Manage returns and warranties', vi: 'Quản lý trả hàng và bảo hành' })}</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-blue-800">
                  {t({ en: 'Communication', vi: 'Giao Tiếp' })}
                </h3>
                <ul className="text-blue-700 space-y-2">
                  <li>• {t({ en: 'Send promotional emails (with consent)', vi: 'Gửi email khuyến mãi (với sự đồng ý)' })}</li>
                  <li>• {t({ en: 'Notify about new products and features', vi: 'Thông báo về sản phẩm và tính năng mới' })}</li>
                  <li>• {t({ en: 'Respond to inquiries and feedback', vi: 'Phản hồi yêu cầu và phản hồi' })}</li>
                  <li>• {t({ en: 'Send important account information', vi: 'Gửi thông tin tài khoản quan trọng' })}</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-purple-800">
                  {t({ en: 'Improvement', vi: 'Cải Tiến' })}
                </h3>
                <ul className="text-purple-700 space-y-2">
                  <li>• {t({ en: 'Analyze website usage and performance', vi: 'Phân tích việc sử dụng và hiệu suất trang web' })}</li>
                  <li>• {t({ en: 'Personalize user experience', vi: 'Cá nhân hóa trải nghiệm người dùng' })}</li>
                  <li>• {t({ en: 'Develop new features and services', vi: 'Phát triển tính năng và dịch vụ mới' })}</li>
                  <li>• {t({ en: 'Conduct research and analytics', vi: 'Thực hiện nghiên cứu và phân tích' })}</li>
                </ul>
              </div>

              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-orange-800">
                  {t({ en: 'Legal & Security', vi: 'Pháp Lý & Bảo Mật' })}
                </h3>
                <ul className="text-orange-700 space-y-2">
                  <li>• {t({ en: 'Comply with legal obligations', vi: 'Tuân thủ nghĩa vụ pháp lý' })}</li>
                  <li>• {t({ en: 'Prevent fraud and abuse', vi: 'Ngăn chặn gian lận và lạm dụng' })}</li>
                  <li>• {t({ en: 'Protect user safety and security', vi: 'Bảo vệ an toàn và bảo mật người dùng' })}</li>
                  <li>• {t({ en: 'Enforce our terms of service', vi: 'Thực thi điều khoản dịch vụ' })}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '3. Information Sharing', vi: '3. Chia Sẻ Thông Tin' })}
            </h2>
            
            <div className="bg-yellow-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-yellow-800">
                {t({ en: 'We Do Not Sell Your Personal Information', vi: 'Chúng Tôi Không Bán Thông Tin Cá Nhân Của Bạn' })}
              </h3>
              <p className="text-yellow-700">
                {t({ 
                  en: 'TechStore does not sell, rent, or trade your personal information to third parties for their marketing purposes.',
                  vi: 'TechStore không bán, cho thuê hoặc giao dịch thông tin cá nhân của bạn cho bên thứ ba cho mục đích tiếp thị của họ.'
                })}
              </p>
            </div>

            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              {t({ en: 'We may share information in these situations:', vi: 'Chúng tôi có thể chia sẻ thông tin trong những tình huống này:' })}
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>{t({ en: 'Service Providers:', vi: 'Nhà Cung Cấp Dịch Vụ:' })}</strong> {t({ en: 'Trusted partners who help us operate our business (payment processors, shipping companies, etc.)', vi: 'Đối tác đáng tin cậy giúp chúng tôi vận hành doanh nghiệp (xử lý thanh toán, công ty vận chuyển, v.v.)' })}</li>
              <li><strong>{t({ en: 'Legal Requirements:', vi: 'Yêu Cầu Pháp Lý:' })}</strong> {t({ en: 'When required by law, court order, or legal process', vi: 'Khi được yêu cầu bởi pháp luật, lệnh tòa án hoặc quy trình pháp lý' })}</li>
              <li><strong>{t({ en: 'Business Transfers:', vi: 'Chuyển Giao Kinh Doanh:' })}</strong> {t({ en: 'In connection with a merger, acquisition, or sale of assets', vi: 'Liên quan đến sáp nhập, mua lại hoặc bán tài sản' })}</li>
              <li><strong>{t({ en: 'Protection:', vi: 'Bảo Vệ:' })}</strong> {t({ en: 'To protect our rights, property, safety, or that of our users', vi: 'Để bảo vệ quyền, tài sản, an toàn của chúng tôi hoặc người dùng' })}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '4. Data Security', vi: '4. Bảo Mật Dữ Liệu' })}
            </h2>
            
            <div className="bg-green-50 rounded-lg p-6">
              <p className="text-green-800 mb-4">
                {t({ 
                  en: 'We implement comprehensive security measures to protect your personal information:',
                  vi: 'Chúng tôi triển khai các biện pháp bảo mật toàn diện để bảo vệ thông tin cá nhân của bạn:'
                })}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="text-green-700 space-y-2">
                  <li>• {t({ en: 'SSL/TLS encryption for data transmission', vi: 'Mã hóa SSL/TLS để truyền dữ liệu' })}</li>
                  <li>• {t({ en: 'Secure data storage and processing', vi: 'Lưu trữ và xử lý dữ liệu an toàn' })}</li>
                  <li>• {t({ en: 'Regular security audits and updates', vi: 'Kiểm tra và cập nhật bảo mật định kỳ' })}</li>
                </ul>
                <ul className="text-green-700 space-y-2">
                  <li>• {t({ en: 'Access controls and authentication', vi: 'Kiểm soát truy cập và xác thực' })}</li>
                  <li>• {t({ en: 'Employee training and confidentiality', vi: 'Đào tạo nhân viên và bảo mật' })}</li>
                  <li>• {t({ en: 'Incident response procedures', vi: 'Quy trình phản ứng sự cố' })}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '5. Your Rights and Choices', vi: '5. Quyền và Lựa Chọn Của Bạn' })}
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-primary-600">
                  {t({ en: 'Account Management', vi: 'Quản Lý Tài Khoản' })}
                </h3>
                <p className="text-gray-700">
                  {t({ 
                    en: 'Update, correct, or delete your account information anytime through your account settings.',
                    vi: 'Cập nhật, sửa chữa hoặc xóa thông tin tài khoản của bạn bất kỳ lúc nào thông qua cài đặt tài khoản.'
                  })}
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-primary-600">
                  {t({ en: 'Email Preferences', vi: 'Tùy Chọn Email' })}
                </h3>
                <p className="text-gray-700">
                  {t({ 
                    en: 'Unsubscribe from marketing emails using the link in any email or through your account preferences.',
                    vi: 'Hủy đăng ký email marketing bằng liên kết trong bất kỳ email nào hoặc thông qua tùy chọn tài khoản.'
                  })}
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-primary-600">
                  {t({ en: 'Cookie Control', vi: 'Kiểm Soát Cookie' })}
                </h3>
                <p className="text-gray-700">
                  {t({ 
                    en: 'Manage cookie preferences through your browser settings or our cookie preference center.',
                    vi: 'Quản lý tùy chọn cookie thông qua cài đặt trình duyệt hoặc trung tâm tùy chọn cookie của chúng tôi.'
                  })}
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-primary-600">
                  {t({ en: 'Data Portability', vi: 'Di Chuyển Dữ Liệu' })}
                </h3>
                <p className="text-gray-700">
                  {t({ 
                    en: 'Request a copy of your personal information in a structured, machine-readable format.',
                    vi: 'Yêu cầu bản sao thông tin cá nhân của bạn ở định dạng có cấu trúc, có thể đọc được bằng máy.'
                  })}
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '6. Cookies and Tracking', vi: '6. Cookie và Theo Dõi' })}
            </h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t({ en: 'Cookie Type', vi: 'Loại Cookie' })}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t({ en: 'Purpose', vi: 'Mục Đích' })}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t({ en: 'Duration', vi: 'Thời Gian' })}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {t({ en: 'Essential', vi: 'Cần Thiết' })}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {t({ en: 'Required for website functionality', vi: 'Bắt buộc cho chức năng trang web' })}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {t({ en: 'Session/Persistent', vi: 'Phiên/Lâu dài' })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {t({ en: 'Analytics', vi: 'Phân Tích' })}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {t({ en: 'Understanding user behavior and usage', vi: 'Hiểu hành vi và cách sử dụng của người dùng' })}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {t({ en: '2 years', vi: '2 năm' })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {t({ en: 'Marketing', vi: 'Tiếp Thị' })}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {t({ en: 'Personalized advertising and content', vi: 'Quảng cáo và nội dung được cá nhân hóa' })}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {t({ en: '1 year', vi: '1 năm' })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '7. International Transfers', vi: '7. Chuyển Giao Quốc Tế' })}
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                {t({ 
                  en: 'Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place:',
                  vi: 'Thông tin của bạn có thể được chuyển giao và xử lý ở các quốc gia khác. Chúng tôi đảm bảo có các biện pháp bảo vệ phù hợp:'
                })}
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>{t({ en: 'Adequacy decisions and standard contractual clauses', vi: 'Quyết định đầy đủ và điều khoản hợp đồng tiêu chuẩn' })}</li>
                <li>{t({ en: 'Binding corporate rules for intra-group transfers', vi: 'Quy tắc doanh nghiệp ràng buộc cho chuyển giao nội bộ tập đoàn' })}</li>
                <li>{t({ en: 'Certification schemes and codes of conduct', vi: 'Chương trình chứng nhận và quy tắc ứng xử' })}</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '8. Children\'s Privacy', vi: '8. Quyền Riêng Tư Trẻ Em' })}
            </h2>
            
            <div className="bg-red-50 rounded-lg p-6">
              <p className="text-red-800 font-semibold mb-2">
                {t({ en: 'Age Restriction: 13+', vi: 'Giới Hạn Tuổi: 13+' })}
              </p>
              <p className="text-red-700">
                {t({ 
                  en: 'Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we learn we have collected such information, we will delete it promptly.',
                  vi: 'Dịch vụ của chúng tôi không dành cho trẻ em dưới 13 tuổi. Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em dưới 13 tuổi. Nếu chúng tôi biết rằng chúng tôi đã thu thập thông tin như vậy, chúng tôi sẽ xóa ngay lập tức.'
                })}
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t({ en: '9. Changes to This Policy', vi: '9. Thay Đổi Chính Sách Này' })}
            </h2>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-blue-800">
                {t({ 
                  en: 'We may update this privacy policy periodically. We will notify you of significant changes through:',
                  vi: 'Chúng tôi có thể cập nhật chính sách bảo mật này định kỳ. Chúng tôi sẽ thông báo cho bạn về những thay đổi quan trọng thông qua:'
                })}
              </p>
              <ul className="list-disc pl-6 text-blue-700 mt-3 space-y-1">
                <li>{t({ en: 'Email notifications to registered users', vi: 'Thông báo email cho người dùng đã đăng ký' })}</li>
                <li>{t({ en: 'Prominent notices on our website', vi: 'Thông báo nổi bật trên trang web của chúng tôi' })}</li>
                <li>{t({ en: 'Updated "Last Modified" date at the top of this policy', vi: 'Ngày "Sửa Đổi Lần Cuối" được cập nhật ở đầu chính sách này' })}</li>
              </ul>
            </div>
          </section>

          <section className="bg-primary-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t({ en: 'Contact Us About Privacy', vi: 'Liên Hệ Với Chúng Tôi Về Quyền Riêng Tư' })}
            </h2>
            <p className="text-gray-600 mb-6">
              {t({ 
                en: 'If you have questions about this privacy policy or how we handle your information:',
                vi: 'Nếu bạn có câu hỏi về chính sách bảo mật này hoặc cách chúng tôi xử lý thông tin của bạn:'
              })}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="font-semibold text-gray-900">{t({ en: 'Email', vi: 'Email' })}</p>
                <p className="text-primary-600">privacy@techstore.com</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900">{t({ en: 'Phone', vi: 'Điện Thoại' })}</p>
                <p className="text-primary-600">+1 (555) 123-4567</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900">{t({ en: 'Mail', vi: 'Thư' })}</p>
                <p className="text-primary-600">
                  TechStore Privacy Team<br />
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