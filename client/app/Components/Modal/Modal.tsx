"use client";
import { useTasks } from "@/context/taskContext";
import { trash } from "@/utils/icons";
import moment from "moment";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertOctagon } from "lucide-react";

function Modal() {
  const defaultTask = {
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
    completed: false,
  };
  const {
    task = defaultTask,
    handleInput,
    createTask,
    closeModal,
    modalMode,
    activeTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const isOverdue =
    moment(task.dueDate).isBefore(moment(), "day") && !task.completed;
  useEffect(() => {
    if (modalMode === "edit" && activeTask) {
      handleInput("setTask")(activeTask);
    }
  }, [modalMode, activeTask]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (modalMode === "edit") {
      updateTask(task);
    } else if (modalMode === "add") {
      createTask(task);
    }
    closeModal();
  };

  if (isOverdue) {
    return (
      <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/80 overflow-hidden">
        <form
          action=""
          className="py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <button
            type="button"
            className="absolute top-3 right-3 text-gray-500 hover:text-black font-bold text-4xl"
            onClick={closeModal}
          >
            &times;
          </button>
          <h3 className="text-red-600  font-bold text-2xl text-center">
            Missed deadline!
          </h3>
          <h3 className="text-center text-l italic text-gray-500">
            Mark as done or update.
          </h3>

          <div className="flex flex-col gap-1">
            <label htmlFor="dueDate">Due Date</label>
            <input
              className="bg-[#F9F9F9] p-2 rounded-md border"
              type="date"
              name="dueDate"
              value={task?.dueDate || ""}
              onChange={(e) => handleInput("dueDate")(e)}
            />
          </div>

          <div className="mt-8 flex justify-between gap-4">
            <div>
              <select
                className="bg-[#F9F9F9] p-2 rounded-md border cursor-pointer"
                name="completed"
                value={task.completed ? "true" : "false"}
                onChange={(e) => handleInput("completed")(e)}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            {modalMode === "edit" && (
              <button
                className="text-white py-2 rounded-md w-full bg-red-500 transition duration-200 ease-in-out hover:bg-red-600"
                onClick={() => {
                  deleteTask(task._id);
                }}
              >
                {trash} Delete Task
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/80 overflow-hidden">
      <form
        action=""
        className="py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-500 hover:text-black font-bold text-4xl"
          onClick={closeModal}
        >
          &times;
        </button>
        {!isOverdue && (
          <h1 className="text-2xl font-bold text-center">
            {modalMode === "edit" ? "Edit your Task" : "Create a new Task"}
          </h1>
        )}
        {isOverdue && (
          <div>
            <h3 className="text-red-600  font-bold text-2xl text-center">
              Missed deadline!
            </h3>
            <h3 className="text-center text-l italic text-gray-500">
              Mark as done or update.
            </h3>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            className="bg-[#F9F9F9] p-2 rounded-md border"
            type="text"
            id="title"
            placeholder="Go to the gym"
            name="title"
            value={task?.title || ""}
            onChange={(e) => handleInput("title")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            className="bg-[#F9F9F9] p-2 rounded-md border resize-none"
            name="description"
            placeholder="Task Description"
            rows={4}
            value={task?.description || ""}
            onChange={(e) => handleInput("description")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="priority">Select Priority</label>
          <select
            className="bg-[#F9F9F9] p-2 rounded-md border cursor-pointer"
            name="priority"
            value={task?.priority || "low"}
            onChange={(e) => handleInput("priority")(e)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="dueDate">Due Date</label>
          <input
            className="bg-[#F9F9F9] p-2 rounded-md border"
            type="date"
            name="dueDate"
            value={task?.dueDate || ""}
            onChange={(e) => handleInput("dueDate")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="completed">Task Completed</label>
          <div className="flex items-center justify-between bg-[#F9F9F9] p-2 rounded-md border">
            <label htmlFor="completed">Completed</label>
            <div>
              <select
                className="bg-[#F9F9F9] p-2 rounded-md border cursor-pointer"
                name="completed"
                value={task.completed ? "true" : "false"}
                onChange={(e) => handleInput("completed")(e)}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between gap-4">
          <button
            type="submit"
            className={`text-white py-2 rounded-md w-full bg-blue-500 transition duration-200 ease-in-out hover:bg-blue-600 ${
              modalMode === "edit" ? "bg-green-500 hover:bg-green-600" : ""
            }`}
          >
            {modalMode === "edit" ? "Save" : "Create Task"}
          </button>

          {modalMode === "edit" && (
            <button
              className="text-white py-2 rounded-md w-full bg-red-500 transition duration-200 ease-in-out hover:bg-red-600"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              {trash} Delete Task
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Modal;
