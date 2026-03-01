export function calculos(
  valor: number,
  taxa: number,
  parcelas: number
) {
  if (!valor || !taxa || !parcelas) {
    return { valorTotal: 0, valorParcelas: 0 }
  }

  const taxaDecimal = taxa / 100

  const valorTotal = valor * Math.pow(1 + taxaDecimal, parcelas)
  const valorParcelas = valorTotal / parcelas

  return {
    valorTotal,
    valorParcelas
  }
}