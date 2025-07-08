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
    <div className="flex items-center justify-center w-full px-4 bg-[#feed00] py-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 w-full max-w-3xl px-6 sm:px-12 py-12 sm:py-20 lg:px-20 lg:py-24 bg-white shadow-xl rounded-3xl text-black border border-gray-300 text-base sm:text-2xl"
        >
          {/* Logo */}
          <div className="relative z-10 mb-8 sm:mb-10">
            <img
              src="/images/logo-2.png"
              alt="Logo da R3 Suprimentos"
              className="w-32 sm:w-52 h-auto mx-auto"
            />
          </div>

          {/* CTA */}
          <div className="max-w-3xl mx-auto mb-10 text-center space-y-4">
            <h2 className="text-2xl sm:text-4xl font-bold leading-tight">
              Pronto para transformar sua rotina com soluções inteligentes?
            </h2>
            <p className="text-base sm:text-xl leading-relaxed text-gray-700">
              Agende agora sua demonstração gratuita com os especialistas da R3 Suprimentos e veja na prática como a tecnologia pode revolucionar a sua limpeza.
            </p>
          </div>

          {/* Campos do formulário */}
          <div className="space-y-6">
            <FormField
              name="fullName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-10 text-base sm:h-14 sm:text-xl"
                      placeholder="Digite seu nome completo"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone com DDD</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-10 text-base sm:h-14 sm:text-xl"
                      placeholder="(XX) XXXXX-XXXX"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail profissional</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-10 text-base sm:h-14 sm:text-xl"
                      placeholder="email@empresa.com"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="company"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da empresa</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-10 text-base sm:h-14 sm:text-xl"
                      placeholder="Digite o nome da empresa"
                    />
                  </FormControl>
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
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      id="termos"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel htmlFor="termos" className="text-sm">
                    Estou de acordo com a{" "}
                    <a
                      href="https://www.r3suprimentos.com.br/politica-de-privacidade"
                      className="text-blue-600 underline hover:text-blue-800"
                      target="_blank"
                      rel="https://www.r3suprimentos.com.br/politica-de-privacidade"
                    >
                      política de privacidade
                    </a>{" "}
                    deste formulário.
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Botão */}
          <Button
            type="submit"
            className="w-full bg-[#219fda] text-white text-center text-base sm:text-xl py-6 sm:py-5 mt-4 leading-snug"
          >
            AGENDAR MINHA DEMONSTRAÇÃO<br className="block sm:hidden" /> GRATUITA!!
          </Button>
        </form>
      </Form>
    </div>
  )
}
