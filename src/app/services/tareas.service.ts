import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private localStorageKey = 'listaTareas';

  constructor() { }

  getTareas(): string[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) as string) || [];
  }

  agregarTarea(tarea: string) {
    const tareas = this.getTareas();
    tareas.push(tarea);
    this.setLocalStorage(tareas);
  }

  eliminarTarea(index: number) {
    const tareas = this.getTareas();
    tareas.splice(index, 1);
    this.setLocalStorage(tareas);
  }

  eliminarTareas() {
    localStorage.removeItem(this.localStorageKey);
  }

  setLocalStorage(tareas: string[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tareas));
  }
}
