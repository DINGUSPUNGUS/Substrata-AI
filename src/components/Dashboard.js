import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/dashboard`);
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Field Surveys',
      value: dashboardData?.overview?.total_field_surveys || 0,
      icon: '🔍',
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: 'Active Projects',
      value: dashboardData?.overview?.total_projects || 0,
      icon: '🌿',
      change: '+5%',
      changeType: 'increase'
    },
    {
      name: 'Stakeholders',
      value: dashboardData?.overview?.total_stakeholders || 0,
      icon: '👥',
      change: '+8%',
      changeType: 'increase'
    },
    {
      name: 'Grant Applications',
      value: dashboardData?.overview?.total_grants || 0,
      icon: '💰',
      change: '+2%',
      changeType: 'increase'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="gradient-bg rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Substrata.AI</h1>
        <p className="text-green-100 text-lg">
          Empowering conservation through data-driven insights and AI-powered tools
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="conservation-card rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-400 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-white">
                      {stat.value}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Surveys */}
        <div className="conservation-card rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">🔍</span>
            Recent Field Surveys
          </h3>
          <div className="space-y-3">
            {dashboardData?.recent_activity?.latest_surveys?.slice(0, 3).map((survey) => (
              <div key={survey.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div>
                  <p className="font-medium text-white">{survey.species_name}</p>
                  <p className="text-sm text-slate-400">{survey.location_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-400">{survey.count} observed</p>
                  <span className={`status-indicator ${
                    survey.conservation_status === 'critically_endangered' ? 'status-endangered' :
                    survey.conservation_status === 'endangered' ? 'status-endangered' :
                    survey.conservation_status === 'vulnerable' ? 'status-vulnerable' :
                    'status-stable'
                  }`}></span>
                  <span className="text-xs text-slate-400 capitalize">
                    {survey.conservation_status?.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Projects */}
        <div className="conservation-card rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">🌿</span>
            Active Projects
          </h3>
          <div className="space-y-3">
            {dashboardData?.recent_activity?.active_projects?.slice(0, 3).map((project) => (
              <div key={project.id} className="p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{project.name}</h4>
                  <span className="status-indicator status-active"></span>
                </div>
                <p className="text-sm text-slate-400 mb-2">{project.location}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-400">
                    ${project.budget?.toLocaleString() || 'Budget TBD'}
                  </span>
                  <span className="text-xs text-slate-400">
                    Led by {project.project_lead}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conservation Impact Summary */}
      <div className="conservation-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="mr-2">🌍</span>
          Conservation Impact Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">
              {dashboardData?.conservation_impact?.species_monitored || 0}
            </div>
            <div className="text-sm text-slate-400 mt-1">Species Monitored</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">
              {dashboardData?.conservation_impact?.locations_covered || 0}
            </div>
            <div className="text-sm text-slate-400 mt-1">Locations Covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400">
              {dashboardData?.conservation_impact?.threatened_species_tracked || 0}
            </div>
            <div className="text-sm text-slate-400 mt-1">Threatened Species</div>
          </div>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="conservation-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="mr-2">💰</span>
          Financial Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-slate-400">Total Project Budget</div>
            <div className="text-2xl font-bold text-green-400">
              ${dashboardData?.financial?.total_project_budget?.toLocaleString() || '0'}
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-400">Grant Requests</div>
            <div className="text-2xl font-bold text-blue-400">
              ${dashboardData?.financial?.total_grant_requests?.toLocaleString() || '0'}
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-400">Funding Gap</div>
            <div className="text-2xl font-bold text-yellow-400">
              ${dashboardData?.financial?.funding_gap?.toLocaleString() || '0'}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="conservation-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-green-500/10 hover:bg-green-500/20 rounded-lg transition-colors">
            <span className="text-2xl mb-2">📝</span>
            <span className="text-sm text-center">New Survey</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors">
            <span className="text-2xl mb-2">🚀</span>
            <span className="text-sm text-center">Start Project</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg transition-colors">
            <span className="text-2xl mb-2">👥</span>
            <span className="text-sm text-center">Add Stakeholder</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-yellow-500/10 hover:bg-yellow-500/20 rounded-lg transition-colors">
            <span className="text-2xl mb-2">💰</span>
            <span className="text-sm text-center">Apply for Grant</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
