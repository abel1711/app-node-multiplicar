import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    base: number;
    limit: number;
    fileName?: string;
    fileDestination?: string;
    showTable: boolean;
}


export class ServerApp {



    static run({ base, limit, showTable, fileDestination, fileName }: RunOptions) {
        console.log('Server running...');

        const table = new CreateTable().execute({ base, limit });
        const wasCreated = new SaveFile().execute({ fileContent: table, fileDestination, fileName });

        if (showTable) console.log(table);
        wasCreated ? console.log('File was created!') : console.error('Error at create file')
    }
}