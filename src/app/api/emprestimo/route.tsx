import { pool } from "@/database/database";
import { getUserId } from "@/lib/auth";

import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest){
    try {
        const userId= await getUserId()
        const {nome,valor,parcelas,taxa_juros,valor_parcelas,valor_total}= await req.json()
        const valorRestante= valor_total
        const resul= await pool.query(`
      INSERT INTO emprestimos
      (nome, usuario_id, valor, taxa_juros, parcelas, valor_restante, status, data_criado, valor_parcelas,valor_total)
      VALUES ($1, $2, $3, $4, $5, $6, 'ativo', NOW(),$7,$8)
      RETURNING *
      `,
      [nome, userId, valor, taxa_juros, parcelas, valorRestante,valor_parcelas,valor_total] 
    )
        if(!resul){
            return NextResponse.json(
                {error:"Nenhum Emprestimo encontrado"},
                {status:404}
            )
        }
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
            return NextResponse.json(
                {error:"Nao autorizado"},
                {status:401}
            )
        }

        const result= await pool.query("SELECT * FROM emprestimos WHERE usuario_id=$1",[userId])
return NextResponse.json(result.rows)

    } catch (error) {
           console.log("ERRO REAL DO GET:", error)
    return NextResponse.json(
        {error:"Erro interno"},
        {status:500}
    )
    }
}