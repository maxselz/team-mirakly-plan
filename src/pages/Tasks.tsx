
import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import TaskCard from '../components/TaskCard';

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - in real app this would come from database
  const allTasks = [
    {
      id: '1',
      title: 'Redesign user dashboard',
      description: 'Update the main dashboard with new design system components and improved user experience',
      status: 'in-progress' as const,
      assignedTo: 'Carol Davis',
      priority: 'high' as const,
      dueDate: '2024-07-15'
    },
    {
      id: '2',
      title: 'API integration for notifications',
      description: 'Implement real-time notification system using WebSocket API',
      status: 'todo' as const,
      assignedTo: 'Bob Smith',
      priority: 'medium' as const,
      dueDate: '2024-07-20'
    },
    {
      id: '3',
      title: 'User testing session setup',
      description: 'Organize and conduct user testing sessions for the new features',
      status: 'done' as const,
      assignedTo: 'Alice Johnson',
      priority: 'low' as const,
      dueDate: '2024-07-10'
    },
    {
      id: '4',
      title: 'Mobile responsiveness fixes',
      description: 'Fix layout issues on mobile devices for the new features',
      status: 'todo' as const,
      assignedTo: 'David Wilson',
      priority: 'high' as const,
      dueDate: '2024-07-18'
    }
  ];

  const filteredTasks = allTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: allTasks.length,
    todo: allTasks.filter(t => t.status === 'todo').length,
    'in-progress': allTasks.filter(t => t.status === 'in-progress').length,
    done: allTasks.filter(t => t.status === 'done').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Tasks</h1>
            <p className="text-gray-600 mt-2">View and manage tasks across all teams</p>
          </div>
          
          <Link
            to="/teams"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Task
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tasks, assignees, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-9 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none"
                  >
                    <option value="all">All Status ({statusCounts.all})</option>
                    <option value="todo">To Do ({statusCounts.todo})</option>
                    <option value="in-progress">In Progress ({statusCounts['in-progress']})</option>
                    <option value="done">Done ({statusCounts.done})</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
