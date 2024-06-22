import {useEffect, useState} from "react";
import {getTasks} from "@/services/taskService";
import {TaskResponseDTO} from "@/types/task";

export default function useTasks() {
    const [tasks, setTasks] = useState<TaskResponseDTO[]>([]);
    const [refreshing, setRefreshing] = useState(false)
    useEffect(() => {
        async function fetchData() {
            const data = await getTasks();
            setTasks(data);
            setRefreshing(false);
        }

        fetchData();
    }, [refreshing]);

    return {tasks, refreshing, setRefreshing};
}