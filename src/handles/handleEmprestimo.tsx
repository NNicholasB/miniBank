interface NovoEmprestimo {
  nome: string
  valor: number
  parcelas: number
  taxa_juros: number
  status: string
  valor_restante: number
  valor_parcelas: number
  valor_total: number
  data_criado: string
}

export async function handleEmprestimo(dados: NovoEmprestimo) {
  const res = await fetch("/api/emprestimo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  })

  return res
}