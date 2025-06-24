'use client'
type ProductsSectionProps = {
  handleScroll: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, target: string) => void;
}


import { motion } from 'framer-motion'

export default function ProductsSection({ handleScroll }: ProductsSectionProps) {
  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  const products = [
    {
      title: 'BD Fit',
      image: 'https://mktkarcher.com.br/wp-content/uploads/2024/05/1783440_hero_03-Screen.jpg',
      function: 'Lavadora e Secadora de Piso Compacta',
      ideal: 'Pequenos espaços e circulação limitada',
      benefits: [
        'Até 3x mais autonomia com bateria AGM',
        'Redução de ruído e consumo com modo Eco!',
        'Design leve, fácil de manusear',
        'Equivalente a 3 operadores'
      ],
      direction: 'left'
    },
    {
      title: 'BD 50/50',
      image: 'https://mktkarcher.com.br/wp-content/uploads/2022/11/BD_50_50_Eletrica_19943610_Hero_02_RGB_JPG_96dpi.jpg',
      function: 'Lavadora e Secadora com Tanques de 50L',
      ideal: 'Supermercados, hospitais, escolas, indústrias e shoppings',
      benefits: [
        'Limpeza de até 7.000m²',
        'Alta produtividade com design compacto',
        'Performance consistente sem esforço humano',
        'Equivalente a 6 operadores'
      ],
      direction: 'right'
    },
    {
      title: 'HD 6/15',
      image: 'https://mktkarcher.com.br/wp-content/uploads/2022/11/HD_6_15_Cage_Plus_11506180_Hero_02_RGB_JPG_96dpi.jpg',
      function: 'Lavadora de Alta Pressão Profissional',
      ideal: 'Construção civil, lava-rápidos, condomínios',
      benefits: [
        'Pressão de até 150 bar',
        'Alta mobilidade e resistência',
        'Baixa manutenção, máxima durabilidade',
        'Versátil para ambientes severos'
      ],
      direction: 'left'
    },
    {
      title: 'Varredeira S6 Twin',
      image: '/images/image4.jpg',
      function: 'Varrição Profissional e Residencial',
      ideal: 'Limpeza externa eficiente',
      benefits: [
        'Capacidade de 3000m²/h',
        'Equivalente a 15 pessoas',
        'Fácil de manusear e armazenar',
        'Sem eletricidade, 100% manual'
      ],
      direction: 'right'
    },
  ]

  const formatTitle = (title: string) => {
    return title.split(' ').map((word, i) => (
      <span key={i}>
        {word}
        {i !== title.split(' ').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <section
      id="produtos"
      className="relative px-6 py-24 text-white bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg-produtos.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10">
        {products.map((product, index) => (
          <div
            key={index}
            className={`flex flex-col ${product.direction === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
              } min-h-[500px] relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-500 mb-32`}
          >
            {/* IMAGEM */}
            <motion.div
              variants={product.direction === 'left' ? fadeInLeft : fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3 }}
              className="w-full md:w-1/2 h-72 md:h-auto relative overflow-hidden"
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
              className={`w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-14 py-10 z-10 relative text-center md:text-left`}
            >
              <div className="max-w-3xl mx-auto md:mx-0 space-y-4">
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 text-yellow-400 uppercase tracking-wide leading-tight">
                  {formatTitle(product.title)}
                </h2>

                <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 mb-2">
                  <strong>{product.function}</strong>
                </p>

                <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 mb-4">
                  <strong>Ideal para:</strong> {product.ideal}
                </p>

                <div className="space-y-2 text-lg sm:text-xl md:text-2xl text-gray-200">
                  {product.benefits.map((benefit, i) => (
                    <p key={i} className="flex items-start gap-2 justify-center md:justify-start">
                      <span className="text-[#feed00] text-2xl">•</span>
                      <span>{benefit}</span>
                    </p>
                  ))}
                </div>

                {/* Botão ao lado de cada produto */}
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
                    Quero ver esse equipamento funcionando
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
