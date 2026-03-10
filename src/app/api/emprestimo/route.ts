import { pool } from "@/database/database";
import { getUserId } from "@/lib/auth";

import { NextRequest, NextResponse } from "next/server";
import { calculos } from "../../../../utils/calculos";
export async function POST(req:NextRequest){
    try {
        const userId= await getUserId()
         
         if(!userId){
            return NextResponse.json(
                {error:"Nao autorizado"},
                {status:401}
            )}
        const {nome,valor,parcelas,taxa_juros}= await req.json()
        const { valorTotal,valorParcelas}=calculos(valor,taxa_juros,parcelas)
       const valorRestante= valorTotal
            const limite=3
        
    const result= await pool.query("SELECT COUNT(*) FROM emprestimos WHERE usuario_id=$1 AND status='ativo'",[userId])
        const quantidade= Number(result.rows[0].count)
        if(quantidade>=limite){
            return NextResponse.json({error:"Limite de 3 emprestimos ativos"},{status:400})
        }
        const resul= await pool.query(`
      INSERT INTO emprestimos
      (nome, usuario_id, valor, taxa_juros, parcelas, valor_restante, status, data_criado, valor_parcelas,valor_total)
      VALUES ($1, $2, $3, $4, $5, $6, 'ativo', NOW(),$7,$8)
      RETURNING *
      `,
      [nome, userId, valor, taxa_juros, parcelas, valorRestante,valorParcelas,valorTotal] 
    )
    return NextResponse.json(resul.rows[0])
      
    } catch (error) {
        console.log("erro no emprestimo",error)
        return NextResponse.json(
            {error:"Erro no Emprestimo"},
            {status:500}
        )
    }
}
export async function GET(){
    try {
         const userId= await getUserId()
         if(!userId){
            return NextResponse.json({
                error:"Erro de autorizacao"
            },{
                status:401
            })
         }    const result = await pool.query(        
  "SELECT * FROM emprestimos WHERE usuario_id=$1 AND status='ativo'",
  [userId]
)
return NextResponse.json(result.rows)
    } catch (error) {
        return NextResponse.json({error:"erro interno"},{status:500})
    }
           


}