import React, { useState, useEffect, useCallback } from "react";
import {
  useGetTasksQuery,
  useDeleteTaskMutation,
} from "../../feature/tasksApi";
import Spinner from "../../components/spinner";
import Header from "../../components/Header";
import TaskList from "../../components/list";
import {
  PriorityFilter,
  SortBy,
  StatusFilter,
} from "../../utils/types/filters";
import { debounce } from "lodash";
import ModalTask from "../../components/modal/ModalTask";
import { Task } from "../../utils/types/task";

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "" as StatusFilter,
    priority: "" as PriorityFilter,
    sortBy: "id" as SortBy,
  });
  const [hasMore, setHasMore] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const { data, isLoading, isFetching } = useGetTasksQuery({
    page,
    ...filters,
  });

  const [deleteTask] = useDeleteTaskMutation();

  useEffect(() => {
    const savedFilters = localStorage.getItem("filters");
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    if (data) {
      setAllTasks((prevTasks) => (page === 1 ? data : [...prevTasks, ...data]));
      setHasMore(data.length >= 13);
    }
  }, [data, page]);

  const handleScroll = useCallback(
    debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1
      ) {
        if (!isFetching && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    }, 200),
    [isFetching, hasMore]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    filterType: keyof typeof filters
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: e.target.value,
    }));
    setPage(1);
    setHasMore(true);
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id).unwrap();
    setAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <Header
        statusFilter={filters.status}
        priorityFilter={filters.priority}
        sortBy={filters.sortBy}
        onStatusChange={(e) => handleFilterChange(e, "status")}
        onPriorityChange={(e) => handleFilterChange(e, "priority")}
        onSortChange={(e) => handleFilterChange(e, "sortBy")}
        onAddTask={() => setIsModalOpen(true)}
      />

      <div className="task-list">
        {isLoading && page === 1 ? (
          <Spinner />
        ) : (
          <TaskList tasks={allTasks} onDeleteTask={handleDeleteTask} />
        )}
      </div>

      {isFetching && <Spinner />}

      <ModalTask isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default HomePage;
