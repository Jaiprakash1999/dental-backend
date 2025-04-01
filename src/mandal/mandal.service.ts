import { Injectable } from '@nestjs/common';
import { mappings } from './data/mappings';

@Injectable()
export class MandalService {
  constructor() {}

  getMandals(query?: string) {
    let mandals = [...new Set(mappings.map((m) => m.mandal))];

    if (query) {
      const searchLower = query.toLowerCase();
      mandals = mandals.filter((m) => m.toLowerCase().includes(searchLower));
    }

    return mandals;
  }

  getGramPanchayats(mandal?: string, query?: string) {
    let gramPanchayats;

    if (mandal) {
      gramPanchayats = [
        ...new Set(
          mappings
            .filter((m) => m.mandal === mandal)
            .map((m) => m.gramPanchayat),
        ),
      ];
    } else {
      gramPanchayats = [
        ...new Set(mappings.map((m) => `${m.gramPanchayat} (${m.mandal})`)),
      ];
    }

    if (query) {
      const searchLower = query.toLowerCase();
      gramPanchayats = gramPanchayats.filter((gp) =>
        gp.toLowerCase().includes(searchLower),
      );
    }

    return gramPanchayats;
  }

  getHabitations(mandal?: string, gramPanchayat?: string, query?: string) {
    let habitations;

    if (mandal && gramPanchayat) {
      habitations = mappings
        .filter((m) => m.mandal === mandal && m.gramPanchayat === gramPanchayat)
        .map((m) => m.habitation);
    } else if (mandal) {
      habitations = mappings
        .filter((m) => m.mandal === mandal)
        .map((m) => ({
          id: m.id,
          habitat: `${m.habitation} (${m.gramPanchayat})`,
        }));
    } else if (gramPanchayat) {
      habitations = mappings
        .filter((m) => m.gramPanchayat === gramPanchayat)
        .map((m) => ({ id: m.id, habitat: m.habitation }));
    } else {
      habitations = mappings.map((m) => ({
        id: m.id,
        habitat: `${m.habitation} (${m.gramPanchayat}, ${m.mandal})`,
      }));
    }

    if (query) {
      const searchLower = query.toLowerCase();
      habitations = habitations.filter((h) =>
        h.habitat.toLowerCase().includes(searchLower),
      );
    }

    return habitations;
  }

  getIdsByValues(
    mandal?: string,
    gramPanchayat?: string,
    habitat?: string,
  ): number[] {
    let idByValues = mappings
      .filter((m) => {
        const matchMandal = mandal ? m.mandal === mandal : true;
        const matchGramPanchayat = gramPanchayat
          ? m.gramPanchayat === gramPanchayat
          : true;
        const matchHabitat = habitat ? m.habitation === habitat : true;

        return matchMandal && matchGramPanchayat && matchHabitat;
      })
      .map((m) => m.id);

    return idByValues;
  }

  // want to make a getids by query where i take query in  values and return all ids which have mappings in which case insensetive gramPanchyat,habitat and mandal
  getIdsByQuery(query: string): number[] {
    const searchLower = query.toLowerCase();
    const ids = mappings
      .filter((m) => 
        m.mandal.toLowerCase().includes(searchLower) ||
        m.gramPanchayat.toLowerCase().includes(searchLower) ||
        m.habitation.toLowerCase().includes(searchLower)
      )
      .map((m) => m.id);

    return ids;
  }
}
