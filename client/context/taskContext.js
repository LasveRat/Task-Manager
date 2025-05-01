import axios from "axios";
import React , { act, createContext, useEffect } from "react";
import { useUserContext } from "./userContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";



const TasksContext = createContext();

const serverUrl = "http://localhost:8000/api/v1";

export const TasksProvider = ({ children }) => {

    const userId = useUserContext().user._id;
    const [tasks, setTasks] = React.useState([]);   
    const [loading , setLoading] = React.useState(false);
    const [task , setTask] = React.useState({});

    const [isEditing , setIsEditing] = React.useState(false);
    const [priority , setPriority] = React.useState("today"); 
    const [activeTask , setActiveTask] = React.useState(null);
    const [modalMode , setModalMode] = React.useState("");
    const [profileModal , setProfileModal] = React.useState(false);
    const router = useRouter();
    const hasShownToast = useRef(false);

    // open modal for add task
    const openModalForAdd = () => {
        setModalMode("add");
        setIsEditing(true);
        setTask({});
    };

    // open modal for edit task
    const openModalForEdit = (task) => {
        setModalMode("edit");
        setIsEditing(true);
        setActiveTask(task);
    };

    // close modal
    const closeModal = () => {
        setIsEditing(false);
        setProfileModal(false);
        setModalMode("");
        setActiveTask(null);
        setTask({});
    };

    const openProfileModal = () => {
        setProfileModal(false);
    };

    // get tasks 
    const getTasks = async () => {

        setLoading(true);
        try {
            const response = await axios.get(`${serverUrl}/tasks`);
            setTasks(response.data.tasks);
        } catch (error) {
            console.log("Error getting tasks", error);
        }
        setLoading(false);
    };

    // get task
    const getTask = async (taskId) => {
        setLoading(true);
        try {
            const response = await axios.get(`${serverUrl}/task/${taskId}`);
            setTask(response.data);
        } catch (error) {
            console.log("Error getting task", error);
        }
        setLoading(false);
    };



    // create task
    const createTask = async (task) => {
        setLoading(true);
        try {
            const res = await axios.post(`${serverUrl}/task/create`, task);
            setTasks([...tasks, res.data]);
            toast.success("Task created successfully");
        } catch (error) {
            console.log("Error creating task", error);
        }
        setLoading(false);
    };

    // update task
    const updateTask = async (task) => {
        setLoading(true);
        try {
          const res = await axios.patch(`${serverUrl}/task/${task._id}`, task);
    
          // update the task in the tasks array
          const newTasks = tasks.map((tsk) => {
            return tsk._id === res.data._id ? res.data : tsk;
          });
    
          toast.success("Task updated successfully");
    
          setTasks(newTasks);
        } catch (error) {
          console.log("Error updating task", error);
        }
      };
    

    // delete task
    const deleteTask = async (taskId) => {
        setLoading(true);
        try {
            await axios.delete(`${serverUrl}/task/${taskId}`);

            // remove the task from the tasks array
            const newTasks = tasks.filter((tsk) => tsk._id !== taskId);
            setTasks(newTasks);
        } catch (error) {
            console.log("Error deleting task", error);
        }
    };

    const handleInput = (name) => (e) => {
        if (name === "setTask"){
            setTask(e);
        }else{
            setTask({...task, [name]: e.target.value});
        }
    }

    // get completed tasks
    const completedTasks = tasks.filter((task) => task.completed);

    // get pending tasks
    const activeTasks = tasks.filter((task) => !task.completed);

    useEffect(() => {
        getTasks();
    
    }, [userId ]);

    useEffect(() => {
        if (hasShownToast.current || tasks.length === 0) return;
      
        const now = new Date();
        const overdueTasks = tasks.filter((task) => {
          const dueDate = new Date(task.dueDate);
          return !task.completed && dueDate < now;
        });
      
        if (overdueTasks.length > 0) {
          toast((t) => (
            <span className="flex items-center gap-2">
                <FaInfoCircle className="m-5"/>
              <strong className="text-xl">You have {overdueTasks.length} overdue task{overdueTasks.length > 1 ? 's' : ''}</strong>
              <button
                onClick={() => {
                  router.push("/pending");``
                  toast.dismiss(t.id);
                }}
                className="text-blue-500 underline"
              >
                View
              </button>
            </span>
          ));
          hasShownToast.current = true;
        }
      }, [tasks]);
    return (
        <TasksContext.Provider 
            value={{
                tasks,
                loading,
                task,
                tasks,
                getTask,
                createTask,
                updateTask,
                deleteTask,
                priority,
                setPriority,
                handleInput,
                isEditing,
                setIsEditing,
                openModalForAdd,
                openModalForEdit,
                activeTask,
                closeModal,
                modalMode,
                openProfileModal,
                activeTasks,
                completedTasks,
                profileModal,
                
                }}>
            {children}
        </TasksContext.Provider>
    )
};

export const useTasks = () => {
    return React.useContext(TasksContext);
};