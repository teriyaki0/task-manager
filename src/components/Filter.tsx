import React from "react";
import { PriorityFilter, SortBy, StatusFilter } from "../utils/types/filters";

interface FiltersProps {
  statusFilter: StatusFilter;
  priorityFilter: PriorityFilter;
  sortBy: SortBy;
  onStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onPriorityChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filters: React.FC<FiltersProps> = ({
  statusFilter,
  priorityFilter,
  sortBy,
  onStatusChange,
  onPriorityChange,
  onSortChange,
}) => {
  return (
    <div className="filters">
      <select onChange={onStatusChange} value={statusFilter || ""}>
        <option value="">Все</option>
        <option value="true">Выполненные</option>
        <option value="false">Невыполненные</option>
      </select>

      <select onChange={onPriorityChange} value={priorityFilter || ""}>
        <option value="">Все</option>
        <option value="High">Высокий</option>
        <option value="Medium">Средний</option>
        <option value="Low">Низкий</option>
        <option value="None">Без приоритета</option>
      </select>

      <select onChange={onSortChange} value={sortBy}>
        <option value="id">По дате</option>
        <option value="title">По названию</option>
        <option value="status">По статусу</option>
        <option value="priority">По приоритету</option>
      </select>
    </div>
  );
};

export default Filters;
