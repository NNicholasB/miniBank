import { pool } from "@/database/database";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

 export async function POST(req:NextRequest) {
    try {
        const {nome,email,senha}= await req.json()
        const existUser= await pool.query("SELECT * FROM users WHERE email=$1",[email])
        if(existUser.rows.length>0){
          return NextResponse.json({error:"Email ja cadatrado"},
            {status:400})
        }

        const hash= await bcrypt.hash(senha,10)
        await pool.query("INSERT INTO users (nome,email,senha)VALUES ($1,$2,$3)",[nome,email,hash])
        return NextResponse.json({message:"Usuario cadastrado"})
    } catch (error) {
        console.error("erro:",error)
        return NextResponse.json({message:"Erro interno"},
            {status:500}
        )
    }
}