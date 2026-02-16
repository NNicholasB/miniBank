'use client'

import styles from "@/app/login/login.module.css"
import { useState } from "react"


export default function Page(){
    const [mostrarCadastro,setMostrarCadastro]=useState(false)
    return(

        <div className={styles.container}>
 <div className={`${styles.wrapper} ${mostrarCadastro ? styles.mover : ""}`}>
            <form className={styles.form}>
                <h2>Login</h2>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" />
                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" />
                <button className={styles.btn}>Login</button>
                <button type="button" onClick={()=>setMostrarCadastro(true)} className={styles.btn}>Criar Conta</button>
            </form>

                <form className={styles.form}>
                <h2>Cadastrar</h2>
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" />
                <label htmlFor="email">Email</label>
                <input type="email" id="email"/>
                <label htmlFor="senha">Senha</label>
                <input type="password" />
                <button  type="button" className={styles.btn}>Cadastrar</button>
            </form>
           
        </div> 
        </div>
       
    )
}