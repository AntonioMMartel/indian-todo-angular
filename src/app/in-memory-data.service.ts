import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let huevos = [
      {
        taskName: 'Do Maths homework',
        taskParticipants: 'Abdam',
        taskDifficulty: 'Hard',
        taskPriority: 70,
        taskDeadline: '2022-04-31T23:00:00.000Z',
        taskComments: 'What does "+" mean??? Wtf',
        id: 1,
      },
      {
        taskName: 'Do pushups',
        taskParticipants: 'Yo jaja',
        taskDifficulty: 'Sencillote',
        taskPriority: 1,
        taskDeadline: '2022-05-29T23:00:00.000Z',
        taskComments:
          'Para comenzar con las flexiones debemos colocarnos en el suelo, en decúbito ventral o boca hacia abajo. Apoyamos las manos en el suelo, justo por debajo de los hombros y separadas de este ancho. Con los pies levemente separados o juntos, despegamos el torso del suelo impulsándonos con los brazos y el pecho.',
        id: 2,
      },
      {
        taskName: 'Finish TFG',
        taskParticipants: 'Yo también jaja',
        taskDifficulty: 'Amén 🙏🙏',
        taskPriority: 2,
        taskDeadline: '2022-06-03T00:00:00.000Z',
        taskComments: 'Necesito terapia emocional. Ayuda.',
        id: 3,
      },
      {
        taskName: 'Invest millions in Gofio SA',
        taskParticipants: 'Mehdi',
        taskDifficulty: 'Easy',
        taskPriority: -20,
        taskDeadline: '2022-06-03T00:00:00.000Z',
        taskComments: ':D',
        id: 4,
      },
    ];
    return { huevos };
  }
}
