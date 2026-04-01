import { Veiculo } from "./Veiculo";
import prompt from "prompt-sync";

const teclado = prompt();

console.log('Criação de veículo');
const carro: Veiculo = criaVeiculo();

while(true){
    console.log("\n########### MENU ###########");
    console.log("1 - Acelerar");
    console.log("2 - Frear");
    console.log("3 - Subir marcha");
    console.log("4 - Descer marcha");
    console.log("5 - Imprimir dados do veículo");
    console.log("0 - Sair");

    const opcao = +teclado('Escolha uma opção: ');

    if(opcao === 0){
        console.log("Saindo...");
        break;
    }

    switch (opcao) {
        case 1:
            acelerar(carro);
            break;
        case 2:
            frear(carro);
            break;
        case 3:
            subirMarcha(carro);
            break;
        case 4:
            descerMarcha(carro);
            break;
        case 5:
            imprimirDados(carro);
            break;
        default:
            console.log("Opção inválida!");
            break;
    }
}

console.log("\nEstado final do veículo:");
console.table(carro);

function acelerar(veiculo: Veiculo): void {
    if (veiculo.marchaAtual === 0) {
        console.log("Coloque uma marcha primeiro!");
        return;
    }

    const fatorMarcha = (veiculo.numeroMarchas - veiculo.marchaAtual + 1) / veiculo.numeroMarchas;

    const incremento = veiculo.potencia * 0.05 * fatorMarcha;

    veiculo.velocidade += incremento;

    const velocidadeMax = veiculo.potencia * 2;
    if (veiculo.velocidade > velocidadeMax) {
        veiculo.velocidade = velocidadeMax;
        console.log("Velocidade máxima atingida!");
    }

    console.log(`Acelerando na marcha ${veiculo.marchaAtual}...`);
    console.log("Velocidade atual:", veiculo.velocidade.toFixed(2));
}

function frear(veiculo: Veiculo): void {
    if (veiculo.velocidade === 0) {
        console.log("O veículo já está parado.");
        return;
    }

    
    let intensidade = veiculo.velocidade * 0.2;

    
    intensidade += veiculo.marchaAtual * 2;

    veiculo.velocidade -= intensidade;

    
    if (veiculo.velocidade < 0) {
        veiculo.velocidade = 0;
    }

    console.log(`Freando... (-${intensidade.toFixed(2)})`);
    console.log("Velocidade atual:", veiculo.velocidade.toFixed(2));
}
function subirMarcha(veiculo: Veiculo): void {
    if (veiculo.marchaAtual < veiculo.numeroMarchas) {
        veiculo.marchaAtual++;
        console.log("Marcha atual:", veiculo.marchaAtual);
    } else {
        console.log("Já está na última marcha!");
    }
}

function descerMarcha(veiculo: Veiculo): void {
    if (veiculo.marchaAtual > 0) {
        veiculo.marchaAtual--;
        console.log("Marcha atual:", veiculo.marchaAtual);
    } else {
        console.log("Já está no ponto morto!");
    }
}

function imprimirDados(veiculo: Veiculo): void {
    console.table(veiculo);
}

function criaVeiculo(): Veiculo {
    const veiculo: Veiculo = new Veiculo();

    veiculo.marca = teclado('Marca: ');
    veiculo.modelo = teclado('Modelo: ');
    veiculo.potencia = +teclado('Potência: ');
    veiculo.numeroMarchas = +teclado('Número de marchas: ');

    veiculo.marchaAtual = 0;
    veiculo.velocidade = 0;

    return veiculo;
}