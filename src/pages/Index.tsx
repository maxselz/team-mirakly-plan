
import React from 'react';
import { ArrowRight, Users, Calendar, BarChart3, Check, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: Users,
      title: 'Team Management',
      description: 'Create and manage teams with ease. Invite members, assign roles, and collaborate seamlessly.'
    },
    {
      icon: Calendar,
      title: 'Task Assignment',
      description: 'Assign tasks to team members, track progress, and ensure nothing falls through the cracks.'
    },
    {
      icon: BarChart3,
      title: 'Roadmap Planning',
      description: 'Plan your product roadmap, allocate capacity, and track dependencies across teams.'
    }
  ];

  const benefits = [
    'Streamlined team collaboration',
    'Clear task visibility and tracking',
    'Strategic roadmap planning',
    'Capacity planning and allocation',
    'Cross-team dependency management',
    'Real-time progress monitoring'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Mirakly</span>
            </div>
            
            <Link
              to="/teams"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your Team
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Collaboration</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Mirakly brings together team management, task assignment, and roadmap planning in one powerful platform. 
              Plan ahead, track progress, and deliver results with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/teams"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Target className="w-5 h-5 mr-2" />
                Start Building Teams
              </Link>
              
              <Link
                to="/roadmap"
                className="inline-flex items-center px-8 py-4 border border-gray-300 text-lg font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                View Roadmap Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Team Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From team creation to roadmap planning, Mirakly provides all the tools you need to keep your projects on track.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Teams Choose Mirakly
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Stop juggling multiple tools and spreadsheets. Mirakly brings everything together in one intuitive platform designed for modern teams.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-purple-200 to-blue-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="h-20 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Users className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="h-20 bg-green-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Team?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using Mirakly to streamline their workflow and achieve better results.
          </p>
          
          <Link
            to="/teams"
            className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-lg text-purple-600 bg-white hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Zap className="w-5 h-5 mr-2" />
            Get Started for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold">Mirakly</span>
            </div>
            <p className="text-gray-400">
              Transforming team collaboration, one project at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
