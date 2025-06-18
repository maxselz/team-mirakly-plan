import React from 'react';
import { Plus, Calendar, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';

const Tasks = () => {
  // For now, showing empty state - will be populated with real data later
  const tasks: any[] = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Tasks</h1>
            <p className="text-gray-600">Track and manage all your assigned tasks</p>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
              <CheckSquare className="w-12 h-12 text-purple-600" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks assigned</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Once you join a team or create tasks, they'll appear here. Start by creating a team!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/teams/create">
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Team
                </Button>
              </Link>
              
              <Link to="/teams">
                <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Teams
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tasks will be rendered here when data is available */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
