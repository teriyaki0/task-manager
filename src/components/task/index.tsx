import React, { useState, useCallback } from "react";
import { useDeleteTaskMutation } from "../../feature/tasksApi";
import { Task } from "../../utils/types/task";
import trash from "../../assets/img/trash.svg";
import update from "../../assets/img/update.svg";
import DeleteModal from "../modal/DeleteModal";
import ModalTask from "../modal/ModalTask";

interface TaskItemProps {
  task: Task;
  onTaskDeleted: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = React.memo(
  ({ task, onTaskDeleted }) => {
    const [deleteTask] = useDeleteTaskMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const handleDelete = useCallback(async () => {
      try {
        if (task.id) {
          await deleteTask(task.id).unwrap();
          onTaskDeleted(task.id);
          setIsModalOpen(false);
          window.location.reload();
        } else {
          console.error("Task ID is undefined");
        }
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }, [deleteTask, onTaskDeleted, task.id]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openUpdateModal = () => setIsModalUpdateOpen(true);
    const closeUpdateModal = () => setIsModalUpdateOpen(false);

    return (
      <div className="taskItem">
        <h3 className="taskTitle">{task.title}</h3>
        <p className="taskDescription">{task.description}</p>
        <p className="taskPriority">
          <span className={`taskPriority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
        </p>
        <p className="taskStatus">
          Статус: {task.status ? "Выполнено" : "Не выполнено"}
        </p>
        <button onClick={openModal} className="deleteButton">
          <img src={trash} alt="Trash" />
        </button>
        <button onClick={openUpdateModal} className="updateButton">
          <img src={update} alt="Update" />
        </button>
        <DeleteModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleDelete}
          taskName={task.title}
        />
        <ModalTask
          isOpen={isModalUpdateOpen}
          onClose={closeUpdateModal}
          taskToEdit={task}
        />
      </div>
    );
  }
);

export default TaskItem;
