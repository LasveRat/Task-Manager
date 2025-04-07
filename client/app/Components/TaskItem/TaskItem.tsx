import { useTasks } from "@/context/taskContext";
import { Task } from "@/utils/types";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { item } from "@/utils/animations";
import { formatDate } from "@/utils/utilities";
import moment from "moment";

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isOverdue =
    moment(task.dueDate).isBefore(moment(), "day") && !task.completed;
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-red-500";
    }
  };

  const { getTask, openModalForEdit } = useTasks();

  return (
    <motion.div
      className="relative h-[16rem] px-4 py-3 flex flex-col shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-[1.04] will-change-transform backface-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        getTask(task._id);
        openModalForEdit(task);
      }}
      variants={item}
    >
      <div>
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-2xl pb-2 ">{task.title}</h4>
          {isOverdue && (
            <span className="relative w-3 h-3 rounded-full bg-rose-600">
              <span className="absolute w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
            </span>
          )}
        </div>
        <p>{task.description}</p>
      </div>

      <div
        className={`mt-auto flex justify-between items-center transition-all duration-300
        }`}
      >
        <p className="text-sm text-gray-400">{formatDate(task.dueDate)}</p>
        <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </p>
      </div>

      {/* Pencil Icon - Now centered in the middle */}
      <div
        className={`absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 ${
          isHovered ? "opacity-100 translate-y-0" : "translate-y-6"
        }`}
      >
        <Pencil className="w-8 h-8 text-gray-600 " />
      </div>
    </motion.div>
  );
}

export default TaskItem;
