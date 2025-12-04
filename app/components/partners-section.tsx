"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const partners = [
  { name: "Arnezi", logo: "https://autocom.parts/i/banners/everycar_partnrs/arnezi.svg" },
  { name: "Azumi", logo: "https://autocom.parts/i/banners/everycar_partnrs/azumi_logo.svg" },
  { name: "Febest", logo: "https://autocom.parts/i/banners/everycar_partnrs/Febest.svg" },
  { name: "Ganz", logo: "https://autocom.parts/i/banners/everycar_partnrs/ganz.svg" },
  { name: "HL Mando", logo: "https://autocom.parts/i/banners/everycar_partnrs/hlmando.svg" },
  { name: "Jikiu", logo: "https://autocom.parts/i/banners/everycar_partnrs/jikiu.svg" },
  { name: "JP Group", logo: "https://autocom.parts/i/banners/everycar_partnrs/jp_logo.svg" },
  { name: "Korson", logo: "https://autocom.parts/i/banners/everycar_partnrs/Korson.svg" },
  { name: "Lavr", logo: "https://autocom.parts/i/banners/everycar_partnrs/lavr.svg" },
  { name: "Lynx", logo: "https://autocom.parts/i/banners/everycar_partnrs/LYNX.svg" },
  { name: "Mecafilter", logo: "https://autocom.parts/i/banners/everycar_partnrs/mecafilter.svg" },
  { name: "NGN", logo: "https://autocom.parts/i/banners/everycar_partnrs/NGN.svg" },
  { name: "NSP", logo: "https://autocom.parts/i/banners/everycar_partnrs/nsp.svg" },
    { name: "NTN", logo: "https://autocom.parts/i/banners/everycar_partnrs/NTN.svg" },
      { name: "Partra", logo: "https://autocom.parts/i/banners/everycar_partnrs/partra.svg" },
        { name: "SB", logo: "https://autocom.parts/i/banners/everycar_partnrs/sb.svg" },
          { name: "SIDEM", logo: "https://autocom.parts/i/banners/everycar_partnrs/sidemlogo.svg" },
            { name: "NTN", logo: "https://autocom.parts/i/banners/everycar_partnrs/snr.svg" },
              { name: "SpeedMate", logo: "https://autocom.parts/i/banners/everycar_partnrs/SpeedMate.svg" },
                { name: "standardSprings", logo: "https://autocom.parts/i/banners/everycar_partnrs/standardS.svg" },
                  { name: "Sufix", logo: "https://autocom.parts/i/banners/everycar_partnrs/SUFIX.svg" },
                    { name: "Tixona", logo: "https://autocom.parts/i/banners/everycar_partnrs/Tixona.svg" },

]

export function PartnersSection() {
  return (
    <section id="partners" className="py-20 md:py-28" style={{ backgroundColor: '#e9ecf2' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">Партнеры вашего успеха</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ведущие бренды автокомпонентов и жидкостей, доступные через платформу
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 fade-in">
          {partners.map((partner, index) => (
            <PartnerItem key={index} partner={partner} index={index} />
          ))}
        </div>

        <p className="text-center text-gray-500 mt-10 fade-in">
          Более 22 брендов-партнеров доступны через платформу АВТОКОМ
        </p>
      </div>
    </section>
  )
}

function PartnerItem({ partner, index }: { partner: (typeof partners)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center justify-center p-6 bg-white/70 backdrop-blur-md border border-gray-200/80 rounded-2xl hover:-translate-y-2 hover:shadow-lg hover:border-blue-600 transition-all duration-300 min-h-[120px]"
    >
      <Image
        src={partner.logo || "/placeholder.svg"}
        alt={partner.name}
        width={100}
        height={60}
        className="max-h-[60px] w-auto object-contain hover:scale-105 transition-transform duration-300"
      />
    </motion.div>
  )
}
