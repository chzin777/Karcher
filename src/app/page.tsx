'use client'

import FormUse from './_components/Form'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import type { Variants } from 'framer-motion'

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 8])
  const logoOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const beneficios = [
    {
      title: 'Economia de tempo e redução de mão de obra'
    },
    {
      title: 'Menor consumo de água e energia'
    },
    {
      title: 'Equipamentos de última geração'
    },
    {
      title: 'Eficiência comprovada por grandes marcas'
    }
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const fadeInUp: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] },
    },
  }

  const fadeInLeft: Variants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.95,
      transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] },
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] },
    },
  }

  const fadeInRight: Variants = {
    hidden: {
      opacity: 0,
      x: 50,
      scale: 0.95,
      transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] },
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] },
    },
  }

  const products = [
    // (seu array de produtos continua exatamente igual)
    {
      title: 'BD Fit',
      image: '/images/image2.jpg',
      direction: 'left',
      isVertical: false,
      function: 'Lavadora e Secadora de Piso Compacta',
      ideal: 'Perfeita para pequenos espaços com circulação restrita, como corredores estreitos, salas comerciais e ambientes com obstáculos.',
      benefits: [
        'Até 3x mais autonomia com bateria AGM de longa duração.',
        'Modo Eco! para redução de ruído e menor consumo de energia.',
        'Design ultraleve com ergonomia avançada, facilitando o transporte e o uso por qualquer operador.',
        'Substitui o trabalho manual de até 3 pessoas, otimizando tempo e recursos.',
        'Solução ideal para quem busca produtividade e eficiência mesmo em áreas pequenas.',
      ],
    },
    {
      title: 'BD 50/50',
      image: '/images/image3.jpg',
      direction: 'right',
      isVertical: false,
      function: 'Lavadora e Secadora com Tanques de 50 Litros',
      ideal: 'Projetada para grandes áreas como supermercados, hospitais, escolas, indústrias e centros comerciais de alto fluxo.',
      benefits: [
        'Limpeza de até 7.000m² com uma única carga, garantindo maior cobertura por operação.',
        'Alta produtividade graças ao design compacto que facilita o deslocamento mesmo em espaços com obstáculos.',
        'Performance consistente, garantindo resultados de limpeza uniforme em todos os ambientes.',
        'Reduz a necessidade de esforço físico, sendo equivalente ao trabalho de 6 operadores.',
        'Ideal para locais com alta demanda de higienização rápida e eficiente.',
      ],
    },
    {
      title: 'HD 6/15',
      image: '/images/image5.jpg',
      direction: 'left',
      isVertical: false,
      function: 'Lavadora de Alta Pressão Profissional',
      ideal: 'Desenvolvida para construção civil, lava-rápidos, condomínios e áreas que exigem limpeza pesada.',
      benefits: [
        'Pressão máxima de até 150 bar, garantindo remoção eficaz de sujeiras incrustadas.',
        'Estrutura robusta com alta resistência a impactos e condições severas de uso.',
        'Equipamento com baixa manutenção e longa vida útil, oferecendo o melhor custo-benefício.',
        'Mobilidade garantida com design compacto e rodas reforçadas.',
        'Ideal para limpeza de pisos, fachadas, veículos e equipamentos industriais.',
      ],
    },
    {
      title: 'Varredeira S6 Twin',
      image: '/images/image4.jpg',
      direction: 'right',
      isVertical: false,
      function: 'Varrição Profissional e Residencial 100% Manual',
      ideal: 'Indicada para áreas externas como calçadas, estacionamentos, pátios, quadras e vias de acesso.',
      benefits: [
        'Capacidade de varrição de até 3.000m²/h, oferecendo agilidade e alta produtividade.',
        'Eficiência equivalente ao trabalho de 15 colaboradores com vassouras convencionais.',
        'Operação extremamente simples, sem necessidade de energia elétrica ou combustível.',
        'Estrutura leve e dobrável, facilitando o armazenamento após o uso.',
        'Solução sustentável, econômica e de baixo impacto ambiental para manutenção de áreas externas.',
      ],
    },
  ]

  return (
    <main className="w-full bg-gradient-to-b from-black via-gray-900 to-black text-white">

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center text-center px-6 py-24 overflow-hidden flex-col"
      >
        {/* Fundo da HERO */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://s1.kaercher-media.com/media/image/selection/80335/d0/parkplatzreinigung-mit-kehrmaschine.webp"
            alt="Limpeza Profissional"
            className="w-full h-full object-cover blur-[2px] scale-110 opacity-50"
          />
        </div>

        {/* Logo com animação de scroll */}
        <motion.div
          style={{ scale: logoScale, opacity: logoOpacity }}
          className="relative z-10 mb-8"
        >
          <img
            src="/images/logo.png"
            alt="Logo da R3 Suprimentos"
            className="w-40 sm:w-52 h-auto mx-auto drop-shadow-lg"
          />
        </motion.div>

        {/* Título e descrição */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl"
        >
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight">
            Mais que produtos. Soluções que transformam seu negócio.
          </h1>
          <p className="text-xl sm:text-2xl leading-relaxed text-gray-200">
            Tecnologia, eficiência e performance em higiene profissional para você focar no que realmente importa: o crescimento do seu negócio.
          </p>
        </motion.div>
      </section>


      {/* PRODUTOS */}
      <section
        className="relative px-6 py-24 text-white bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg-produtos.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="relative z-10">
          {products.map((product, index) => (
            <div
              key={index}
              className={`flex flex-col ${product.direction === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
                } min-h-[500px] relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-500 mb-40`}
            >
              {/* IMAGEM */}
              <motion.div
                variants={product.direction === 'left' ? fadeInLeft : fadeInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3 }}
                className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden"
              >
                <div className="w-full h-full relative group transition duration-500 ease-in-out hover:scale-105 hover:brightness-110">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 pointer-events-none transition-all duration-500 ${product.direction === 'left'
                      ? 'bg-gradient-to-l from-[#040d1b]/95 via-transparent to-transparent'
                      : 'bg-gradient-to-r from-[#040d1b]/95 via-transparent to-transparent'
                      } group-hover:opacity-90`}
                  ></div>
                </div>
              </motion.div>

              {/* TEXTO */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3 }}
                className="w-full md:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-8 py-6 z-10 relative"
              >
                <div className="max-w-3xl mx-auto text-justify space-y-6">
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-yellow-400">{product.title}</h2>

                  <p className="text-base sm:text-xl leading-relaxed text-gray-200">
                    <strong>{product.function}</strong>
                  </p>

                  <p className="text-base sm:text-xl leading-relaxed text-gray-200">
                    <strong>Ideal para:</strong> {product.ideal}
                  </p>

                  <div className="space-y-4 text-sm sm:text-lg leading-relaxed">
                    {product.benefits.map((benefit, i) => (
                      <p key={i} className="flex items-start gap-2">
                        <span className="text-purple-400 text-lg">✔️</span>
                        <span>{benefit}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFÍCIOS GERAIS INTERATIVOS */}
      <section className="relative px-6 py-24 bg-gradient-to-b from-[#233261] via-[#1b2a47] to-[#233261] text-white text-center overflow-hidden">
        {/* Fundo decorativo */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>

        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-4xl sm:text-5xl font-extrabold mb-12 tracking-tight drop-shadow"
        >
          Benefícios das Nossas Soluções
        </motion.h2>

        {/* Lista de Benefícios */}
        <ul className="max-w-4xl mx-auto space-y-6 text-center">
          {beneficios.map((beneficio, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
              viewport={{ once: false, amount: 0.3 }}
              className="bg-white/5 rounded-lg shadow-md cursor-pointer hover:bg-white/10 transition p-4 flex justify-center items-center gap-4 text-center w-full"
            >
              <span className="text-lg sm:text-xl leading-relaxed font-semibold">
                {beneficio.title}
              </span>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* CTA FINAL + FORMULÁRIO */}
      <section className="px-6 py-24 bg-[#111] text-white text-center">

        <div className="max-w-4xl mx-auto text-left">
          <FormUse />
        </div>
      </section>

      {/* FOOTER */}
      <footer className='bg-[#4a4a49] text-white text-center py-6 text-sm sm:text-base'>
        <p>© {new Date().getFullYear()} R3 Suprimentos. Todos os direitos reservados.</p>
      </footer>
    </main>
  )
}
