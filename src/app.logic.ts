import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';


const multiplicador: number = yarg.b;
const hasta: number = yarg.l;
let text: string = `
===========================================
              tabla del ${multiplicador}
===========================================\n`;

for (let i = 0; i < hasta; i++) {
   text += `${multiplicador} X ${i+1} = ${multiplicador*(i+1)}\n`;
}
if(yarg.s){
   console.log(text);
}

const outputsPath = 'outputs';
fs.mkdirSync(outputsPath, { recursive: true });
fs.writeFileSync(`${outputsPath}/tabla-${multiplicador}.txt`, text);

console.log('File was created!')

