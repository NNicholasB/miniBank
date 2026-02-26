import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export async function getUserId(){
    const token = (await cookies()).get("token")?.value

    if(!token) return null

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as { id: number }

        return decoded.id
    } catch {
        return null
    }
}