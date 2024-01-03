
const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];
    const { yarg } = await import('./args.plugin');
    return yarg;
};

describe('args.plugin', () => {
    
    const originalArgv = process.argv
    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })

    test('should return default values', async () => {
        const yarg = await runCommand(['-b', '5']);
        expect(yarg).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'table',
            d: './outputs',
        }));
    });

    test('should return configuration with custom values', async () => {
        const yarg = await runCommand(['-b', '10', '-l', '5', '-s', '-n', '"custom test name file"', '-d', '"custom test destination file"']);
        expect(yarg).toEqual(expect.objectContaining({
            b: 10,
            l: 5,
            s: true,
            n: '"custom test name file"',
            d: '"custom test destination file"',
        }));
    })
})