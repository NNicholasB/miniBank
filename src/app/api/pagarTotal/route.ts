import { pool } from "@/database/database";
import { getUserId } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const userId= await getUserId()
        if(!userId){
            return NextResponse.json({error:"Nao autorizado"},{status:400})
        }
        const {emprestimoId}= await req.json()
        const resul = await pool.query("SELECT * FROM emprestimos WHERE id=$1 AND usuario_id=$2",
            [emprestimoId,userId]
        )
        const emprestimo= resul.rows[0]
        if(!emprestimo){
            return NextResponse.json({error:"Emprestimo nao encontrado"})

        }

        const valorEmprestimo=Number(emprestimo.valor_restante)
        const contaUsuario= await pool.query("SELECT saldo FROM users WHERE id=$1",[
            userId
        ])

        const saldo=Number(contaUsuario.rows[0].saldo)
        if(saldo<valorEmprestimo){
            return NextResponse.json({error:"Saldo insuficiente"})

        }
        await pool.query("UPDATE users SET saldo=saldo-$1 WHERE id=$2",
            [valorEmprestimo,userId]
        )
        await pool.query("INSERT INTO pagamentos (emprestimo_id,usuario_id,valor_pago)VALUES ($1,$2,$3)",[emprestimoId,userId,valorEmprestimo])
        await pool.query("UPDATE emprestimos SET valor_restante=valor_restante -$1,status = CASE WHEN valor_restante- $1 <= 0 THEN 'inativo' ELSE status END WHERE id=$2 ",
            [valorEmprestimo,emprestimoId]
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Erro interno"},{status:500})
    }
}