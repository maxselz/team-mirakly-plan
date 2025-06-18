
import React from 'react';
import { Users, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Team {
  id: string;
  name: string;
  memberCount: number;
  activeTasks: number;
  createdAt: string;
}

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{team.name}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {team.memberCount} members
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {team.activeTasks} active tasks
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-400">
          Created {new Date(team.createdAt).toLocaleDateString()}
        </div>
      </div>
      
      <Link
        to={`/teams/${team.id}`}
        className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 group"
      >
        View Dashboard
        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
      </Link>
    </div>
  );
};

export default TeamCard;
