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
      const [speciesRes, projectRes, stakeholderRes, grantRes] = await Promise.all([
        fetch(`${API_BASE_URL}/analytics/species-summary`),
        fetch(`${API_BASE_URL}/analytics/project-overview`),
        fetch(`${API_BASE_URL}/analytics/stakeholder-summary`),
        fetch(`${API_BASE_URL}/analytics/grant-overview`)
      ]);

      const [species, projects, stakeholders, grants] = await Promise.all([
        speciesRes.json(),
        projectRes.json(),
        stakeholderRes.json(),
        grantRes.json()
      ]);

      setAnalyticsData({
        species,
        projects,
        stakeholders,
        grants
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
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

  const { species, projects, stakeholders, grants } = analyticsData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
        <p className="text-slate-400">Conservation impact analysis and reporting</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="conservation-card rounded-lg p-4">
          <div className="text-sm text-slate-400">Total Species</div>
          <div className="text-2xl font-bold text-green-400">{species?.total_species || 0}</div>
        </div>
        <div className="conservation-card rounded-lg p-4">
          <div className="text-sm text-slate-400">Active Projects</div>
          <div className="text-2xl font-bold text-blue-400">{projects?.active_projects || 0}</div>
        </div>
        <div className="conservation-card rounded-lg p-4">
          <div className="text-sm text-slate-400">Total Stakeholders</div>
          <div className="text-2xl font-bold text-purple-400">{stakeholders?.total_stakeholders || 0}</div>
        </div>
        <div className="conservation-card rounded-lg p-4">
          <div className="text-sm text-slate-400">Grant Applications</div>
          <div className="text-2xl font-bold text-yellow-400">{grants?.total_grants || 0}</div>
        </div>
      </div>

      {/* Species Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="conservation-card rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Species Conservation Status</h3>
          <div className="space-y-3">
            {species?.conservation_status_breakdown && Object.entries(species.conservation_status_breakdown).map(([status, count]) => (
              <div key={status} className="flex justify-between items-center">
                <span className="text-slate-300 capitalize">{status.replace('_', ' ')}</span>
                <span className="text-white font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="conservation-card rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Project Status</h3>
          <div className="space-y-3">
            {projects?.status_breakdown && Object.entries(projects.status_breakdown).map(([status, count]) => (
              <div key={status} className="flex justify-between items-center">
                <span className="text-slate-300 capitalize">{status}</span>
                <span className="text-white font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="conservation-card rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Project Budget</h3>
          <div className="text-2xl font-bold text-green-400">
            ${projects?.total_budget?.toLocaleString() || 0}
          </div>
          <p className="text-sm text-slate-400 mt-1">Total project funding</p>
        </div>

        <div className="conservation-card rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Grant Requests</h3>
          <div className="text-2xl font-bold text-blue-400">
            ${grants?.total_amount_requested?.toLocaleString() || 0}
          </div>
          <p className="text-sm text-slate-400 mt-1">Total requested funding</p>
        </div>

        <div className="conservation-card rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Donations</h3>
          <div className="text-2xl font-bold text-purple-400">
            ${stakeholders?.total_donations?.toLocaleString() || 0}
          </div>
          <p className="text-sm text-slate-400 mt-1">Total donations received</p>
        </div>
      </div>

      {/* Stakeholder Breakdown */}
      <div className="conservation-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Stakeholder Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stakeholders?.stakeholder_type_breakdown && Object.entries(stakeholders.stakeholder_type_breakdown).map(([type, count]) => (
            <div key={type} className="text-center">
              <div className="text-2xl font-bold text-white">{count}</div>
              <div className="text-sm text-slate-400 capitalize">{type}s</div>
            </div>
          ))}
        </div>
      </div>

      {/* Conservation Impact */}
      <div className="conservation-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Conservation Impact Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{species?.total_observations || 0}</div>
            <div className="text-sm text-slate-400">Field Observations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">{species?.total_individuals || 0}</div>
            <div className="text-sm text-slate-400">Individual Animals</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400">
              {species?.threatened_species?.length || 0}
            </div>
            <div className="text-sm text-slate-400">Threatened Species</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
