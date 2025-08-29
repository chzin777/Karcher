'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ContactForm from './_components/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import ProductsSection from './_components/ProductsSection'
import { AnimatePresence, motion } from 'framer-motion'

export default function Home() {
  const [saturation, setSaturation] = useState(100);
  const [xOpacity, setXOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isMobile = window.innerWidth < 768;

      // Ajustar valores para diferentes tamanhos de tela
      const maxScrollForSaturation = isMobile ? 1500 : 2000;
      const currentStartScroll = isMobile ? 800 : 1250;
      const currentEndScroll = isMobile ? 1200 : 1900;

      const progressForSaturation = Math.min(scrollY / maxScrollForSaturation, 1);
      let newSaturation = 100 - Math.pow(progressForSaturation, 2) * 100;
      if (newSaturation < 0) newSaturation = 0;
      if (newSaturation > 100) newSaturation = 100;
      setSaturation(newSaturation);

      // Novo cálculo para o X
      let opacity = 0;
      if (scrollY >= currentStartScroll && scrollY <= currentEndScroll) {
        opacity = (scrollY - currentStartScroll) / (currentEndScroll - currentStartScroll);
      } else if (scrollY > currentEndScroll) {
        opacity = 1;
      } else {
        opacity = 0;
      }

      setXOpacity(opacity);
    };

    // Throttle scroll para performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Executar uma vez para definir valores iniciais
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);



  const [menuOpen, setMenuOpen] = useState(false)

  // Fechar menu ao redimensionar tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [menuOpen])

  const handleScroll = (e: React.MouseEvent<HTMLElement | HTMLAnchorElement>, target: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    console.log('handleScroll called with target:', target); // Debug
    
    // Fechar menu imediatamente para feedback visual
    setMenuOpen(false)
    
    // Aguardar um pequeno delay para a animação do menu
    setTimeout(() => {
      const section = document.querySelector(target)
      console.log('Section found:', section); // Debug
      
      if (section) {
        const headerHeight = window.innerWidth >= 768 ? 80 : 64;
        const rect = section.getBoundingClientRect();
        const offsetTop = window.pageYOffset + rect.top - headerHeight;
        
        console.log('Scrolling to:', offsetTop); // Debug
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }, 100);
  }

  // Função simplificada para navegação mobile
  const scrollToSection = (sectionId: string) => {
    // Fechar menu imediatamente
    setMenuOpen(false);
    
    // Pequeno delay para permitir que o menu feche
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      
      if (element) {
        const headerHeight = window.innerWidth >= 768 ? 80 : 64;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 200);
  };

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
        className="fixed top-0 left-0 w-full bg-black shadow z-[9999] flex items-center h-16 md:h-20"
      >

        <div className="flex items-center justify-between w-full px-4 md:px-6">
          <Link href="/" className="text-xl font-bold text-white flex items-center">
            <img src="/images/logo.png" alt="Logo R3 Suprimentos" className="h-10 md:h-16 w-auto object-contain" />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-4 sm:space-x-6">
            <a href="#produtos" onClick={(e) => handleScroll(e, '#produtos')} className="text-white hover:text-[#feed00] font-medium text-sm sm:text-base">Produtos</a>
            <a href="#beneficios" onClick={(e) => handleScroll(e, '#beneficios')} className="text-white hover:text-[#feed00] font-medium text-sm sm:text-base">Benefícios</a>
            <a href="#contato" onClick={(e) => handleScroll(e, '#contato')} className="text-white hover:text-[#feed00] font-medium text-sm sm:text-base">Contato</a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMenuOpen(prev => !prev);
            }}
            className="md:hidden focus:outline-none p-3 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Menu"
            type="button"
            style={{ 
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
          >
            <AnimatePresence mode="wait">
              {!menuOpen ? (
                <motion.svg
                  key="hamburger"
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.2 }}
                  className="w-6 h-6 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="close"
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.2 }}
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
              )}
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Overlay para fechar menu ao clicar fora */}
              <motion.div
                key="mobile-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 z-[9998] md:hidden"
                onClick={() => setMenuOpen(false)}
              />
              
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden bg-black border-t border-gray-800 absolute top-full left-0 w-full shadow-xl z-[9999]"
                style={{ zIndex: 9999 }}
              >
                <div className="px-4 py-6 space-y-2">
                  {[
                    { id: 'produtos', label: 'Produtos' },
                    { id: 'beneficios', label: 'Benefícios' },
                    { id: 'contato', label: 'Contato' }
                  ].map((item) => (
                    <div key={item.id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className="w-full text-left text-white hover:text-[#feed00] font-medium text-lg py-4 px-4 rounded-lg hover:bg-gray-900 transition-all duration-200 bg-transparent border-none focus:outline-none focus:bg-gray-900 active:bg-gray-800"
                        style={{ 
                          WebkitTapHighlightColor: 'transparent',
                          touchAction: 'manipulation'
                        }}
                      >
                        {item.label}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </motion.header>

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row min-h-screen w-full bg-[#feed00] overflow-hidden p-0 m-0 pt-16 md:pt-20"
      >
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left p-6 sm:p-8 md:p-10 bg-white text-black min-h-[60vh] md:min-h-screen"
        >
          {/* h2 só visível no desktop */}
          <h2 className="hidden md:block text-xl md:text-2xl uppercase tracking-wide text-gray-700 mb-2">
            Mais que produtos. Soluções que transformam seu negócio.
          </h2>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight mb-6 sm:mb-8 max-w-full">
            <span className="block sm:inline">SOLUÇÕES DE LIMPEZA</span>{" "}
            <span className="block sm:inline">PROFISSIONAL PARA</span>{" "}
            <span className="block sm:inline">SUPERMERCADOS,</span>{" "}
            <span className="block sm:inline">CENTROS LOGÍSTICOS</span>{" "}
            <span className="block sm:inline">E INDÚSTRIAS.</span>
            <br className="hidden md:block" />
            <span className="block text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 mt-2 md:mt-4">
              ALTA PERFORMANCE COM ECONOMIA REAL.
            </span>
          </h1>

          <a href="#produtos" className="w-full sm:w-auto">
            <button
              onClick={(e) => handleScroll(e, '#produtos')}
              className="w-full sm:w-auto bg-black text-white px-8 py-4 text-sm sm:text-base font-bold uppercase hover:text-[#feed00] transition-colors duration-300 rounded-lg sm:rounded-none shadow-lg hover:shadow-xl"
            >
              Explore Nossos Produtos
            </button>
          </a>
        </motion.div>

        {/* Imagem */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          className="w-full md:w-1/2 bg-[#feed00] flex items-center justify-center p-4 sm:p-6 md:p-0 min-h-[40vh] md:min-h-screen"
        >
          <img 
            src="/images/products.png" 
            alt="Equipamentos de limpeza profissional" 
            className="max-w-full h-auto object-contain max-h-[350px] sm:max-h-[450px] md:max-h-full" 
          />
        </motion.div>
      </motion.section>

      {/* BENEFÍCIOS */}
      <section className="bg-black text-white py-16 sm:py-24 md:py-52 px-4 sm:px-6 text-center" id='beneficios'>
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
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-12 sm:mb-16"
        >
          {[
            {
              title: 'EFICIÊNCIA E ECONOMIA DE TEMPO',
              description: 'Reduza o tempo de limpeza com equipamentos de alta performance.'
            },
            {
              title: 'GARANTA QUALIDADE E SEGURANÇA', 
              description: 'Trabalhe com equipamentos testados por grandes marcas, garantindo segurança.'
            },
            {
              title: 'REDUÇÃO DE TEMPO',
              description: 'Cubra grandes áreas em menos tempo com produtividade máxima.'
            }
          ].map((benefit, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="p-4 sm:p-6"
            >
              <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                {benefit.title}
              </h3>
              <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-400 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          className="mt-6 px-4"
        >
          <a
            href="#contato"
            onClick={(e) => handleScroll(e, '#contato')}
            className="inline-block bg-[#feed00] text-black px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold uppercase hover:bg-black hover:text-[#feed00] transition-all duration-300 rounded-lg md:rounded-none shadow-lg hover:shadow-xl w-full sm:w-auto"
          >
            Sim, quero ganhar produtividade com Karcher
          </a>
        </motion.div>
      </section>

      <section className='bg-black text-white text-center py-16 sm:py-20 px-4'>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          className='max-w-6xl mx-auto'
        >
          <h2 className="text-lg sm:text-xl md:text-4xl font-bold mb-8 sm:mb-12 leading-tight">
            <strong>SUA EQUIPE AINDA PERDE HORAS COM LIMPEZA MANUAL?</strong>
          </h2>

          <div className='relative w-full max-w-[900px] mx-auto p-4 sm:p-8 md:p-16'>
            <img
              src="/images/limpeza-manual.jpg"
              alt="Limpeza Manual"
              style={{
                filter: `saturate(${saturation}%)`,
                transition: 'filter 0.2s ease-out',
              }}
              className='w-full h-auto object-cover rounded-lg md:rounded-none shadow-lg'
            />
            <div
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
              style={{
                opacity: xOpacity,
                transition: 'opacity 0.2s ease-out',
              }}
            >
              <span
                className="text-red-500 font-bold leading-none drop-shadow-2xl"
                style={{
                  fontSize: 'clamp(80px, 15vw, 200px)',
                  textShadow: '0 0 30px rgba(0,0,0,0.8), 0 0 60px rgba(255,0,0,0.5)',
                }}
              >
                ✕
              </span>
            </div>
          </div>

          <h2 className="text-lg sm:text-xl md:text-4xl font-bold mt-8 sm:mt-12 leading-tight max-w-4xl mx-auto">
            <strong>
              SUA EQUIPE PODE FAZER MUITO MAIS:<br />
              <span className="text-[#feed00]">TROQUE O ESFORÇO MANUAL POR TECNOLOGIA INTELIGENTE DE LIMPEZA.</span>
            </strong>
          </h2>
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
        className="bg-[#feed00] py-12 sm:py-16 px-4 sm:px-6"
      >
        <ContactForm />
      </motion.section>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-black text-white py-12 sm:py-16 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <img src="/images/logo.png" alt="Logo R3 Suprimentos" className="h-8 sm:h-10 w-auto object-contain" />
              <span className="text-base sm:text-lg md:text-xl font-bold">SUPRIMENTOS</span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Trabalhe Conosco</h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                Faça parte de uma equipe focada em levar ao mundo uma solução inteligente.
              </p>

              <a
                href="https://r3suprimentos.gupy.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-[#feed00] text-[#feed00] px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base uppercase font-bold tracking-wide hover:bg-[#feed00] hover:text-black transition-all duration-300 rounded-lg md:rounded-none w-full sm:w-auto text-center"
              >
                Saiba mais
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end justify-between space-y-6 md:space-y-0">
            <div className="w-full md:w-auto">
              <h2 className="text-base sm:text-lg font-bold uppercase text-white mb-4">Acesse nossas redes:</h2>
              <div className="flex items-center space-x-4 sm:space-x-6 text-white text-xl sm:text-2xl">
                <Link 
                  href="https://www.instagram.com/r3suprimentos/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 hover:text-[#feed00] transition-colors duration-300 hover:bg-gray-900 rounded-lg"
                  aria-label="Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link 
                  href="https://www.linkedin.com/company/r3suprimentos/posts/?feedView=all" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 hover:text-[#feed00] transition-colors duration-300 hover:bg-gray-900 rounded-lg"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            © 2025 R3 Suprimentos. Todos os direitos reservados.
          </p>
        </div>
      </motion.footer>

    </main>
  )
}
