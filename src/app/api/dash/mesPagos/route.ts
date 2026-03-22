import { pool } from "@/database/database"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const res = await pool.query("SELECT DATE_TRUNC('month',data_pagamento) as mes, COUNT (*) AS total FROM pagamentos GROUP BY mes ORDER BY mes")
        return NextResponse.json(res.rows)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 })
    }

}