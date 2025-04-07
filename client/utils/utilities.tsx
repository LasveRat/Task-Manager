import moment from "moment";
import { Task } from "./types";

export const formatDate = (dueDate: string) => {
  if (!dueDate) return "";

  const date = moment(dueDate, "YYYY-MM-DD"); // Ensure correct date parsing
  const today = moment();
  const tomorrow = moment().add(1, "days");

  if (date.isSame(today, "day")) {
    return "Today";
  }

  if (date.isSame(tomorrow, "day")) {
    return "Tomorrow";
  }

  return date.format("DD/MM/YYYY");
};

export const filteredTasks = (tasks: Task[], priority: string) => {
  const filteredTasks = () => {
    switch (priority) {
      case "low":
        return tasks.filter((task) => task.priority === "low");
      case "medium":
        return tasks.filter((task) => task.priority === "medium");
      case "high":
        return tasks.filter((task) => task.priority === "high");
      default:
        return tasks;
    }
  };

  return filteredTasks();
};
