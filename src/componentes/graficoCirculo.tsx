'use client'
import React from "react";
import { useEffect, useState } from "react";
import styles from "./graficoCirculo.module.css"

interface Dados{
pago:number,
valor:number,
valor_solicitado:number,
valor_total:number,
valor_parcelas:number
status:string,
nome:string,
parcelas:number,
mes:string
}
export default function GraficoCirculo(){
    const [dados,setDados]=useState<Dados[]>([])


    useEffect(()=>{
        fetch("/api/dash/pagosTotal").then(res=>res.json()).then((data:Dados[])=>{
            setDados(data)
            
        }
         )
    },[])

return (
    
       <div className={styles.container}>
        {dados.map((e,i)=>{ 
            const pago = Number(e.pago)
const restante = Number(e.valor)

            const total=pago+restante
            if(total <= 0) return null
            const pP=(pago/total)*100
            const pR=(restante/total)*100
          
           const style:React.CSSProperties =
e.status === "inativo"
? { background:"#9ca3af" } 
: {
  background:`conic-gradient(
    #68e71f 0% ${pP}%,
    #cc0e0e ${pP}% ${pP+pR}%,
    #06a3ca ${pP+pR}% 100%
  )`
}
            return (
                <div key={i} className={styles.card}>
                    <div  title={`Pago:${pago}|Restante:${restante}`}  className={styles.pizza} style={style}/>
                    <p>{e.nome}</p>
                    <p>Status:{e.status}</p>
                    <p>R${e.valor}</p>
                </div>
            )
        })}
       </div>
       

    
)
}