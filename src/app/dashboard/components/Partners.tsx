import React from 'react'
import LazyImage from './LazyImage'
import arnezi from '../assets/partners/arnezi.svg'
import azumi from '../assets/partners/azumi_logo.svg'
import bardahl from '../assets/partners/Bardahl.svg'
import febest from '../assets/partners/Febest.svg'
import ganz from '../assets/partners/ganz.svg'

const logos = [arnezi, azumi, bardahl, febest, ganz]

export default function Partners(){
  return (
    <section id="partners" className="py-20">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">Партнёры вашего успеха</h2>
        <p className="text-center text-slate-600 mb-8">Ведущие бренды автокомпонентов и жидкостей</p>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
          {logos.map((l,i) => (
            <div key={i} className="p-4 bg-white/80 border rounded-lg flex items-center justify-center">
              <LazyImage src={l} alt={`partner-${i}`} className="max-h-12" placeholder={''} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
