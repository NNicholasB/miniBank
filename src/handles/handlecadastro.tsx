export default async function handleCadastro(nome:string,senha:string,email:string){
    const res= await fetch("api/auth/cadastro",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({nome,email,senha})
    })
    return res
}