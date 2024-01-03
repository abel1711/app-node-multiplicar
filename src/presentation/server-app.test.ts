import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';

describe('server-app', () => {

    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        fileDestination: 'test-folder',
        fileName: 'test-file-name'
    };

    test('should create ServerApp instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    test('should run ServerApp with options', () => {
        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');
        ServerApp.run(options);
        expect(logSpy).toHaveBeenCalledTimes(2),
            expect(logSpy).toHaveBeenCalledWith('Server running...')
        expect(logSpy).toHaveBeenLastCalledWith('File was created!');
        expect(createTableSpy).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit
        });
        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileDestination: options.fileDestination,
            fileName: options.fileName,
            fileContent: expect.any(String)
        });
        expect(saveFileSpy).toHaveBeenCalledTimes(1);
    });

    test('should run with custom values mocked', () => {
        const returnValuesCreateTable = '2 X 2 = 4';
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createTableMock = jest.fn().mockReturnValue(returnValuesCreateTable);
        const saveFileMock = jest.fn().mockReturnValue(true);
        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createTableMock;
        SaveFile.prototype.execute = saveFileMock;
        ServerApp.run(options);
        expect(logMock).toHaveBeenCalledWith('Server running...');
        expect(createTableMock).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit
        });
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: returnValuesCreateTable,
            fileDestination: options.fileDestination,
            fileName: options.fileName
        });
        expect(logMock).toHaveBeenCalledWith('File was created!')
    })
})