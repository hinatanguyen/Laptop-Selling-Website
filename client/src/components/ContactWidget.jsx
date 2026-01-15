import { PhoneIcon, ChatBubbleLeftRightIcon, EnvelopeIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const contactOptions = [
    {
      name: 'Phone Call',
      icon: PhoneIcon,
      href: 'tel:+15551234567',
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Call us now'
    },
    {
      name: 'WhatsApp',
      icon: ChatBubbleLeftRightIcon,
      href: 'https://wa.me/15551234567?text=Hi, I have a question about your products',
      color: 'bg-green-600 hover:bg-green-700',
      description: 'Chat on WhatsApp',
      target: '_blank'
    },
    {
      name: 'Facebook Messenger',
      icon: ChatBubbleLeftRightIcon,
      href: 'https://m.me/yourusername',
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'Message on Facebook',
      target: '_blank'
    },
    {
      name: 'Email',
      icon: EnvelopeIcon,
      href: 'mailto:support@techstore.com',
      color: 'bg-gray-600 hover:bg-gray-700',
      description: 'Send us an email'
    }
  ]

  return (
    <>
      {/* Contact Options Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Contact Options */}
          <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-3">
            {contactOptions.map((option) => (
              <a
                key={option.name}
                href={option.href}
                target={option.target}
                rel={option.target ? 'noopener noreferrer' : undefined}
                className={`${option.color} text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 flex items-center gap-3 group`}
                onClick={() => setIsOpen(false)}
              >
                <option.icon className="h-6 w-6" />
                <span className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-xs transition-all overflow-hidden">
                  {option.description}
                </span>
              </a>
            ))}
          </div>
        </>
      )}

      {/* Main Contact Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 ${
          isOpen ? 'rotate-45' : ''
        }`}
        aria-label="Contact us"
      >
        {isOpen ? (
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        )}
      </button>

      {/* Pulsing animation */}
      {!isOpen && (
        <span className="fixed bottom-6 right-6 z-40 flex h-16 w-16 pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
        </span>
      )}
    </>
  )
}
