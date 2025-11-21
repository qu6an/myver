import type React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-50/50 border-t border-gray-200/50 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="font-bold text-xl mb-4 text-gray-900">АВТОКОМ</div>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Платформа управления автосервисом с геймификацией, аналитикой и мотивацией персонала.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon="telegram" />
              <SocialLink href="#" icon="vk" />
              <SocialLink href="#" icon="youtube" />
            </div>
          </div>

          {/* Contacts */}
          <div>
            <div className="font-bold text-lg mb-4 text-gray-900">Контакты</div>
            <div className="space-y-3 text-sm text-gray-600">
              <div>Поддержка: +7 (495) 123-45-67</div>
              <div>E-mail: info@autocom.parts</div>
              <div>Техподдержка: 24/7</div>
            </div>
          </div>

          {/* Documents */}
          <div>
            <div className="font-bold text-lg mb-4 text-gray-900">Документы</div>
            <div className="space-y-3">
              <FooterLink href="#">Политика конфиденциальности</FooterLink>
              <FooterLink href="#">Пользовательское соглашение</FooterLink>
              <FooterLink href="#">Оферта</FooterLink>
            </div>
          </div>

          {/* Sections */}
          <div>
            <div className="font-bold text-lg mb-4 text-gray-900">Разделы</div>
            <div className="space-y-3">
              <FooterLink href="#features">Преимущества</FooterLink>
              <FooterLink href="#projects">Проекты</FooterLink>
              <FooterLink href="#dashboard">Дашборд</FooterLink>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          © 2025 АВТОКОМ — Платформа управления автосервисом. Все права защищены.
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon }: { href: string; icon: string }) {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
    >
      <i className={`fa-brands fa-${icon}`} />
    </a>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <div>
      <Link href={href} className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
        {children}
      </Link>
    </div>
  )
}
