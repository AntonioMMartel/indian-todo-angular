import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { DocumentReference, getFirestore } from 'firebase/firestore';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';
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
      console.log(docRef);
      return docRef;
    } catch (e: any) {
      // console.error('Error adding document: ', e);
      return null;
    }
  }

  async getAllData() {
    const querySnapshot = await getDocs(collection(this.db, 'tasks'));
    let allData: any = [];
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      let id = doc.id;
      allData.push(Object.assign({ ...doc.data(), id }));
      // Aqui pillas la id tmb
    });
    return allData;
  }

  async updateData(data: any, id: string) {
    try {
      await updateDoc(doc(this.db, 'tasks', id), data);
      return true;
    } catch (e: any) {
      return false;
    }
  }

  async deleteData(id: string) {
    try {
      await deleteDoc(doc(this.db, 'tasks', id));
      return true;
    } catch (e: any) {
      return false;
    }
  }
}
