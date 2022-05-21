import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoTableUpdaterService {
  // 1. Dialog
  // 2. Table
  private elementBeingAddedState = new BehaviorSubject(
    'No element being added'
  );

  private elementBeingAdded = false; // Se pone a true cuando llega un nuevo elemento

  elementBeingAddedStateActual = this.elementBeingAddedState.asObservable();

  constructor() {}

  addNewElement() {
    this.elementBeingAdded = true;
  }

  isElementBeingAdded() {
    return this.elementBeingAdded;
  }

  completeAddElement() {
    this.elementBeingAdded = false;
  }

  updateElementBeingAddedState(state: string) {
    this.elementBeingAddedState.next(state);
  }
}
