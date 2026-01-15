import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function FAQ() {
  const { t } = useLanguage()
  const [openFAQ, setOpenFAQ] = useState(null)

  const faqs = [
    {
      id: 1,
      question: t({ 
        en: 'What is your return policy?', 
        vi: 'Chính sách đổi trả của bạn như thế nào?' 
      }),
      answer: t({ 
        en: 'We offer a 30-day return policy on all products. Items must be in original condition with all accessories and packaging. Return shipping costs may apply.',
        vi: 'Chúng tôi cung cấp chính sách đổi trả trong 30 ngày cho tất cả sản phẩm. Sản phẩm phải ở tình trạng nguyên bản với tất cả phụ kiện và bao bì. Chi phí vận chuyển trả về có thể áp dụng.'
      })
    },
    {
      id: 2,
      question: t({ 
        en: 'How long does shipping take?', 
        vi: 'Vận chuyển mất bao lâu?' 
      }),
      answer: t({ 
        en: 'Standard shipping typically takes 3-7 business days. Express shipping (1-3 days) and overnight shipping options are available at checkout.',
        vi: 'Vận chuyển tiêu chuẩn thường mất 3-7 ngày làm việc. Các tùy chọn vận chuyển nhanh (1-3 ngày) và vận chuyển qua đêm có sẵn khi thanh toán.'
      })
    },
    {
      id: 3,
      question: t({ 
        en: 'Do you offer warranty on your products?', 
        vi: 'Bạn có cung cấp bảo hành cho sản phẩm không?' 
      }),
      answer: t({ 
        en: 'Yes, all products come with manufacturer warranty. Additionally, we offer extended warranty options for complete peace of mind.',
        vi: 'Có, tất cả sản phẩm đều đi kèm bảo hành của nhà sản xuất. Ngoài ra, chúng tôi cung cấp các tùy chọn bảo hành mở rộng để hoàn toàn yên tâm.'
      })
    },
    {
      id: 4,
      question: t({ 
        en: 'Can I track my order?', 
        vi: 'Tôi có thể theo dõi đơn hàng không?' 
      }),
      answer: t({ 
        en: 'Absolutely! Once your order ships, you\'ll receive a tracking number via email. You can also check your order status in your account dashboard.',
        vi: 'Hoàn toàn có thể! Khi đơn hàng được gửi, bạn sẽ nhận được mã theo dõi qua email. Bạn cũng có thể kiểm tra trạng thái đơn hàng trong bảng điều khiển tài khoản.'
      })
    },
    {
      id: 5,
      question: t({ 
        en: 'What payment methods do you accept?', 
        vi: 'Bạn chấp nhận những phương thức thanh toán nào?' 
      }),
      answer: t({ 
        en: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All transactions are secure and encrypted.',
        vi: 'Chúng tôi chấp nhận tất cả các thẻ tín dụng chính (Visa, MasterCard, American Express), PayPal và chuyển khoản ngân hàng. Tất cả giao dịch đều an toàn và được mã hóa.'
      })
    },
    {
      id: 6,
      question: t({ 
        en: 'Do you offer technical support?', 
        vi: 'Bạn có cung cấp hỗ trợ kỹ thuật không?' 
      }),
      answer: t({ 
        en: 'Yes, our technical support team is available Monday-Friday 9AM-6PM. You can reach us by phone, email, or live chat for any technical assistance.',
        vi: 'Có, đội ngũ hỗ trợ kỹ thuật của chúng tôi có mặt từ Thứ Hai đến Thứ Sáu 9h-18h. Bạn có thể liên hệ qua điện thoại, email hoặc chat trực tuyến để được hỗ trợ kỹ thuật.'
      })
    },
    {
      id: 7,
      question: t({ 
        en: 'Can I cancel my order after placing it?', 
        vi: 'Tôi có thể hủy đơn hàng sau khi đặt không?' 
      }),
      answer: t({ 
        en: 'Orders can be cancelled within 2 hours of placement if they haven\'t been processed yet. After that, you can return the item once received.',
        vi: 'Đơn hàng có thể được hủy trong vòng 2 giờ sau khi đặt nếu chưa được xử lý. Sau đó, bạn có thể trả lại sản phẩm khi nhận được.'
      })
    },
    {
      id: 8,
      question: t({ 
        en: 'Do you offer bulk discounts for businesses?', 
        vi: 'Bạn có cung cấp giảm giá số lượng lớn cho doanh nghiệp không?' 
      }),
      answer: t({ 
        en: 'Yes, we offer special pricing for bulk orders and business customers. Please contact our sales team for a custom quote.',
        vi: 'Có, chúng tôi cung cấp giá đặc biệt cho đơn hàng số lượng lớn và khách hàng doanh nghiệp. Vui lòng liên hệ đội ngũ bán hàng để được báo giá tùy chỉnh.'
      })
    }
  ]

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          {t({ en: 'Frequently Asked Questions', vi: 'Câu Hỏi Thường Gặp' })}
        </h1>

        <p className="text-lg text-gray-600 text-center mb-12">
          {t({ 
            en: 'Find answers to the most common questions about our products and services.',
            vi: 'Tìm câu trả lời cho những câu hỏi phổ biến nhất về sản phẩm và dịch vụ của chúng tôi.'
          })}
        </p>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-sm border">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
              >
                <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openFAQ === faq.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openFAQ === faq.id && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t({ en: 'Still have questions?', vi: 'Vẫn còn thắc mắc?' })}
          </h2>
          <p className="text-gray-600 mb-6">
            {t({ 
              en: 'Can\'t find the answer you\'re looking for? Our support team is here to help.',
              vi: 'Không tìm thấy câu trả lời bạn đang tìm kiếm? Đội ngũ hỗ trợ của chúng tôi sẵn sàng giúp đỡ.'
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
              {t({ en: 'Call Us', vi: 'Gọi Cho Chúng Tôi' })}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}