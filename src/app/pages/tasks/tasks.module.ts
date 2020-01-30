import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TasksPage } from './tasks.page';
import { TranslatePriorityPipe } from 'src/app/pipes/translate-priority.pipe';
import { TaskListItemComponent } from 'src/app/components/task-list-item/task-list-item.component';
import { SortByPipe } from 'src/app/pipes/sort-by.pipe';

const routes: Routes = [
  {
    path: '',
    component: TasksPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [TasksPage, TranslatePriorityPipe, TaskListItemComponent, SortByPipe]
})
export class TasksPageModule {}
