import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss'],
})
export class TaskListItemComponent implements OnInit {

  @Input() public task: Task;

  public disabled = false;


  constructor(
    private tasksService: TasksService
  ) { }

  ngOnInit() { }


  public onChangeToggle(event: CustomEvent, taskID: string): void {
    this.disabled = true;
    this.task.todo = event.detail.checked;
    this.tasksService.update(this.task).then( task => {
      this.disabled = false;
    });
  }

}
