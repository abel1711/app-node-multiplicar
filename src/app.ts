import fs from 'fs';
console.clear();


const multiplicador: number = 5;
const hasta: number = 10;
let text: string = `===========================================\n              tabla del ${multiplicador}            \n===========================================\n`;

for (let i = 0; i < hasta; i++) {
   text += `${multiplicador} X ${i+1} = ${multiplicador*(i+1)}\n`;
}
console.log(text);

const outputsPath = 'outputs';
fs.mkdirSync(outputsPath, { recursive: true });
fs.writeFileSync(`${outputsPath}/tabla-${multiplicador}.txt`, text);

console.log('File was created!')

