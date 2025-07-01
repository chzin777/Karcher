'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ContactForm from './_components/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import ProductsSection from './_components/ProductsSection'
import { AnimatePresence, motion } from 'framer-motion'

export const metadata = {
  title: "Limpeza Profissional | R3 Suprimentos",
  description: "Soluções de limpeza profissional para supermercados, centros logísticos e indústrias com equipamentos de alta performance.",
  keywords: ["limpeza profissional", "equipamentos de limpeza", "limpeza industrial", "suprimentos para limpeza", "R3 Suprimentos"],
  robots: "index, follow",
  authors: [{ name: "R3 Suprimentos", url: "https://r3suprimentos.com.br" }],
  openGraph: {
    title: "R3 Suprimentos | Limpeza Profissional de Alta Performance",
    description: "A R3 Suprimentos oferece soluções de limpeza profissional com economia e tecnologia para empresas.",
    url: "https://karcher-r3.com.br",
    siteName: "R3 Suprimentos",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Imagem de limpeza profissional"
      }
    ],
    type: "website",
  },
}

export default function Home() {
  const [saturation, setSaturation] = useState(100);
  const [xOpacity, setXOpacity] = useState(0);
  const startScroll = 1250;  // Onde o X começa a aparecer
  const endScroll = 1900;    // Onde o X fica 100% visível

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      const maxScrollForSaturation = 2000;
      const progressForSaturation = Math.min(scrollY / maxScrollForSaturation, 1);
      let newSaturation = 100 - Math.pow(progressForSaturation, 2) * 100;
      if (newSaturation < 0) newSaturation = 0;
      if (newSaturation > 100) newSaturation = 100;
      setSaturation(newSaturation);

      // Novo cálculo para o X
      let opacity = 0;
      if (scrollY >= startScroll && scrollY <= endScroll) {
        opacity = (scrollY - startScroll) / (endScroll - startScroll);  // Normaliza de 0 até 1
      } else if (scrollY > endScroll) {
        opacity = 1;
      } else {
        opacity = 0;
      }

      setXOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const [menuOpen, setMenuOpen] = useState(false)

  const handleScroll = (e: React.MouseEvent<HTMLElement, MouseEvent>, target: string) => {
    e.preventDefault()
    const section = document.querySelector(target)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <main>

      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative top-0 left-0 w-full bg-black shadow z-50 flex items-center h-20"
      >

        <div className="flex items-center justify-between w-full px-4 sm:px-6">
          <Link href="/" className="text-xl font-bold text-white flex items-center">
            <img src="/images/logo.png" alt="Logo R3 Suprimentos" className="h-12 sm:h-16 w-auto object-contain" />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-4 sm:space-x-6">
            <a href="#produtos" onClick={(e) => handleScroll(e, '#produtos')} className="text-white hover:text-[#feed00] font-medium text-sm sm:text-base">Produtos</a>
            <a href="#beneficios" onClick={(e) => handleScroll(e, '#beneficios')} className="text-white hover:text-[#feed00] font-medium text-sm sm:text-base">Benefícios</a>
            <a href="#contato" onClick={(e) => handleScroll(e, '#contato')} className="text-white hover:text-[#feed00] font-medium text-sm sm:text-base">Contato</a>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden focus:outline-none">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-black px-6 py-4 space-y-2 shadow absolute top-full left-0 w-full flex flex-col items-end text-right"
            >
              <a
                href="#produtos"
                onClick={(e) => handleScroll(e, '#produtos')}
                className="block text-white hover:text-[#feed00]"
              >
                Produtos
              </a>
              <a
                href="#beneficios"
                onClick={(e) => handleScroll(e, '#beneficios')}
                className="block text-white hover:text-[#feed00]"
              >
                Benefícios
              </a>
              <a
                href="#contato"
                onClick={(e) => handleScroll(e, '#contato')}
                className="block text-white hover:text-[#feed00]"
              >
                Contato
              </a>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.header>

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row min-h-screen w-full bg-[#feed00] overflow-hidden p-0 m-0"
      >
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left p-6 md:p-10 bg-white text-black"
        >
          {/* h2 só visível no desktop */}
          <h2 className="hidden md:block text-xl md:text-2xl uppercase tracking-wide text-gray-700 mb-2">
            Mais que produtos. Soluções que transformam seu negócio.
          </h2>

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
            SOLUÇÕES DE LIMPEZA PROFISSIONAL PARA SUPERMERCADOS, CENTROS LOGÍSTICOS E INDÚSTRIAS. <br></br> ALTA PERFORMANCE COM ECONOMIA REAL.
          </h1>

          <a href="#produtos">
            <button
              onClick={(e) => handleScroll(e, '#produtos')}
              className="bg-black text-white px-6 py-3 text-sm font-bold uppercase hover:text-[#feed00] transition"
            >
              Explore
            </button>
          </a>
        </motion.div>

        {/* Imagem */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          className="w-full md:w-1/2 bg-[#feed00] flex items-center justify-center p-4 sm:p-0"
        >
          <img src="/images/products.png" alt="Equipamentos de limpeza profissional" className="max-w-full h-auto object-contain" />
        </motion.div>
      </motion.section>

      {/* BENEFÍCIOS */}
      <section className="bg-black text-white py-24 px-4 sm:py-52 sm:px-6 text-center" id='beneficios'>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 }
            }
          }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-16"
        >
          {['EFICIÊNCIA E ECONOMIA DE TEMPO', 'GARANTA QUALIDADE E SEGURANÇA', 'REDUÇÃO DE TEMPO'].map((title, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">{title}</h3>
              <p className="text-base sm:text-xl md:text-2xl text-gray-400">
                {i === 0 && 'Reduza o tempo de limpeza com equipamentos de alta performance.'}
                {i === 1 && 'Trabalhe com equipamentos testados por grandes marcas, garantindo segurança.'}
                {i === 2 && 'Cubra grandes áreas em menos tempo com produtividade máxima.'}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          className="mt-6"
        >
          <a
            href="#contato"
            onClick={(e) => handleScroll(e, '#contato')}
            className="inline-block bg-[#feed00] text-black px-6 py-3 text-base sm:text-lg font-bold uppercase hover:bg-black hover:text-[#feed00] transition"
          >
            Sim, quero ganhar produtividade com Karcher
          </a>
        </motion.div>
      </section>

      <section className='text-white text-center text-xl md:text-4xl '>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          className='mt-06'
        >
          <strong>SUA EQUIPE AINDA PERDE HORAS COM LIMPEZA MANUAL?</strong>

          <div className='relative w-full max-w-[1000px] mx-auto p-16'>
            <img
              src="/images/limpeza-manual.jpg"
              alt="Limpeza Manual"
              style={{
                filter: `saturate(${saturation}%)`,
                transition: 'filter 0.2s ease-out',
              }}
              className='w-full object-cover'
            />
            <div
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
              style={{
                opacity: xOpacity,
                transition: 'opacity 0.2s ease-out',
              }}
            >
              <span
                style={{
                  color: 'red',
                  fontSize: '200px',
                  fontWeight: 'bold',
                  lineHeight: '1',
                  textShadow: '0 0 20px rgba(0,0,0,0.7)',
                }}
              >
                X
              </span>
            </div>
          </div>

          <strong>SUA EQUIPE PODE FAZER MUITO MAIS: <br /> TROQUE O ESFORÇO MANUAL POR TECNOLOGIA INTELIGENTE DE LIMPEZA.</strong>
        </motion.div>
      </section>

      <ProductsSection handleScroll={handleScroll} />

      {/* FORMULÁRIO */}
      <motion.section
        id="contato"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-[#feed00] py-12 px-4 sm:py-16"
      >
        <ContactForm />
      </motion.section>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-black text-white py-10 sm:py-16 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center space-x-4">
              <img src="/images/logo.png" alt="Logo R3 Suprimentos" className="h-8 sm:h-10 w-auto object-contain" />
              <span className="text-lg sm:text-xl font-bold">SUPRIMENTOS</span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Trabalhe Conosco</h2>
              <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6">
                Faça parte de uma equipe focada em levar ao mundo uma solução inteligente.
              </p>

              <a
                href="https://r3suprimentos.gupy.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-[#feed00] text-[#feed00] px-4 py-2 sm:px-6 sm:py-3 uppercase font-bold tracking-wide hover:bg-[#feed00] hover:text-black transition"
              >
                Saiba mais
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end justify-between">
            <h2 className="text-base sm:text-lg font-bold uppercase text-white mb-2 sm:mb-4"></h2>
            <div className="flex space-x-4 sm:space-x-6 text-white text-xl sm:text-2xl">
              <h2 className="text-base sm:text-lg font-bold uppercase text-white mb-2 sm:mb-4">Acesse:</h2>
              <Link href="https://www.instagram.com/r3suprimentos/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="hover:text-[#feed00] transition" />
              </Link>
              <Link href="https://www.linkedin.com/company/r3suprimentos/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedinIn} className="hover:text-[#feed00] transition" />
              </Link>
            </div>
          </div>
        </div>
      </motion.footer>

    </main>
  )
}
