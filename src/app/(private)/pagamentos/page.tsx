'use client'

import { useEffect, useState } from "react"
import Styles from "./pagamentos.module.css"
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
    const [saldo,setSaldo]=useState("")

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
        carregarSaldo()
    },[])
    async function carregarSaldo(){
        const res=await fetch("/api/user/saldo")
        const data= await res.json()
        setSaldo(data.saldo)
    }
    async function pagarParcela(){
        if(!selecionado) return      
        const res= await fetch("api/pagarParcela",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                emprestimoId:selecionado.id
            })
        })
        const data= await res.json()
        console.log(data)
        carregarEmprest()
        carregarSaldo()
        setSelecionado(null)

    }
    async function pagarTotal(){
        if(!selecionado) return
        const res= await fetch("api/pagarTotal",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                emprestimoId:selecionado.id
            })
        })
        const data= await res.json()
        console.log(data)
        carregarEmprest()
        carregarSaldo()
        setSelecionado(null)
    }
    return(
        <div>
            <div className={Styles.title}>
<h1>Pagamentos</h1>
<p>Emprestimos  disponiveis para pagamento total ou de uma parcela</p>
            </div>
            <p>
Saldo: {Number(saldo).toLocaleString("pt-BR",{
  style:"currency",
  currency:"BRL"
})}
</p>
<div className={Styles.back}>
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
    <div className={Styles.fundo}>
        <div className={Styles.popUpEmprestimo}>  
              <button onClick={()=>setSelecionado(null)} className={Styles.x}>X</button>

            <div>{selecionado.nome}</div>
                         <p>Saldo: {Number(saldo).toLocaleString("pt-BR",{
  style:"currency",
  currency:"BRL"
})}</p> 

            <p>Valor Restante:{Number(selecionado.valor_restante).toLocaleString("pt-BR",{
                style:"currency",
                currency:"BRL"
            })}</p>
            <p>Valor Parcelas:{Number(selecionado.valor_parcelas).toLocaleString("pt-BR",{
              style:"currency",
              currency:"BRL"
              })}</p>
              <p>Quantidade de Parcelas Restante:{selecionado.parcelas}</p>

            <button className={Styles.btnDefault}
            onClick={pagarParcela}>Pagar Parcela</button><button className={Styles.btnDefault} onClick={pagarTotal}>Pagar Total</button>
            </div>
    </div>
    
        )}
        </div>
       
        
    )
}