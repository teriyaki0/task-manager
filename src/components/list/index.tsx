import React from "react";
import TaskItem from "../task";
import { Task } from "../../utils/types/task";
import styles from "./TaskList.module.scss";

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask }) => {
  return (
    <ul className={styles.root}>
      {tasks?.map((task, index) => (
        <TaskItem key={index} task={task} onTaskDeleted={onDeleteTask} />
      ))}
    </ul>
  );
};

export default TaskList;
