import { useMemo, useState } from "react";
import MinusIcon from "../icons/MinusIcon";
import { Column } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";
import { SortableContext } from "@dnd-kit/sortable";
import { useBearStore } from "../store";

interface Props {
  column: Column;
}

export default function ColumnContainer(props: Props) {
  const { column } = props;

  const [allTasks, addTask, deleteColumn, updateColumn] = useBearStore((state) => [
    state.tasks,
    state.addTask,
    state.deleteColumn,
    state.updateColumn,
  ])
  
  const tasks = allTasks.filter((task) => task.columnId === column.id);

  const tasksId = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const [editMode, setEditMode] = useState<boolean>(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor
        opacity-40
        border-2
        border-pink-500
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col"
      ></div>
    );
  }

  return (
    <div
      className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
      ref={setNodeRef}
      style={style}
    >
      {/* Column Header */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="items-center justify-between flex bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4"
      >
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            0
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-black focus:border-rose-500 border rounded outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          className="px-1 py-2 stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded"
          onClick={() => deleteColumn(column.id)}
        >
          <MinusIcon />
        </button>
      </div>

      {/* Column Content */}
      <div className="flex flex-grow flex-col gap-4 p-2 over-flow-x-hidden overflow-y-auto">
        <SortableContext items={tasksId}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
      <button
        className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
        onClick={() => {
          addTask(column.id);
        }}
      >
        <PlusIcon />
        Add task
      </button>
    </div>
  );
}
