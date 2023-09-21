import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Column, Id, Task } from "./types";

interface BearState {
  bears: number;
  columns: Column[];
  tasks: Task[];
  setColumns: (newColumns: Column[]) => void;
  addColumn: () => void;
  updateColumn: (id: Id, title: string) => void;
  deleteColumn: (id: Id) => void;
  setTasks: (newTasks: Task[]) => void;
  addTask: (columnId: Id) => void;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (id: Id) => void;
}

const generateId = () => Math.floor(Math.random() * 10001);

export const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        columns: [],
        tasks: [],
        setColumns: (newColumns: Column[]) =>
          set((state) => ({ columns: (state.columns = newColumns) })),
        addColumn: () =>
          set((state) => ({
            columns: (state.columns = [
              ...state.columns,
              { id: generateId(), title: `Column ${state.columns.length + 1}` },
            ]),
          })),
        updateColumn: (id: Id, title: string) =>
          set((state) => ({
            columns: (state.columns = state.columns.map((column) => {
              if (column.id !== id) return column;
              return { ...column, title };
            })),
          })),
        deleteColumn: (id: Id) =>
          set((state) => ({
            columns: (state.columns = state.columns.filter(
              (column) => column.id !== id
            )),
            tasks: (state.tasks = state.tasks.filter(
              (task) => task.columnId !== id
            )),
          })),
        setTasks: (newTasks) =>
          set((state) => ({ tasks: (state.tasks = newTasks) })),
        addTask: (columnId: Id) =>
          set((state) => ({
            tasks: (state.tasks = [...state.tasks, {
                id: generateId(),
                columnId: columnId,
                content: `Task ${state.tasks.length}`,
              }]),
          })),
        updateTask: (id: Id, content: string) =>
          set((state) => ({
            tasks: (state.tasks = state.tasks.map((task) => {
              if (task.id !== id) return task;
              return { ...task, content };
            })),
          })),
        deleteTask: (id: Id) =>
          set((state) => ({
            tasks: (state.tasks = state.tasks.filter(
              (task) => task.id !== id
            )),
          })),
      }),
      {
        name: "bear-storage",
      }
    )
  )
);
