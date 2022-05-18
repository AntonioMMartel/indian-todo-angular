import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { DocumentReference, getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs } from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class ApiTodoService {
  // Initialize Cloud Firestore and get a reference to the service
  db = getFirestore(initializeApp(environment.firebaseConfig));

  hostname =
    document.location.protocol +
    '//' +
    document.location.hostname +
    '/api/huevos/';
  constructor(private http: HttpClient) {}

  async postData(data: any) {
    let datos = [
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
    try {
      const docRef = await addDoc(collection(this.db, 'tasks'), data);
      for (let i = 0; i < datos.length; i++) {
        await addDoc(collection(this.db, 'tasks'), datos[i]);
      }
      // console.log('Document written with ID: ', docRef.id);
      return docRef;
    } catch (e: any) {
      // console.error('Error adding document: ', e);
    }
    return null;
  }

  async getAllData() {
    const querySnapshot = await getDocs(collection(this.db, 'tasks'));
    let allData: any = [];
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      allData.push(doc.data());
    });
    return allData;
  }

  updateData(data: any, id: number) {
    return this.http.put<any>(this.hostname + id, data);
  }

  deleteData(id: number) {
    return this.http.delete<any>(this.hostname + id);
  }
}
