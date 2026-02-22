import jwt from "jsonwebtoken"

export function getUserId(){
    const token=localStorage.getItem("token")
    if(!token)return null
    try {
        const decoded=jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as {id:number}
        return decoded.id
    } catch (error) {
        return null
    }
}