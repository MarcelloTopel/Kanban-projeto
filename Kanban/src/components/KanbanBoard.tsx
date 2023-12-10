import { useMemo, useState } from "react";
import { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

// Definição de colunas e tarefas padrão
const defaultCols: Column[] = [
  {
    id: "todo",
    title: "tarefas",
  },
];

const defaultTasks: Task[] = [
  {
    id: "1",
    columnId: "todo",
    content: "teste1",
  },
];

// Função principal do componente KanbanBoard
function KanbanBoard() {
  // Estado para as colunas e tarefas
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  // Sensores para interações de arrastar e soltar
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  // Função para criar uma nova tarefa
  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  // Função para deletar uma tarefa
  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  // Função para atualizar o conteúdo de uma tarefa
  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  // Função para deletar uma coluna
  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  }

  // Função para atualizar o título de uma coluna
  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  // Função para gerar IDs únicos
  function generateId() {
    return Math.floor(Math.random() * 10001);
  }

  // Manipuladores de eventos de arrastar e soltar
  function onDragStart(event: DragStartEvent) {
    // Lógica para tratamento de início de arrasto
    // ... (pode ser personalizada conforme necessário)
  }

  function onDragEnd(event: DragEndEvent) {
    // Lógica para tratamento de finalização de arrasto
    // ... (pode ser personalizada conforme necessário)
  }

  function onDragOver(event: DragOverEvent) {
    // Lógica para tratamento de arrasto sobre outro elemento
    // ... (pode ser personalizada conforme necessário)
  }

  // Renderização do componente
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      {/* Contexto de arrastar e soltar */}
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            {/* Contexto ordenável para as colunas */}
            <SortableContext items={columnsId}>
              {/* Mapeia e renderiza cada ColumnContainer para as colunas */}
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={() => createTask(col.id)}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
        </div>

        {/* Portal para a camada de arrasto (overlay) */}
        {createPortal(
          <DragOverlay>
            {/* Pode ser personalizado conforme necessário */}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}

// Exporta o componente KanbanBoard como o componente padrão deste módulo
export default KanbanBoard;
