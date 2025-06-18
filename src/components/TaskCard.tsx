
import React from 'react';
import { Clock, User, Flag } from 'lucide-react';
import { useUpdateTask } from '@/hooks/useTasks';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
}

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const updateTaskMutation = useUpdateTask();

  const statusColors = {
    'todo': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'done': 'bg-green-100 text-green-800'
  };

  const priorityColors = {
    'low': 'text-green-500',
    'medium': 'text-yellow-500',
    'high': 'text-red-500'
  };

  const handleStatusChange = async (newStatus: 'todo' | 'in-progress' | 'done') => {
    try {
      await updateTaskMutation.mutateAsync({
        id: task.id,
        status: newStatus
      });
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-md font-semibold text-gray-900 flex-1">{task.title}</h4>
        <Flag className={`w-4 h-4 ml-2 ${priorityColors[task.priority]}`} />
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value as 'todo' | 'in-progress' | 'done')}
            className={`px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-purple-500 ${statusColors[task.status]}`}
            disabled={updateTaskMutation.isPending}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <div className="flex items-center text-xs text-gray-500">
            <User className="w-3 h-3 mr-1" />
            {task.assignedTo}
          </div>
        </div>
        
        {task.due_date && (
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            {new Date(task.due_date).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
