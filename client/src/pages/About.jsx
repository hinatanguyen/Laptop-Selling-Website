import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          {t({ en: 'About TechStore', vi: 'Về TechStore' })}
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t({ en: 'Our Story', vi: 'Câu Chuyện Của Chúng Tôi' })}
            </h2>
            <p className="text-gray-600 mb-6">
              {t({ 
                en: 'Founded in 2020, TechStore has been at the forefront of providing premium laptops and computer solutions to tech enthusiasts, professionals, and businesses alike. Our journey began with a simple vision: to make cutting-edge technology accessible to everyone.',
                vi: 'Được thành lập vào năm 2020, TechStore đã tiên phong trong việc cung cấp laptop cao cấp và giải pháp máy tính cho những người đam mê công nghệ, chuyên gia và doanh nghiệp. Hành trình của chúng tôi bắt đầu với một tầm nhìn đơn giản: làm cho công nghệ tiên tiến trở nên dễ tiếp cận với mọi người.'
              })}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t({ en: 'Our Mission', vi: 'Sứ Mệnh Của Chúng Tôi' })}
            </h2>
            <p className="text-gray-600 mb-6">
              {t({ 
                en: 'To deliver exceptional technology products and services that empower our customers to achieve their goals. We believe in quality, innovation, and customer satisfaction above all else.',
                vi: 'Mang đến các sản phẩm và dịch vụ công nghệ xuất sắc giúp khách hàng đạt được mục tiêu của họ. Chúng tôi tin vào chất lượng, sự đổi mới và sự hài lòng của khách hàng trên tất cả.'
              })}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t({ en: 'Why Choose Us', vi: 'Tại Sao Chọn Chúng Tôi' })}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-2">
                  {t({ en: 'Premium Quality', vi: 'Chất Lượng Cao Cấp' })}
                </h3>
                <p className="text-gray-600">
                  {t({ 
                    en: 'We carefully select only the best products from trusted brands to ensure quality and reliability.',
                    vi: 'Chúng tôi cẩn thận lựa chọn chỉ những sản phẩm tốt nhất từ các thương hiệu uy tín để đảm bảo chất lượng và độ tin cậy.'
                  })}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-2">
                  {t({ en: 'Expert Support', vi: 'Hỗ Trợ Chuyên Nghiệp' })}
                </h3>
                <p className="text-gray-600">
                  {t({ 
                    en: 'Our knowledgeable team is here to help you find the perfect solution for your needs.',
                    vi: 'Đội ngũ chuyên môn của chúng tôi luôn sẵn sàng giúp bạn tìm ra giải pháp hoàn hảo cho nhu cầu của bạn.'
                  })}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-2">
                  {t({ en: 'Fast Delivery', vi: 'Giao Hàng Nhanh' })}
                </h3>
                <p className="text-gray-600">
                  {t({ 
                    en: 'Quick and secure shipping with tracking available on all orders.',
                    vi: 'Vận chuyển nhanh chóng và an toàn với khả năng theo dõi trên tất cả các đơn hàng.'
                  })}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-2">
                  {t({ en: 'Warranty & Support', vi: 'Bảo Hành & Hỗ Trợ' })}
                </h3>
                <p className="text-gray-600">
                  {t({ 
                    en: 'Comprehensive warranty coverage and ongoing technical support for all our products.',
                    vi: 'Bảo hành toàn diện và hỗ trợ kỹ thuật liên tục cho tất cả sản phẩm của chúng tôi.'
                  })}
                </p>
              </div>
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t({ en: 'Contact Us Today', vi: 'Liên Hệ Với Chúng Tôi Ngay Hôm Nay' })}
            </h2>
            <p className="text-gray-600 mb-8">
              {t({ 
                en: 'Ready to find your next laptop or computer? Our team is here to help.',
                vi: 'Sẵn sàng tìm chiếc laptop hoặc máy tính tiếp theo của bạn? Đội ngũ chúng tôi luôn sẵn sàng hỗ trợ.'
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+15551234567" 
                className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition"
              >
                {t({ en: 'Call Us: +1 (555) 123-4567', vi: 'Gọi Cho Chúng Tôi: +1 (555) 123-4567' })}
              </a>
              <a 
                href="mailto:support@techstore.com" 
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                {t({ en: 'Email: support@techstore.com', vi: 'Email: support@techstore.com' })}
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}