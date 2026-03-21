import { useEffect, useState } from "react"

interface item{
    emprestimo:string,
    mes:string,
    total:number,
    cor:string
}

export default function GraficoCard(){
    const [dados,setDados]=useState<item[]>([])

useEffect(()=>{
    fetch("api/dash/mesPagos").then(res=>res.json()).then(data=>{
        const form=data.map((d:any)=>({
            mes:new Date(d.mes).toLocaleDateString("pt-BR",{month:"short"}),
            total:Number(d.total)
        }))
        setDados(form)
    })
},[])

const max=Math.max(...dados.map(d=>d.total),1)
return(
    <div style={{
display:"flex",
alignItems:"flex-end",
gap:"20px",
height:"200px"
}}>
        {dados.map((d,i)=>{
            const altura = (d.total/max)*50
            const cor = d.total>2 ? "#ac0707" : "#64a77a"
            return(            
               
                <div key={i}className="Barra">
                    
                <div style={{height:`${altura}px`,background:cor,width:10}}/>
                  <p>{d.total}</p>
                <p>{d.mes}</p>
                </div>
                
               
            )
        })}
 
    </div>
)

}