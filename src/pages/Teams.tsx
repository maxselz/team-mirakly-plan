
import React from 'react';
import { Plus, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import TeamCard from '@/components/TeamCard';
import { Button } from '@/components/ui/button';
import { useTeams } from '@/hooks/useTeams';

const Teams = () => {
  const { data: teams = [], isLoading, error } = useTeams();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto animate-pulse">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <p className="text-gray-600">Loading teams...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-red-600">
            <p>Error loading teams: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Teams</h1>
            <p className="text-gray-600">Manage and collaborate with your teams</p>
          </div>
          
          <Link to="/teams/create">
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <Plus className="w-4 h-4 mr-2" />
              Create Team
            </Button>
          </Link>
        </div>

        {teams.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
              <Users className="w-12 h-12 text-purple-600" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No teams yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Get started by creating your first team. Invite members, assign tasks, and start collaborating!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/teams/create">
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Your First Team
                </Button>
              </Link>
              
              <Link to="/roadmap">
                <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                  Explore Roadmap
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
