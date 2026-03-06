'use client'

import { useEffect, useState } from "react"

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
    const [loading,setLoading]=useState(true)
    const [emprestimos,setEmprestimos]=useState<Emprestimo[]>([])
    const [selecionado,setSelecionado]=useState<Emprestimo|null>(null)


    async function carregarEmprest() {
        const res=await fetch("api/emprestimo")
        const data= await res.json()
        setEmprestimos(data)
        setLoading(false)
        
    }
    function selecionarEmprestimo(e:Emprestimo){
        setSelecionado(e)
    }
    useEffect(()=>{
        carregarEmprest()
    },[])
    return(
        <div>
            <div>
<h1>Pagamentos</h1>
            </div>
<div>
    {loading && <p>Carregando . . .</p>}
    {emprestimos.map((e)=>
    ( <div key={e.id} onClick={()=>selecionarEmprestimo(e)}>
        <p>Nome:{e.nome}</p>
        <p>Data:{new Date(e.data_criado).toLocaleDateString("pt-BR")} </p>
        <p>Status:{e.status}</p>
        <p>Valor Solicitado:{Number(e.valor).toLocaleString("pt-BR",{
            style:"currency",
            currency:"BRL"
        })}</p>
        <p>Valor Total:{Number(e.valor_restante).toLocaleString("pt-BR",{
            style:"currency",
            currency:"BRL"
        })}</p>
        <p>Valor Parcelas:{Number(e.valor_parcelas).toLocaleString("pt-BR",{
            style:"currency",
            currency:"BRL"
        })}</p>
        <p>Quantidade de Parcelas:{e.parcelas}</p>
        <p>Taxa:{e.taxa_juros}% A.M</p>

        </div>
    ))}
</div>
 {selecionado &&(
    <div>
            <div>{selecionado.nome}</div>
            <p>Valor Restante:{Number(selecionado.valor_restante).toLocaleString("pt-BR",{
                style:"currency",
                currency:"BRL"
            })}</p>
            <p>Valor Parcelas:{Number(selecionado.valor_parcelas).toLocaleString("pt-BR",{
              style:"currency",
              currency:"BRL"
              })}</p>
              <p>Quantidade de Parcelas Restante:{selecionado.parcelas}</p>
            
            <button>Pagar Parcela</button><button>Pagar Total</button>
            </div>
        )}
        </div>
       
        
    )
}