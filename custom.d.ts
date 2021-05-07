/**
 * Quando o typescript não conseguir ler o módulo correspondente as imagens
 * devemos criar um arquivo chamado custom.d.ts na raiz do projeto e passar as
 * seguintes configurações 
 */

declare module '*.png' { // Quando tivermos um arquivo com qualquer nome que for .png vamos fazer:
    const content: any; // Vamos pegar qualquer elemento png
    export default content; // E exportar
}