import { CreateTable } from './create-table.use-case';


describe('create-table.use-case.test', () => {

    test('Should create table with default values', () => {
        const base = 2;
        const createTable = new CreateTable();
        const table = createTable.execute({ base });
        const rows = table.split('\n').length;
        expect(createTable).toBeInstanceOf(CreateTable);
        expect(rows).toBe(10);
    });

    test('should create table with custom values', () => {
        const options = {
            base: 3,
            limit: 20
        };
        const table = new CreateTable().execute(options);
        const rows = table.split('\n').length;
        expect(rows).toBe(options.limit);
        expect(table).toContain('3 X 20 = 60');
    });
});