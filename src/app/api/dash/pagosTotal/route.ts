import { pool } from "@/database/database";
import { NextResponse } from "next/server";

export  async function GET(){
    try {
        
        const res=await pool.query("SELECT e.id,e.nome,e.valor,e.valor_total,e.valor_restante,e.status,e.parcelas,COALESCE(SUM(p.valor_pago),0) AS pago FROM emprestimos e LEFT JOIN pagamentos p ON p.emprestimo_id = e.id GROUP BY e.id")
        return NextResponse.json(res.rows)
    
    } catch (error) {
        console.log(error)    
        return NextResponse.json({error:"Erro interno"},{status:500})    
        
    }
}