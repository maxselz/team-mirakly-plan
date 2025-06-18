
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Plus, Calendar, Settings } from 'lucide-react';
import Navigation from '../components/Navigation';
import TaskCard from '../components/TaskCard';
import { useTeam, useUpdateTeam } from '@/hooks/useTeam';
import { useTasks } from '@/hooks/useTasks';

const TeamDashboard = () => {
  const { teamId } = useParams();
  const [activeTab, setActiveTab] = useState('tasks');
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const { data: team, isLoading: teamLoading } = useTeam(teamId!);
  const { data: tasks = [], isLoading: tasksLoading } = useTasks(teamId);
  const updateTeamMutation = useUpdateTeam();

  if (teamLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">Loading team...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-red-600">
            <p>Team not found</p>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'tasks', name: 'Tasks', icon: Calendar },
    { id: 'members', name: 'Members', icon: Users },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTeamMutation.mutateAsync({
        id: team.id,
        name: editName,
        description: editDescription,
      });
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update team:', error);
    }
  };

  const activeTasks = tasks.filter(t => t.status !== 'done');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/teams"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Teams
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{team.name}</h1>
              <p className="text-gray-600">{team.description}</p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Users className="w-4 h-4 mr-1" />
                {team.members?.length || 0} members
              </div>
            </div>
            
            <Link
              to={`/teams/${teamId}/create-task`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 inline mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'tasks' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Team Tasks</h3>
                  <div className="text-sm text-gray-500">
                    {activeTasks.length} active tasks
                  </div>
                </div>
                
                {tasksLoading ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Loading tasks...</p>
                  </div>
                ) : tasks.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h4>
                    <p className="text-gray-500 mb-6">Get started by creating your first task</p>
                    <Link
                      to={`/teams/${teamId}/create-task`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Task
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'members' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    <Plus className="w-4 h-4 mr-2" />
                    Invite Member
                  </button>
                </div>
                
                <div className="space-y-4">
                  {team.members?.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.role}</div>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  )) || (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No members found</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Team Settings</h3>
                {editMode ? (
                  <form onSubmit={handleSaveSettings} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Team Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        rows={3}
                        className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      />
                    </div>
                    <div className="flex items-center space-x-4 pt-4">
                      <button
                        type="submit"
                        disabled={updateTeamMutation.isPending}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 transition-colors duration-200"
                      >
                        {updateTeamMutation.isPending ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Team Name</label>
                      <p className="text-gray-900">{team.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <p className="text-gray-900">{team.description || 'No description provided'}</p>
                    </div>
                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setEditName(team.name);
                          setEditDescription(team.description || '');
                          setEditMode(true);
                        }}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
                      >
                        Edit Team
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDashboard;
