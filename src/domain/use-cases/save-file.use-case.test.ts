import { SaveFile } from './save-file.use-case';
import fs from 'fs';

describe('save-file.use-case', () => {

    afterEach(() => {
        const path = 'outputs'
        const existFolder = fs.existsSync(path);
        existFolder ?? fs.rmSync(path, { recursive: true });
    })

    test('should save file with default values', () => {
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'Test content'
        };
        const result = saveFile.execute(options);
        const fileExist = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
        expect(result).toBeTruthy();
        expect(fileExist).toBeTruthy();
        expect(fileContent).toBe(options.fileContent)
    });

    test('should save file with custom values', () => {
        const options = {
            fileContent: 'Test content with custom values',
            fileDestination: 'outputs/custom',
            fileName: 'custom-test'
        };
        const filePath = `${options.fileDestination}/${options.fileName}.txt`;
        const result = new SaveFile().execute(options);
        const fileExist = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
        expect(result).toBe(true);
        expect(fileExist).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    });

    test('should return false if directory could not be created', () => { 
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn( fs, 'mkdirSync').mockImplementation(
            ()=>{ throw new Error('This is a custom error message from testing')}
        );
        const options = {
            fileContent: 'Test content'
        };
        const result = saveFile.execute(options);
        expect(result).toBe(false);
        mkdirSpy.mockRestore();
    });

    test('should return false if file could not be created', () => { 
        const saveFile = new SaveFile();
        const writeFileSyncSpy = jest.spyOn( fs, 'writeFileSync').mockImplementation(
            ()=>{ throw new Error('This is a custom error message from testing - error writeFileSync')}
        );
        const options = {
            fileContent: 'Test content'
        };
        const result = saveFile.execute(options);
        expect(result).toBe(false);
        writeFileSyncSpy.mockRestore();
    });
});