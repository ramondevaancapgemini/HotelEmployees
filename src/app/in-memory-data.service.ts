import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees = [
      { id: 1, first_name: "Ramon", last_name: "de Vaan" },
      { id: 2, first_name: "Emiel", last_name: "van Rossem" },
    ];
    return { employees };
  }
}
