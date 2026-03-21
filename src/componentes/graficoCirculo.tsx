import { useEffect, useState } from "react";


interface Dados{
pago:number,
valor_restante:number,
valor:number,
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
            const totalPago =data.reduce((acc,i)=>acc+i.pago,0)
            const totalRestante=data.reduce((acc,i)=>acc+i.valor_restante,0)
            const valorSolicitado=data.reduce((acc,i)=>acc+i.valor,0)
            const valorParcelas=data.reduce((acc,i)=>acc+i.valor_parcelas,0)
        })
    },[])

return (
    <div>

    </div>
)
}