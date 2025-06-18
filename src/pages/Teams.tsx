
import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import TeamCard from '../components/TeamCard';

const Teams = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in real app this would come from database
  const teams = [
    {
      id: '1',
      name: 'Product Development',
      memberCount: 8,
      activeTasks: 12,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Marketing Team',
      memberCount: 5,
      activeTasks: 7,
      createdAt: '2024-02-01'
    },
    {
      id: '3',
      name: 'Design Squad',
      memberCount: 4,
      activeTasks: 9,
      createdAt: '2024-02-10'
    }
  ];

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
            <p className="text-gray-600 mt-2">Manage and collaborate with your teams</p>
          </div>
          
          <Link
            to="/teams/create"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Team
          </Link>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {filteredTeams.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No teams found</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first team</p>
            <Link
              to="/teams/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Team
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
