import { useEffect, useState } from "react"
import styles from "./graficoCard.module.css"
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
    <div className={styles.container}>
        {dados.map((d,i)=>{
            const altura = (d.total/max)*50
            const cor = d.total>=3 ? "#68e71f" : "#cc0e0e"
            return(            
               
                <div key={i}>
                    
                <div className={styles.barra} style={{height:`${altura}px`,background:cor,width:10}}/>
                  <p>{d.total}</p>
                <p>{d.mes}</p>
                </div>
                
               
            )
        })}
 
    </div>
)

}