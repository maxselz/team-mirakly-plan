
import React, { useState } from 'react';
import { Calendar, Users, Plus, Target, Clock } from 'lucide-react';
import Navigation from '../components/Navigation';

const Roadmap = () => {
  const [viewMode, setViewMode] = useState('timeline');

  // Mock roadmap data
  const roadmapItems = [
    {
      id: '1',
      title: 'User Authentication System',
      description: 'Implement secure login and registration functionality',
      status: 'completed',
      priority: 'high',
      startDate: '2024-06-01',
      endDate: '2024-06-15',
      assignedTeam: 'Backend Team',
      progress: 100,
      dependencies: []
    },
    {
      id: '2',
      title: 'Mobile App UI Redesign',
      description: 'Redesign mobile app interface with new design system',
      status: 'in-progress',
      priority: 'high',
      startDate: '2024-06-10',
      endDate: '2024-07-20',
      assignedTeam: 'Design Team',
      progress: 65,
      dependencies: ['1']
    },
    {
      id: '3',
      title: 'Advanced Analytics Dashboard',
      description: 'Build comprehensive analytics and reporting features',
      status: 'planned',
      priority: 'medium',
      startDate: '2024-07-15',
      endDate: '2024-08-30',
      assignedTeam: 'Product Team',
      progress: 0,
      dependencies: ['2']
    },
    {
      id: '4',
      title: 'API Performance Optimization',
      description: 'Optimize API endpoints for better performance and scalability',
      status: 'planned',
      priority: 'high',
      startDate: '2024-08-01',
      endDate: '2024-08-20',
      assignedTeam: 'Backend Team',
      progress: 0,
      dependencies: []
    }
  ];

  const quarters = [
    { name: 'Q2 2024', months: ['Jun', 'Jul', 'Aug'] },
    { name: 'Q3 2024', months: ['Sep', 'Oct', 'Nov'] },
    { name: 'Q4 2024', months: ['Dec', 'Jan', 'Feb'] }
  ];

  const statusColors = {
    completed: 'bg-green-500',
    'in-progress': 'bg-blue-500',
    planned: 'bg-gray-400'
  };

  const priorityColors = {
    high: 'text-red-500',
    medium: 'text-yellow-500',
    low: 'text-green-500'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Roadmap</h1>
            <p className="text-gray-600 mt-2">Plan and track product features across teams</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'timeline' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Timeline
              </button>
              <button
                onClick={() => setViewMode('capacity')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === 'capacity' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Capacity
              </button>
            </div>
            
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              <Plus className="w-4 h-4 mr-2" />
              Add Feature
            </button>
          </div>
        </div>

        {viewMode === 'timeline' && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Roadmap Timeline</h3>
              <p className="text-sm text-gray-500 mt-1">Track feature development across quarters</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {roadmapItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-md font-semibold text-gray-900">{item.title}</h4>
                          <span className={`w-3 h-3 rounded-full ${statusColors[item.status]}`}></span>
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            {item.status.replace('-', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {item.assignedTeam}
                          </div>
                          <div className="flex items-center">
                            <Target className={`w-4 h-4 mr-1 ${priorityColors[item.priority]}`} />
                            {item.priority} priority
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900 mb-1">{item.progress}%</div>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    {item.dependencies.length > 0 && (
                      <div className="text-xs text-gray-500 bg-gray-50 rounded p-2">
                        <span className="font-medium">Dependencies:</span> Blocked by features {item.dependencies.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'capacity' && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Team Capacity Planning</h3>
              <p className="text-sm text-gray-500 mt-1">Allocate team capacity across upcoming features</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Capacity Allocation</h4>
                  <div className="space-y-4">
                    {['Backend Team', 'Frontend Team', 'Design Team', 'Product Team'].map((team) => (
                      <div key={team} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-medium text-gray-900">{team}</h5>
                          <span className="text-sm text-gray-500">5 members</span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Current Allocation</span>
                            <span className="font-medium">85%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        
                        <div className="mt-3 text-xs text-gray-500">
                          <div>• Mobile App UI Redesign (40%)</div>
                          <div>• API Performance Optimization (25%)</div>
                          <div>• Bug fixes and maintenance (20%)</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Upcoming Milestones</h4>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">Q3 Planning</h5>
                        <Clock className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Finalize Q3 feature priorities and team allocations</p>
                      <div className="text-xs text-gray-500">Due: July 1, 2024</div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">Mobile Release</h5>
                        <Clock className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Launch redesigned mobile app to app stores</p>
                      <div className="text-xs text-gray-500">Due: July 20, 2024</div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">Analytics Beta</h5>
                        <Clock className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Release analytics dashboard to beta users</p>
                      <div className="text-xs text-gray-500">Due: August 15, 2024</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
