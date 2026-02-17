import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {pool} from "@/database/database"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { email, senha } = await req.json()

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    )

    const user = result.rows[0]

    if (!user) {
      return NextResponse.json(
        { error: "Usuario nao encontrado" },
        { status: 404 }
      )
    }

    const senhaValida = await bcrypt.compare(senha, user.senha)

    if (!senhaValida) {
      return NextResponse.json(
        { error: "Senha invalida" },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    )

    const response = NextResponse.json({ message: "Login realizado" })

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60
    })

    return response

  } catch (error) {
    console.log("ERRO NO LOGIN:", error)
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    )
  }
}