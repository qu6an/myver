"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/80"
          : "bg-white/70 backdrop-blur-md border-b border-gray-200/60"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="transition-transform hover:scale-105">
            <Image
              src="https://autocom.parts/i/logo.svg"
              alt="АВТОКОМ"
              width={160}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="#features">Преимущества</NavLink>
            <NavLink href="#projects">Проекты</NavLink>
            <NavLink href="#dashboard">Личный кабинет</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-transparent border border-gray-300 rounded-xl hover:bg-gray-50 hover:-translate-y-0.5 transition-all duration-200">
              Войти
            </button>
            <button className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">Создать аккаунт</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative text-gray-600 font-medium py-2 group transition-colors hover:text-gray-900">
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
    </Link>
  )
}
