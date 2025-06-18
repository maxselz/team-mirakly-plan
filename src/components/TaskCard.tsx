
import React from 'react';
import { Clock, User, Flag } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
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

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-md font-semibold text-gray-900 flex-1">{task.title}</h4>
        <Flag className={`w-4 h-4 ml-2 ${priorityColors[task.priority]}`} />
      </div>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
            {task.status.replace('-', ' ')}
          </span>
          <div className="flex items-center text-xs text-gray-500">
            <User className="w-3 h-3 mr-1" />
            {task.assignedTo}
          </div>
        </div>
        
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="w-3 h-3 mr-1" />
          {new Date(task.dueDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
