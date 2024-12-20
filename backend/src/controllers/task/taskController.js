import asyncHandler from 'express-async-handler';
import taskModel from '../../models/tasks/taskModel.js';


// Create a new task
export const createTask = asyncHandler(async (req, res) => {
    try {
        const { title, description, dueDate, priority, status } = req.body;

        

        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Title is required" });
        }

        const task = new taskModel({
            title,
            description,
            dueDate,
            priority,
            status,
            user: req.user._id,
        });

        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.error("Error:", error.message); 
        res.status(500).json({ message: error.message });
    }
});

// Get all tasks of a user 
export const getTasks = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        if (!userId) {
            return res.status(400).json({ message: "User not Found!" });
        }
        const tasks = await taskModel.find({ user: userId});

        res.status(200).json({
            length: tasks.length,
            tasks,
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: error.message });
    }
}
);

// Get a task by id
export const getTask = asyncHandler(async (req, res) =>{
    try {
        const userId = req.user._id;
        const { id } = req.params;

        if (!id){
            return res.status(400).json({ message: "Please provide a task id" });
        }

        const task = await taskModel.findById(id);

        if(!task){
            return res.status(400).json({ message: "Task not found" });
        }

        if (!task.user.equals(userId)){
            return res.status(401).json({ message: "Not authorized!" });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error("Error in getTask:", error.message);
        res.status(500).json({ message: error.message });
    }
})

// Update a task
export const updateTask = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;
        const { title, description, dueDate, priority, status , completed } = req.body;

        if (!id){
            return res.status(400).json({ message: "Please provide a task id" });
        }

        const task = await taskModel.findById(id);

        if (!task){
            return res.status(400).json({ message: "Task not found" });
        }

        // check if the user is authorized to update the task
        if (!task.user.equals(userId)){
            return res.status(401).json({ message: "Not authorized!" });
        }
        // update the task with the new data OR keep the old data
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;
        task.status = status || task.status;
        task.completed = completed || task.completed;

        await task.save();
        return res.status(200).json(task);
    } catch (error) {
        console.log("Error in updateTask:", error.message);
        return res.status(500).json({ message: error.message });
    }

}
);

// Delete a task
export const deleteTask = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;
        const task = await taskModel.findById(id);
        
        if (!id){
            return res.status(400).json({ message: "Please provide a task id" });
        }

        if (!task){
            return res.status(400).json({ message: "Task not found" });
        }

        // check if the user is authorized to delete the task
        if (!task.user.equals(userId)){
            return res.status(401).json({ message: "Not authorized!" });
        }

        await taskModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.log("Error in deleteTask:", error.message);
        return res.status(500).json({ message: error.message });
    }
}
);