import type React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto" style={{ backgroundColor: '#e9ecf2' }}>
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8" style={{ backgroundColor: '#e9ecf2' }}>
          {/* Brand */}
          <div className="footer-column">
            <h4 className="text-lg font-bold mb-4 text-gray-900">АВТОКОМ</h4>
            <ul className="footer-links space-y-2">
              <li><FooterLink href="https://autocom.parts/about/">О компании</FooterLink></li>
              <li><FooterLink href="https://autocom.parts/news/">Новости</FooterLink></li>
              <li><FooterLink href="https://autocom.parts/contacts/">Контакты</FooterLink></li>
              <li><FooterLink href="https://autocom.parts/partners/">Дистрибьюторы</FooterLink></li>
              <li><FooterLink href="https://autocom.parts/suppliers/">Производители</FooterLink></li>
            </ul>
          </div>

          {/* Projects */}
          <div className="footer-column">
            <h4 className="text-lg font-bold mb-4 text-gray-900">Проекты</h4>
            <ul className="footer-links space-y-2">
              <li><FooterLink href="https://lk.autocom.parts/game">Автомобильная викторина</FooterLink></li>
              <li><FooterLink href="https://autocom.parts/projects/evrikar.html">Партнерская программа EVERYCAR</FooterLink></li>
              <li><FooterLink href="https://autocom.parts/bestcto/">Автосервис года</FooterLink></li>
              <li><FooterLink href="https://autocom.parts/academy/">Академия СТО</FooterLink></li>
              <li><FooterLink href="#">Аттестация от производителей</FooterLink></li>
              <li><FooterLink href="https://myteamgar.ru/">Колл-центр MYTEAM</FooterLink></li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="footer-column">
            <h4 className="text-lg font-bold mb-4 text-gray-900">Контакты</h4>
            <div className="footer-contact space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-2"><i className="fas fa-phone mt-1 text-gray-600" /> <span>+7 (495) 858-52-99</span></div>
              <div className="flex items-start gap-2"><i className="fas fa-envelope mt-1 text-gray-600" /> <span>office@autocom.parts</span></div>
              <div className="flex items-start gap-2"><i className="fas fa-clock mt-1 text-gray-600" /> <span>Пн-Пт: 10:00-18:00</span></div>
              <div className="flex items-start gap-2"><i className="fas fa-map-marker-alt mt-1 text-gray-600" /> <span>117246, г. Москва, Научный проезд, дом 17, офис 8-30</span></div>
            </div>
          </div>

          {/* Social */}
          <div className="footer-column">
            <h4 className="text-lg font-bold mb-4 text-gray-900">Социальные сети</h4>
            <div className="footer-social-links flex flex-col gap-3 mt-4">
              <SocialLinkItem href="https://vk.com/autocom_parts" icon="vk" text="АВТОКОМ" />
              <SocialLinkItem href="https://t.me/avtoconf" icon="telegram" text="АВТОСЕРВИС КАК УСПЕШНЫЙ БИЗНЕС" />
              <SocialLinkItem href="https://t.me/akademiaGA" icon="telegram" text="Академия СТО" />
              <SocialLinkItem href="https://t.me/best_cto" icon="telegram" text="Автосервис года" />
            </div>
          </div>
        </div>

        <div className="footer-bottom border-t border-gray-200 pt-6 flex justify-between items-center flex-wrap gap-4 text-sm text-gray-600" style={{ backgroundColor: '#e9ecf2' }}>
          <div>© 2025 АВТОКОМ. Все права защищены.</div>
          <div className="footer-bottom-links flex gap-6 flex-wrap">
            <FooterLink href="#">Политика конфиденциальности</FooterLink>
            <FooterLink href="#">Политика обработки персональных данных</FooterLink>
            <FooterLink href="#">Согласие на обработку персональных данных</FooterLink>
            <FooterLink href="#">Согласие на обработку cookies</FooterLink>
            <FooterLink href="#">Оферта</FooterLink>
          </div>
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

function SocialLinkItem({ href, icon, text }: { href: string; icon: string; text: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600 transition-all duration-200 p-2 rounded border border-gray-200 hover:bg-blue-50 hover:border-blue-600 hover:translate-y-[-2px]"
    >
      <i className={`fa${icon === 'telegram' ? '-brands' : icon === 'video' ? '' : '-brands'} fa-${icon}`} />
      <span className="font-medium">{text}</span>
    </a>
  )
}
