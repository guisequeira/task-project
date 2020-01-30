import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Auth } from 'src/app/interfaces/auth';
import { Task } from 'src/app/interfaces/task';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  public task$: Observable<Task>;
  public formTask: FormGroup = new FormGroup({
    description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    priority: new FormControl(null, Validators.required)
  });

  public user: Auth;
  public isLoading: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tasksService: TasksService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.updateAll();
    });
  }

  private async presentToast(msg: string, colors: string) {
    const toast = await this.toastController.create({
      message: msg,
      // duration: 2000,
      position: 'top',
      color: colors,
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }

  private updateAll(): void {
    this.task$ = this.tasksService.getAll();
  }

  public onDeleteTask(task: Task): void {
    this.tasksService.delete(task).then(res => {
      this.presentToast('Tarefa deletada com sucesso!', 'success');
      this.updateAll();
    }).catch(error => {
      this.presentToast(error.message, 'danger');
    });
  }

  public onLogout(): void {
    this.authService.logout().then( user => {
      console.log('logout ', user);
      this.router.navigateByUrl('login');
    });
  }

  public onSubmitForm(): void {
    if (this.formTask.invalid) {
      return;
    }

    this.isLoading = true;
    const task: Task = this.formTask.value;
    task.todo = true;
    task.createTime = new Date();

    this.tasksService.create(task).then(res => {
      this.isLoading = false;
      this.presentToast('Tarefa criada com sucesso!', 'success');
      this.updateAll();
    }).catch(error => {
      this.presentToast(error.message, 'danger');
    });
  }

}
