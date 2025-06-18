
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useCreateTeam } from '@/hooks/useTeams';

const CreateTeam = () => {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const createTeamMutation = useCreateTeam();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) {
      return;
    }

    try {
      const team = await createTeamMutation.mutateAsync({
        name: teamName.trim(),
        description: description.trim() || undefined,
      });
      
      navigate(`/teams/${team.id}`);
    } catch (error) {
      // Error is handled by the mutation
      console.error('Failed to create team:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/teams"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Teams
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Team</h1>
          <p className="text-gray-600">Set up a new team to collaborate and manage projects together</p>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-2">
                Team Name *
              </label>
              <input
                id="teamName"
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. Product Development, Marketing Team, Design Squad"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does this team work on? What are their goals?"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <Link
                to="/teams"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </Link>
              
              <button
                type="submit"
                disabled={createTeamMutation.isPending}
                className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {createTeamMutation.isPending ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Check className="w-5 h-5 mr-2" />
                )}
                {createTeamMutation.isPending ? 'Creating...' : 'Create Team'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
