import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  todoForm: FormGroup;
  tasks: any[] = [];
  apiUrl = 'http://localhost:8080/api/todo';
  selectedTaskId: string | null = null; // To track the task being edited

  constructor() {
    this.todoForm = new FormGroup({
      task: new FormControl('', Validators.required),
      createdBy: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.fetchTodos();
  }

  // Fetch all tasks
  fetchTodos() {
    axios.get(this.apiUrl)
      .then(response => {
        this.tasks = response.data;
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }

  // Submit new or updated task
  onSubmit() {
    if (this.todoForm.valid) {
      const taskData = this.todoForm.value;
      if (this.selectedTaskId) {
        // Update existing task
        axios.put(`${this.apiUrl}/${this.selectedTaskId}`, taskData)
          .then(response => {
            console.log('Todo updated:', response.data);
            this.fetchTodos(); // Refresh the task list
            this.todoForm.reset(); // Reset form
            this.selectedTaskId = null; // Clear selected task ID
          })
          .catch(error => {
            console.error('Error updating todo:', error);
          });
      } else {
        // Add new task
        axios.post(`${this.apiUrl}/create`, taskData)
          .then(response => {
            console.log('Todo added:', response.data);
            this.fetchTodos(); // Refresh the task list
            this.todoForm.reset(); // Reset form
          })
          .catch(error => {
            console.error('Error adding todo:', error);
          });
      }
    }
  }

  // Edit task (populate the form with task data)
  editTask(task: any) {
    this.selectedTaskId = task._id; // Set selected task ID
    this.todoForm.setValue({
      task: task.task,
      createdBy: task.createdBy,
      dueDate: task.dueDate,
      description: task.description
    });
  }

  // Delete task
  deleteTodo(id: string) {
    axios.delete(`${this.apiUrl}/${id}`)
      .then(() => {
        console.log('Todo deleted');
        this.fetchTodos(); // Refresh the task list
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  }
}
