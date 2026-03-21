'use client'

import GraficoCard from "../../../componentes/graficoCard";



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
   
    return(
        <div>
<h1>Dash</h1>
<div>
<p>
    Quantidade de Parcelas Pagas Por Mes
</p>

</div>

<GraficoCard/>

        </div>
        
    )
}