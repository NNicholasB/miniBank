import { pool } from "@/database/database"
import { getUserId } from "@/lib/auth"
import {  NextResponse } from "next/server"




export async function GET(){
const c = await pool.connect()
try {
    const userId= await getUserId()
    if(!userId){
        return NextResponse.json({error:"Nao autorizado"},{status:401})
    }
const resul=await c.query(`SELECT saldo FROM users WHERE id=$1`,[userId])
return NextResponse.json(resul.rows[0])
} catch (error) {
    console.log("erro no saldo",error)
    return NextResponse.json({error:"Erro no saldo"},{status:500})
}
}