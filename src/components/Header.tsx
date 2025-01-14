import React from "react";
import Filters from "./Filter";
import { PriorityFilter, SortBy, StatusFilter } from "../utils/types/filters";

interface HeaderProps {
  statusFilter: StatusFilter;
  priorityFilter: PriorityFilter;
  sortBy: SortBy;
  onStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onPriorityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onAddTask: () => void;
}

const Header: React.FC<HeaderProps> = ({
  statusFilter,
  priorityFilter,
  sortBy,
  onStatusChange,
  onPriorityChange,
  onSortChange,
  onAddTask,
}) => {
  return (
    <div className="header">
      <h1>Менеджер задач</h1>
      <div className="actions">
        <button className="add" onClick={onAddTask}>
          Добавить задачу
        </button>

        <Filters
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          sortBy={sortBy}
          onStatusChange={onStatusChange}
          onPriorityChange={onPriorityChange}
          onSortChange={onSortChange}
        />
      </div>
    </div>
  );
};

export default Header;
