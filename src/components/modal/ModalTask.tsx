import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Task } from "../../utils/types/task";
import {
  useAddTaskMutation,
  useUpdateTaskMutation,
} from "../../feature/tasksApi";

interface ModalTaskProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task; 
}

const AddTaskForm: React.FC<ModalTaskProps> = ({
  isOpen,
  onClose,
  taskToEdit,
}) => {
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Task>({
    defaultValues: {
      title: "",
      description: "",
      status: false,
      priority: "None",
    },
  });

  useEffect(() => {
    if (taskToEdit) {
      setValue("title", taskToEdit.title);
      setValue("description", taskToEdit.description);
      setValue("status", taskToEdit.status);
      setValue("priority", taskToEdit.priority);
    } else {
      reset();
    }
  }, [taskToEdit, setValue, reset]);

  const onSubmit = async (data: Task) => {
    try {
      if (taskToEdit) {
        await updateTask({ ...taskToEdit, ...data }).unwrap();
        window.location.reload();
      } else {
        await addTask(data).unwrap();
        window.location.reload();
      }
      onClose(); 
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <form onSubmit={handleSubmit(onSubmit)} className="modal">
        <div>
          <Controller
            name="title"
            control={control}
            rules={{
              required: "Title is required",
              minLength: {
                value: 4,
                message: "Title must be at least 4 characters",
              },
            }}
            render={({ field }) => (
              <input
                id="title"
                {...field}
                placeholder="Task title"
                className={errors.title ? "input-error" : ""}
              />
            )}
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div>
          <Controller
            name="description"
            control={control}
            rules={{
              required: "Description is required",
            }}
            render={({ field }) => (
              <textarea
                id="description"
                {...field}
                placeholder="Task description"
                className={errors.description ? "input-error" : ""}
              />
            )}
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>

        <div>
          <Controller
            name="priority"
            control={control}
            rules={{
              required: "Priority is required",
            }}
            render={({ field }) => (
              <select {...field} id="priority">
                <option value="None">None</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            )}
          />
          {errors.priority && <span>{errors.priority.message}</span>}
        </div>

        <div>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                id="status"
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </div>

        <button type="submit">{taskToEdit ? "Update Task" : "Add Task"}</button>
      </form>
    </>
  );
};

export default AddTaskForm;
