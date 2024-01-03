import { ServerApp } from './presentation/server-app';

describe('App test', () => {

    test('should be call ServerApp with custom values', async() => {
        const serverAppMock = jest.fn();
        ServerApp.run = serverAppMock;
        process.argv = ['node','app.ts', '-b', '8', '-l', '5', '-d', 'test-folder', '-n', 'test-file'];
        await import('./app');
        expect(serverAppMock).toHaveBeenCalledWith({
            base: 8,
            limit: 5,
            fileDestination: 'test-folder',
            fileName: 'test-file',
            showTable: false
        });
    });

});