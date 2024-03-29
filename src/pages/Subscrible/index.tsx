import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/Logo";

const CREATE_SUBSCRIBLE_MUTATION = gql`
  mutation CreateSubscrible($name:String!, $email:String!) {
  createSubscriber(data: {name: $name, email: $email}) {
    id
  }
}
`

export function Subscrible() {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBLE_MUTATION)
  async function handleSubscirble(e: FormEvent) {
    e.preventDefault()
    await createSubscriber({
      variables: {
        name,
        email
      }
    })
    navigate('/event')
  }
  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1000px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />
          <h1 className='mt-8 text-[2.5rem] leading-tight'>
            Construa uma <strong className="text-blue-500">aplicação completa, </strong>
            do zero, com <strong className="text-blue-500">React</strong></h1>
          <p className="mt-4 text-gray-200 leading-relaxed" >Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado. </p>
        </div>
        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl block">Inscreva-se gratuitamente</strong>
          <form onSubmit={handleSubscirble} className="flex flex-col gap-2 w-full">
            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="text"
              placeholder="Seu nome completo"
              onChange={e => setName(e.target.value)}
            />
            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="email"
              placeholder="Digite seu e-mail"
              onChange={e => setEmail(e.target.value)}
            />
            <button
              disabled={loading}
              type="submit"
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ">
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      <img src="/src/assets/fundocode.png" className="mt-10" alt="Ilustração do Visual code" />
    </div>
  )
}