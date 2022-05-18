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
    try {
      const docRef = await addDoc(collection(this.db, 'tasks'), data);
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
