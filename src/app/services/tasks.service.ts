import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Task } from '../interfaces/task';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const DB_PATH_TASKS = 'task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private user: any;

  constructor(
    private authService: AuthService,
    public afStore: AngularFirestore
  ) {
    this.authService.user$.subscribe(user => this.user = user);
  }

  public create(task: Task): Promise<any> {
    if (!this.user) {
      return;
    }

    const userTasks: AngularFirestoreDocument<any> = this.afStore.doc(`${DB_PATH_TASKS}/${this.user.uid}`);
    return userTasks.collection('tasks').add(task);
  }

  public delete(task): Promise<any> {
    const docTask: AngularFirestoreDocument<any> = this.afStore.doc(`/task/${this.user.uid}/tasks/${task.id}`);
    return docTask.delete();
  }

  public update(task: Task): Promise<any> {
    if (!this.user) {
      return;
    }
    const docTask: AngularFirestoreDocument<any> = this.afStore.doc(`/task/${this.user.uid}/tasks/${task.id}`);
    return docTask.update(task);
  }

  public getAll(): Observable<any> {
    if (!this.user) {
      return;
    }
    const allTasks: AngularFirestoreDocument<any> = this.afStore.doc(`${DB_PATH_TASKS}/${this.user.uid}`);
    return allTasks.collection('tasks').get().pipe(
      map(res => res.docs.map(doc => {
          const id = doc.id;
          const data = doc.data();
          return {id, ...data};
        })
      )
    );
  }
}
