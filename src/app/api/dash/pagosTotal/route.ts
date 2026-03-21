import { pool } from "@/database/database";
import { NextResponse } from "next/server";

export default async function GET(){
    try {
        
        const res=await pool.query("SELECT DATE_TRUNC('month',data_pagamento)AS mes, SUM(p.valor_pago) AS pago,SUM(e.valor) AS Valor Solicitado, SUM(e.valor_total) AS Divida, SUM(e.valor_parcelas) AS Valor Parcelas, SUM(e.valor_restante) AS Valor Restante, e.status,e.parcelas, e.nome FROM pagamentos p JOIN emprestimos e ON p.emprestimo_id=e.id GROUP BY mes,e.status, e.parcelas,e.nome ORDER BY mes")
        return NextResponse.json(res.rows)
    
    } catch (error) {
        console.log(error)    
        return NextResponse.json({error:"Erro interno"},{status:500})    
        
    }
}