import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let huevos = [
      {
        nombreHuevo: 'Chumpi',
        formaHuevo: 'Esfera',
        swagHuevo: 'Ciudadano modelo',
        bicepsHuevo: 22,
        fechaHuevo: '2022-03-31T23:00:00.000Z',
        comentariosHuevo:
          'Será un pollito grande y poderoso como Zeus (Dios del trueno)',
        id: 1,
      },
      {
        nombreHuevo: '73AEAZ\\ª',
        formaHuevo: 'Teseracto',
        swagHuevo: 'Fleje malote pa',
        bicepsHuevo: 666,
        fechaHuevo: '2022-04-29T23:00:00.000Z',
        comentariosHuevo:
          ' [Cast256.h] \n\n #ifndef CAST256_H \n #define CAST256_H \n\n // ** Thread-safe implementation \n // ** 128bit block size \n // ** 256bit key \n\n extern void Cast256_set_key(...); \n extern void Cast256_encrypt(...); \n extern void Cast256_decrypt(...); \n\n #endif ',
        id: 2,
      },
      {
        nombreHuevo: 'Bollito',
        formaHuevo: 'Cilindro',
        swagHuevo: 'Orgulloso alumno de la ulpgc',
        bicepsHuevo: 2,
        fechaHuevo: '2022-03-03T00:00:00.000Z',
        comentariosHuevo: 'Será un pollito flonfli y muy mullidito <3',
        id: 3,
      },
    ];
    return { huevos };
  }
}
