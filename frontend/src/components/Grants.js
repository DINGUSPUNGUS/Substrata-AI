import React, { useState, useEffect } from 'react';

const Grants = () => {
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrants();
  }, []);

  const fetchGrants = async () => {
    try {
      const response = await fetch('https://hyphae-g5bkoxyb7-hyphae.vercel.app/grants');
      const data = await response.json();
      setGrants(data);
    } catch (error) {
      console.error('Error fetching grants:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'in_review': return 'bg-blue-500';
      case 'draft': return 'bg-yellow-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Grant Management</h1>
          <p className="text-slate-400">Track funding applications and compliance</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
          + New Grant Application
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="conservation-card rounded-lg p-4">
          <div className="text-sm text-slate-400">Total Applications</div>
          <div className="text-2xl font-bold text-white">{grants.length}</div>
        </div>
        <div className="conservation-card rounded-lg p-4">
          <div className="text-sm text-slate-400">Total Requested</div>
          <div className="text-2xl font-bold text-green-400">
            ${grants.reduce((sum, g) => sum + g.amount, 0).toLocaleString()}
          </div>
        </div>
        <div className="conservation-card rounded-lg p-4">
          <div className="text-sm text-slate-400">In Review</div>
          <div className="text-2xl font-bold text-blue-400">
            {grants.filter(g => g.status === 'in_review').length}
          </div>
        </div>
        <div className="conservation-card rounded-lg p-4">
          <div className="text-sm text-slate-400">Approved</div>
          <div className="text-2xl font-bold text-green-400">
            {grants.filter(g => g.status === 'approved').length}
          </div>
        </div>
      </div>

      {/* Grants List */}
      <div className="space-y-4">
        {grants.map((grant) => (
          <div key={grant.id} className="conservation-card rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{grant.title}</h3>
                <p className="text-slate-400">{grant.funding_organization}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">
                  ${grant.amount.toLocaleString()}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(grant.status)}`}>
                  {grant.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>

            <p className="text-slate-300 mb-4">{grant.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
              <div>
                <span className="text-slate-400">Application Deadline:</span>
                <p className="text-white">{new Date(grant.application_deadline).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-slate-400">Project Duration:</span>
                <p className="text-white">
                  {new Date(grant.project_start).toLocaleDateString()} - {new Date(grant.project_end).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-slate-400">Status:</span>
                <p className="text-white capitalize">{grant.status.replace('_', ' ')}</p>
              </div>
            </div>

            {grant.requirements && grant.requirements.length > 0 && (
              <div className="mb-4">
                <span className="text-slate-400 text-sm">Requirements:</span>
                <ul className="mt-2 space-y-1">
                  {grant.requirements.map((req, index) => (
                    <li key={index} className="text-sm text-slate-300 flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {grant.reporting_schedule && grant.reporting_schedule.length > 0 && (
              <div>
                <span className="text-slate-400 text-sm">Reporting Schedule:</span>
                <ul className="mt-2 space-y-1">
                  {grant.reporting_schedule.map((schedule, index) => (
                    <li key={index} className="text-sm text-slate-300 flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      {schedule}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grants;
