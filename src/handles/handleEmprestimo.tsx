export async function handleEmprestimo(valor:string,taxaJuros:string,parcelas:string,status:string,valorRestante:string,dataCriado:string) {
    const res= await fetch("api/emprestimo/",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
    valor,taxaJuros,parcelas,status,valorRestante,dataCriado
})
    })
    return res
}