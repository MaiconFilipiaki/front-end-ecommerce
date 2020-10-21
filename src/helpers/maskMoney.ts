export default function (valor: number): string {
    if (valor) {
        let newValor = valor;
        // @ts-ignore
        if (newValor === '0,00') newValor = newValor.toString().replace(',', '.');
        // @ts-ignore
        return Number(parseFloat(newValor)).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }
    return '0,00';
};
