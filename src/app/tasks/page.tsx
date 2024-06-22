'use client';
import {NextPage} from 'next';
import TaskForm from '../../components/task/TaskForm';
import withAuth from "@/components/withAuth";
import useTasks from "@/hooks/useTasks";
import ListView from "@/components/ListView";

const Tasks: NextPage = () => {
    const {tasks, setRefreshing} = useTasks();

    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
            <TaskForm setRefreshing={setRefreshing}/>
            <div>
                <h1>Tasks</h1>
                <ListView values={tasks.map(task => ({
                    id: task.taskId,
                    name: `${task.title} (deadline: ${task.deadline.toString()})`,
                    desc: task.description,
                    href: `/tasks/${task.taskId}`
                }))}/>
            </div>
        </div>
    );
};

export default withAuth(Tasks);
