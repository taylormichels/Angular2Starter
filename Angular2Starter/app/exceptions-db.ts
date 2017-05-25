import { InMemoryDbService } from 'angular-in-memory-web-api';
export class ExceptionsDB implements InMemoryDbService {
    createDb() {
        let exceptions = [
            { id: 1, name: 'Item Total', inOrder: 9600, description: 'desc 1', overrideFlag: 0 },
            { id: 2, name: 'Item Total', inOrder: 8300, description: 'desc 2', overrideFlag: 0 },
            { id: 3, name: 'Mismatch xyz', inOrder: 300, description: 'desc 3', overrideFlag: 0 }
        ];
        return { exceptions };
    }
}