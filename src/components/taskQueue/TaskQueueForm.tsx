import React, { useState } from 'react';
import { createTaskQueue } from '@/services/taskQueueService';
import { TaskQueueRequestDTO } from '@/types/taskQueue';

const TaskQueueForm = () => {
    const [taskIds, setTaskIds] = useState<number[]>([]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newTaskQueue: TaskQueueRequestDTO = { taskIds };
        try {
            await createTaskQueue(newTaskQueue);
            // Reset form
            setTaskIds([]);
        } catch (error) {
            console.error('Error creating task queue:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Task IDs (comma separated):</label>
                <input
                    type="text"
                    value={taskIds.join(',')}
                    onChange={(e) => setTaskIds(e.target.value.split(',').map(id => parseInt(id.trim(), 10)))}
                />
            </div>
            <button type="submit">Create Task Queue</button>
        </form>
    );
};

export default TaskQueueForm;
