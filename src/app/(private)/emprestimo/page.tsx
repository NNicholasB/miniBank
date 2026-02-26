'use client'
import { useEffect, useState } from "react"


interface Emprestimo{
    id:number,
    nome:string,
    valor:number,
    valor_restante:number,
    status:string,
    taxa_juros:number,
    parcelas:number,
    data_criado:string
}
export default function Page(){
    const planos = [
  { nome: "Pessoal", taxa: 2.5 },
  { nome: "Premium", taxa: 1.8 },
  { nome: "Empresarial", taxa: 1.2 }
]
    const [emprestimos,setEmprestimos]=useState<Emprestimo[]>([])
    const [nome,setNome]=useState("")
    const[valor,setValor]=useState("")
    const[parcelas,setParcelas]=useState("")
    const[status,setStatus]=useState("")
    const[valorRestante,setValorRestante]=useState("")
    const [taxaJuros,setTaxaJuros]=useState("2.5")
    const [loading,setLoading]=useState(true)
    const [mostrarForm,setMostrarForm]=useState(false)
    const[planoSelecionado,setPlanoSelecionado]=useState("")

    async function carregarEmprestimos(){
        const res= await fetch("api/emprestimo")
        const data= await res.json()
        console.log(data,res.status)
        setEmprestimos(data)
        setLoading(false)
       
    }

    useEffect(()=>{
        carregarEmprestimos()
    },[])
  
    return(
        <div>
        <div>
<h1>emprestimo</h1>
        </div>
        <div>
            {loading && <p>Carregando . . .</p>}
            {emprestimos.map((e)=>
            ( <div key={e.id}>
                <p>Nome:{e.nome}</p>
                <p>
  Valor: {Number(e.valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })}
</p>
                <p>Taxa de Juros(a.m):{e.taxa_juros}</p>
                <p>Parcelas:{e.parcelas}</p>
                <p>
  Valor Restante: {Number(e.valor_restante).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })}
</p>
                <p>Status:{e.status}</p>
                <p>Data da Solicitacao:{new Date(e.data_criado).toLocaleDateString("pt-BR")}</p>
            </div>

            ))}
        </div>
       


       <div>
        <button onClick={()=>setMostrarForm(!mostrarForm)}>{mostrarForm ? "Fechar" :"Novo Emprestimo"} </button>
       </div>
       <div>
        {mostrarForm && (
  <form>
    <div>
        <label>Nome</label>
        <input type="text" value={nome} onChange={(e)=>setNome(e.target.value)} />
<select
  value={planoSelecionado}
  onChange={(e) => {
    const nomePlano = e.target.value
    setPlanoSelecionado(nomePlano)

    const plano = planos.find(p => p.nome === nomePlano)
    if (plano) {
      setTaxaJuros(plano.taxa.toString())
    }
  }}
>
  <option value="">Selecione um plano</option>
  {planos.map((plano) => (
    <option key={plano.nome} value={plano.nome}>
      {plano.nome} - {plano.taxa}% a.m
    </option>
  ))}
</select>  </div>
  </form>
)}
<label>Valor</label>
<input type="number" value={valor} onChange={(e)=>setValor(e.target.value)} />
       </div>
        </div>

        
        )
}