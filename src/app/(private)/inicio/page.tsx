'use client'

import { useEffect, useState } from "react"
import Styles from "./inicio.module.css"

export default function Page(){
    const [nome,setNome]=useState("")
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("user")||"{}")
        setNome(user.nome||"")
    },[])
    function saudacao(){
        const hora= new Date().getHours()
        if(hora<12) return "Bom Dia"
        if(hora<18)return "Boa Tarde"
        return "Boa Noite"
    }
    return(
        <div className={Styles.cotainer}>
        <h1>
            {saudacao()},{nome}
        </h1>
   
        </div>
    )
}