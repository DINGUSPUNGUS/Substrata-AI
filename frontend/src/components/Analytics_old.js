import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const [species, projects, stakeholders, grants] = await Promise.all([
        fetch(`${API_BASE_URL}/analytics/species-summary`),
        fetch(`${API_BASE_URL}/analytics/project-overview`),
        fetch(`${API_BASE_URL}/analytics/stakeholder-summary`),
        fetch(`${API_BASE_URL}/analytics/grant-overview`)
      ]);
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const [speciesRes, projectRes, stakeholderRes, grantRes] = await Promise.all([
        fetch('https://hyphae-g5bkoxyb7-hyphae.vercel.app/analytics/species-summary'),
        fetch('https://hyphae-g5bkoxyb7-hyphae.vercel.app/analytics/project-overview'),
        fetch('https://hyphae-g5bkoxyb7-hyphae.vercel.app/analytics/stakeholder-summary'),
        fetch('https://hyphae-g5bkoxyb7-hyphae.vercel.app/analytics/grant-overview')
      ]);

      const [species, projects, stakeholders, grants] = await Promise.all([
        speciesRes.json(),
        projectRes.json(),
        stakeholderRes.json(),
        grantRes.json()
      ]);

      setAnalyticsData({ species, projects, stakeholders, grants });
    } catch (error) {
      console.error('Error fetching analytics:', error);
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics & Insights</h1>
        <p className="text-slate-400">Conservation impact analysis and reporting</p>
      </div>

      {/* Species Analytics */}
      <div className="conservation-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="mr-2">🦎</span>
          Species Monitoring Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">
              {analyticsData.species?.total_species || 0}
            </div>
            <div className="text-sm text-slate-400">Species Tracked</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">
              {analyticsData.species?.total_observations || 0}
            </div>
            <div className="text-sm text-slate-400">Total Observations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {analyticsData.species?.total_individuals || 0}
            </div>
            <div className="text-sm text-slate-400">Individuals Counted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400">
              {analyticsData.species?.threatened_species?.length || 0}
            </div>
            <div className="text-sm text-slate-400">Threatened Species</div>
          </div>
        </div>

        {/* Conservation Status Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-medium mb-3">Conservation Status Distribution</h4>
            <div className="space-y-2">
              {Object.entries(analyticsData.species?.conservation_status_breakdown || {}).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <span className="text-slate-300 capitalize">{status.replace('_', ' ')}</span>
                  <span className="text-white font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Species by Count</h4>
            <div className="space-y-2">
              {Object.entries(analyticsData.species?.species_breakdown || {}).slice(0, 5).map(([species, count]) => (
                <div key={species} className="flex items-center justify-between">
                  <span className="text-slate-300">{species}</span>
                  <span className="text-green-400 font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project Analytics */}
      <div className="conservation-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <span className="mr-2">🌿</span>
          Project Portfolio Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">
              {analyticsData.projects?.total_projects || 0}
            </div>
            <div className="text-sm text-slate-400">Total Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">
              {analyticsData.projects?.active_projects || 0}
            </div>
            <div className="text-sm text-slate-400">Active Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">
              ${(analyticsData.projects?.total_budget || 0).toLocaleString()}
            </div>
            <div className="text-sm text-slate-400">Total Budget</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">
              ${(analyticsData.projects?.average_project_budget || 0).toLocaleString()}
            </div>
            <div className="text-sm text-slate-400">Avg Project Budget</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-medium mb-3">Project Status</h4>
            <div className="space-y-2">
              {Object.entries(analyticsData.projects?.status_breakdown || {}).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <span className="text-slate-300 capitalize">{status.replace('_', ' ')}</span>
                  <span className="text-white font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Project Locations</h4>
            <div className="space-y-2">
              {(analyticsData.projects?.projects_by_location || []).map((location, index) => (
                <div key={index} className="text-slate-300">
                  📍 {location}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stakeholder & Grant Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stakeholder Analytics */}
        <div className="conservation-card rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">👥</span>
            Stakeholder Network
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {analyticsData.stakeholders?.total_stakeholders || 0}
              </div>
              <div className="text-sm text-slate-400">Total Stakeholders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                ${(analyticsData.stakeholders?.total_donations || 0).toLocaleString()}
              </div>
              <div className="text-sm text-slate-400">Total Donations</div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Stakeholder Types</h4>
            <div className="space-y-2">
              {Object.entries(analyticsData.stakeholders?.stakeholder_type_breakdown || {}).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-slate-300 capitalize">{type}</span>
                  <span className="text-white font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grant Analytics */}
        <div className="conservation-card rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="mr-2">💰</span>
            Grant Funding Overview
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {analyticsData.grants?.total_grants || 0}
              </div>
              <div className="text-sm text-slate-400">Grant Applications</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                ${(analyticsData.grants?.total_amount_requested || 0).toLocaleString()}
              </div>
              <div className="text-sm text-slate-400">Amount Requested</div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">Grant Status</h4>
            <div className="space-y-2">
              {Object.entries(analyticsData.grants?.status_breakdown || {}).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <span className="text-slate-300 capitalize">{status.replace('_', ' ')}</span>
                  <span className="text-white font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-white font-medium mb-3">Funding Organizations</h4>
            <div className="space-y-1">
              {(analyticsData.grants?.funding_organizations || []).map((org, index) => (
                <div key={index} className="text-slate-300 text-sm">
                  🏛️ {org}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="conservation-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Export Reports</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors">
            <span className="text-2xl mb-2">📊</span>
            <span className="text-sm text-center">Species Report</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-500/10 hover:bg-green-500/20 rounded-lg transition-colors">
            <span className="text-2xl mb-2">📈</span>
            <span className="text-sm text-center">Project Dashboard</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg transition-colors">
            <span className="text-2xl mb-2">👥</span>
            <span className="text-sm text-center">Stakeholder Report</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-yellow-500/10 hover:bg-yellow-500/20 rounded-lg transition-colors">
            <span className="text-2xl mb-2">💰</span>
            <span className="text-sm text-center">Financial Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
