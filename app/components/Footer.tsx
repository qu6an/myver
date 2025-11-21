'use client';

import React from 'react';

interface FooterLink {
  title: string;
  url: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const footerColumns: FooterColumn[] = [
    {
      title: "АВТОКОМ",
      links: [
        { title: "О компании", url: "#" },
        { title: "Команда", url: "#" },
        { title: "Вакансии", url: "#" },
        { title: "Контакты", url: "#" }
      ]
    },
    {
      title: "Проекты",
      links: [
        { title: "EVERYCAR", url: "#" },
        { title: "ВИКТОРИНА", url: "#" },
        { title: "АВТОСЕРВИС ГОДА", url: "#" },
        { title: "АКАДЕМИЯ СТО", url: "#" }
      ]
    },
    {
      title: "Ресурсы",
      links: [
        { title: "Блог", url: "#" },
        { title: "База знаний", url: "#" },
        { title: "Вебинары", url: "#" },
        { title: "Подкасты", url: "#" }
      ]
    },
    {
      title: "Поддержка",
      links: [
        { title: "Помощь", url: "#" },
        { title: "FAQ", url: "#" },
        { title: "Сообщество", url: "#" },
        { title: "Связаться с нами", url: "#" }
      ]
    }
  ];

  return (
    <footer className="footer bg-white border-t border-gray-200 py-10 mt-10">
      <div className="footer-content max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {footerColumns.map((column, index) => (
          <div key={index} className="footer-column">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{column.title}</h3>
            <ul className="footer-links list-none">
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mb-2.5">
                  <a 
                    href={link.url} 
                    className="text-gray-600 hover:text-indigo-600 text-sm transition-colors duration-200"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom max-w-6xl mx-auto px-5 mt-10 pt-5 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <div>© 2025 АВТОКОМ. Все права защищены.</div>
        <div className="footer-social flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-indigo-600 transition-colors duration-200">
            <i className="fab fa-vk"></i>
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors duration-200">
            <i className="fab fa-telegram"></i>
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors duration-200">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;