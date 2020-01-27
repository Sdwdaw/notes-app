import {Injectable} from "@angular/core";
import {InMemoryDbService} from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService
{

  createDb()
  {
    const notes = [
      { id: 1, text: 'note 1', section: 'work', user: 1 },
      { id: 2, text: 'note 2', section: 'work', user: 1  },
      { id: 3, text: 'note 3', section: 'home', user: 1  },
      { id: 4, text: 'note 4', section: 'home', user: 1  },
      { id: 5, text: 'note 5', section: 'diff', user: 1  },
      { id: 6, text: 'note 6', section: 'diff', user: 2  },
      { id: 7, text: 'note 7', section: 'work', user: 2  }
    ];

    const sections = [
      { id: 1, title: 'work' },
      { id: 2, title: 'home' },
      { id: 3, title: 'diff' },
    ];

    const users = [
      { id: 1, name: 'oleg' },
      { id: 2, name: 'inna' }
    ];

    return {notes, sections, users};
  }
}
