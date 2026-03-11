import { pool } from "@/database/database"
import { getUserId } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req:NextRequest){
    try {
        const userId= await getUserId()
        if(!userId){
            return NextResponse.json({error:"Nao autorizado"},{status:401})
        }

        const {emprestimoId}= await req.json()

        const resul = await pool.query("SELECT * FROM emprestimos WHERE id=$1 AND usuario_id=$2",
        [emprestimoId,userId]
        )
        const emprestimo = resul.rows[0]
        if(!emprestimo){
            return NextResponse.json({error:"Emprestimo nao encontrado"})
        }
        const parcela = Number(emprestimo.valor_parcelas)
        const contaRes= await pool.query("SELECT saldo FROM users WHERE id=$1",
            [userId]
        )
        const saldo = Number(contaRes.rows[0].saldo)
        if(saldo<parcela){
            return NextResponse.json({error:"Saldo insuficente"})
        }
        await pool.query(" UPDATE users SET saldo=saldo-$1 WHERE id=$2",
        [parcela,userId])

      await pool.query(`
UPDATE emprestimos 
SET 
valor_restante = valor_restante - $1,
parcelas = parcelas - 1,
status = CASE 
    WHEN valor_restante - $1 <= 0 THEN 'inativo'
    ELSE status
END
WHERE id = $2
`,[
parcela,
emprestimoId
])
        return NextResponse.json({message:"Parcela paga com sucesso"})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Erro interno"},{status:500})
    }
}