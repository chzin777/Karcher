'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'

// 🧠 Validação com Zod
const schema = z.object({
  fullName: z.string().min(3, 'Informe o nome completo'),
  phone: z.string().min(8, 'Informe um telefone válido'),
  email: z.string().email({ message: 'E-mail inválido' }),
  company: z.string().min(2, 'Informe o nome da empresa'),
  termos: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Você precisa aceitar os termos e condições',
    }),
})

type ContactFormData = z.infer<typeof schema>

export default function ContactForm() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      company: '',
      termos: false,
    },
  })

  const handleSubmit = async (data: ContactFormData) => {
    if (!data.termos) {
      toast.error("Você precisa aceitar os termos e condições para continuar.")
      return
    }

    try {
      const nameParts = data.fullName.trim().split(' ')
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(' ') || 'Não informado'

      const payload = {
        firstName,
        lastName,
        email: data.email,
        phone: data.phone,
        company: data.company,
      }

      await fetch('https://r3suprimentos.app.n8n.cloud/webhook/482345e7-09d6-460d-b7ab-17a176b73f0f', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      toast.success('Formulário enviado com sucesso! Redirecionando para o WhatsApp...')

      const mensagemWhatsapp = encodeURIComponent(
        `Olá! Meu nome é ${data.fullName}, sou da empresa ${data.company} e gostaria de agendar uma demonstração!`
      )

      window.location.href = `https://wa.me/556281595786?text=${mensagemWhatsapp}`
    } catch (error) {
      toast.error('Erro ao enviar formulário. Tente novamente.')
      console.error(error)
    }
  }

  return (
    <div className="flex items-center justify-center w-full px-4 sm:px-6 bg-[#feed00] py-12 sm:py-16 md:py-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 sm:space-y-8 w-full max-w-4xl px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20 bg-white shadow-2xl rounded-2xl md:rounded-3xl text-black border border-gray-200"
        >
          {/* Logo */}
          <div className="relative z-10 mb-6 sm:mb-8 md:mb-10">
            <img
              src="/images/logo-2.png"
              alt="Logo da R3 Suprimentos"
              className="w-24 sm:w-32 md:w-40 lg:w-52 h-auto mx-auto"
            />
          </div>

          {/* CTA */}
          <div className="max-w-3xl mx-auto mb-8 sm:mb-10 text-center space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              Pronto para transformar sua rotina com soluções inteligentes?
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-700 px-2">
              Agende agora sua demonstração gratuita com os especialistas da R3 Suprimentos e veja na prática como a tecnologia pode revolucionar a sua limpeza.
            </p>
          </div>

          {/* Campos do formulário */}
          <div className="space-y-4 sm:space-y-6">
            <FormField
              name="fullName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base md:text-lg font-semibold">Nome completo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 sm:h-14 md:h-16 text-sm sm:text-base md:text-lg px-4 rounded-lg border-2 border-gray-300 focus:border-[#219fda] transition-colors"
                      placeholder="Digite seu nome completo"
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base md:text-lg font-semibold">Telefone com DDD</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 sm:h-14 md:h-16 text-sm sm:text-base md:text-lg px-4 rounded-lg border-2 border-gray-300 focus:border-[#219fda] transition-colors"
                      placeholder="(XX) XXXXX-XXXX"
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base md:text-lg font-semibold">E-mail profissional</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 sm:h-14 md:h-16 text-sm sm:text-base md:text-lg px-4 rounded-lg border-2 border-gray-300 focus:border-[#219fda] transition-colors"
                      placeholder="email@empresa.com"
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            <FormField
              name="company"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base md:text-lg font-semibold">Nome da empresa</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-12 sm:h-14 md:h-16 text-sm sm:text-base md:text-lg px-4 rounded-lg border-2 border-gray-300 focus:border-[#219fda] transition-colors"
                      placeholder="Digite o nome da empresa"
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />
          </div>

          {/* Checkbox de termos */}
          <FormField
            name="termos"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2 pt-4">
                <div className="flex items-start space-x-3">
                  <FormControl>
                    <Checkbox
                      id="termos"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1 w-5 h-5 sm:w-6 sm:h-6"
                    />
                  </FormControl>
                  <FormLabel htmlFor="termos" className="text-xs sm:text-sm md:text-base leading-relaxed cursor-pointer">
                    Estou de acordo com a{" "}
                    <a
                      href="https://www.r3suprimentos.com.br/politica-de-privacidade"
                      className="text-blue-600 underline hover:text-blue-800 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      política de privacidade
                    </a>{" "}
                    deste formulário.
                  </FormLabel>
                </div>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          {/* Botão */}
          <Button
            type="submit"
            className="w-full bg-[#219fda] hover:bg-[#1a7fb8] text-white text-center text-sm sm:text-base md:text-lg lg:text-xl font-bold py-4 sm:py-5 md:py-6 mt-6 sm:mt-8 leading-snug rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl uppercase"
          >
            <span className="block sm:hidden">
              AGENDAR DEMONSTRAÇÃO<br />GRATUITA!
            </span>
            <span className="hidden sm:block">
              AGENDAR MINHA DEMONSTRAÇÃO GRATUITA!
            </span>
          </Button>
        </form>
      </Form>
    </div>
  )
}
