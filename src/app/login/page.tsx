"use client";

import styles from "@/app/login/login.module.css";
import handleCadastro from "@/handles/handlecadastro";
import handleLogin from "@/handles/handlerlogin";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");

  const router = useRouter();

  async function onSubmit(e: any) {
    e.preventDefault();

    const res = await handleLogin(email, senha);
    console.log(res.status);
    console.log(res.headers.get("content-type"));
    if (res.ok) {
      router.push("/inicio");
    } else {
      const data = await res.json();
      alert(data.error);
    }
  }
  async function onCadastro(e: any) {
    e.preventDefault();
    const res = await handleCadastro(nome, email, senha);
    if (res.ok) {
      alert("Conta Cadastrada");
    } else {
      alert("error");
    }
  }
  return (
    <div className={styles.container}>
      <div
        className={`${styles.wrapper} ${mostrarCadastro ? styles.mover : ""}`}
      >
        <form className={styles.form} onSubmit={onSubmit}>
          <h2>Login</h2>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit" className={styles.btn}>
            Login
          </button>
          <button
            type="button"
            onClick={() => setMostrarCadastro(true)}
            className={styles.btn}
          >
            Criar Conta
          </button>
        </form>

        <form className={styles.form} onSubmit={onCadastro}>
          <h2>Cadastrar</h2>

          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit" className={styles.btn}>
            Cadastrar
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={() => setMostrarCadastro(false)}
          >
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
}
