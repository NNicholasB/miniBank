'use client'
import { useEffect, useState } from "react"
import { calculos } from "../../../../utils/calculos"
import { handleEmprestimo } from "@/handles/handleEmprestimo"



interface Emprestimo{
    id:number,
    nome:string,
    valor:number,
    valor_restante:number,
    valor_parcelas:number,
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
   const [emprestimoNovo, setEmprestimoNovo] = useState({
  nome: "",
  valor: "",
  parcelas: "",
  valor_parcelas:"",
  valor_restante:"",
  taxa_juros: "",
  valor_total:"",
  plano: ""
})
    const [loading,setLoading]=useState(true)  
    const [mostrarForm,setMostrarForm]=useState(false)
  
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
  
const valorNumero = Number(emprestimoNovo.valor)
const taxaNumero = Number(emprestimoNovo.taxa_juros)
const parcelasNumero = Number(emprestimoNovo.parcelas)

const { valorTotal, valorParcelas } = calculos(
  valorNumero,
  taxaNumero,
  parcelasNumero
)
async function solicitarEmprestimo() {
const novoEmprestimo={
  nome:emprestimoNovo.nome,
  valor:valorNumero,
  parcelas:parcelasNumero,
  taxa_juros:taxaNumero,
  status:"ativo",
  valor_parcelas:valorParcelas,
  valor_total:valorTotal,
  valor_restante:valorTotal,
  data_criado:new Date().toISOString()}
  const res= await handleEmprestimo(novoEmprestimo)
  if(res.ok){
    await carregarEmprestimos()
    setMostrarForm(false)
    setEmprestimoNovo({
      nome: "",
      valor: "",
      parcelas: "",
      taxa_juros: "",
      plano: "",
      valor_parcelas: "",
      valor_restante: "",
      valor_total: ""
    })
  }else{
    console.log("erro ao criar emprestimo")
  }
  
 } return(
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
<p>Valor Parcelas:{Number(e.valor_parcelas).toLocaleString("pt-BR",{
  style:"currency",
  currency:"BRL"
}
  
)}</p>
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
  <form onSubmit={(e)=>{
    e.preventDefault()
    solicitarEmprestimo()
  }}>
    <div>
        <label>Nome</label>
        <input type="text" value={emprestimoNovo.nome} onChange={(e)=>setEmprestimoNovo({
          ...emprestimoNovo,nome:e.target.value
        })} />
<select
  value={emprestimoNovo.plano}
  onChange={(e) => {
    const planoSelecionado = planos.find(
      (p) => p.nome === e.target.value
    )

    setEmprestimoNovo({
      ...emprestimoNovo,
      plano: e.target.value,
      taxa_juros: planoSelecionado?.taxa.toString() || ""
    })
  }}
>
  <option value="">Selecione um plano</option>
  {planos.map((plano) => (
    <option key={plano.nome} value={plano.nome}>
      {plano.nome} - {plano.taxa}% a.m
    </option>
  ))}
</select>
<label>Valor</label>
<input type="number" value={emprestimoNovo.valor} onChange={(e)=>setEmprestimoNovo({...emprestimoNovo,valor:e.target.value})} />
<label>Parcelas</label>
<input type="number" value={emprestimoNovo.parcelas} onChange={(e)=>setEmprestimoNovo({...emprestimoNovo,parcelas:e.target.value})} />
<label>Valor Total:{valorTotal.toLocaleString("pt-BR",{
  style:"currency",
  currency:"BRL"
})}</label>
<label>Valor Parcelas: {valorParcelas.toLocaleString("pt-BR",{
  style:"currency",
  currency:"BRL"
})}</label>

<p></p>
<button>Solicitar</button>
 </div>

  </form>
)}

       </div>
        </div>

        
        )
}