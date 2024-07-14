import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TareasService } from './services/tareas.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('inputTarea') inputTarea!: ElementRef;
  listaTareas: string[] = [];
  nuevaTarea: string = '';

  private _tareasService = inject(TareasService);

  ngOnInit(): void {
    this.listaTareas = this._tareasService.getTareas();
  }

  ngAfterViewInit(): void {
      this.focusInput();
  }

  focusInput() {
    setTimeout(() => {
      this.inputTarea.nativeElement.focus();
    }, 0);
  }

  agregarTarea() {
    if(this.nuevaTarea.trim() !== '') {
      this._tareasService.agregarTarea(this.nuevaTarea);
      this.nuevaTarea = '';
      this.getTareas();
      this.focusInput();
    }
  }

  eliminarTarea(index: number) {
    this._tareasService.eliminarTarea(index);
    this.getTareas();
    this.focusInput();
  }

  eliminarTareas() {
    this._tareasService.eliminarTareas();
    this.listaTareas = []; 
  }

  getTareas() {
    this.listaTareas = this._tareasService.getTareas();
  }
}
