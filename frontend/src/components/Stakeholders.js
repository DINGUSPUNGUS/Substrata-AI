import React, { useState, useEffect } from 'react';

const Stakeholders = () => {
  const [stakeholders, setStakeholders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchStakeholders();
  }, []);

  const fetchStakeholders = async () => {
    try {
      const response = await fetch('https://hyphae-g5bkoxyb7-hyphae.vercel.app/stakeholders');
      const data = await response.json();
      setStakeholders(data);
    } catch (error) {
      console.error('Error fetching stakeholders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'donor': return '💰';
      case 'volunteer': return '🤝';
      case 'researcher': return '🔬';
      case 'partner': return '🤝';
      case 'government': return '🏛️';
      case 'community': return '👥';
      default: return '👤';
    }
  };

  const filteredStakeholders = filter === 'all' 
    ? stakeholders 
    : stakeholders.filter(s => s.stakeholder_type === filter);

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
          <h1 className="text-2xl font-bold text-white">Stakeholders</h1>
          <p className="text-slate-400">Manage donors, volunteers, and partners</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
          + Add Stakeholder
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-slate-700 p-1 rounded-lg">
        {['all', 'donor', 'volunteer', 'researcher', 'partner'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === type
                ? 'bg-green-600 text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-600'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Stakeholders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStakeholders.map((stakeholder) => (
          <div key={stakeholder.id} className="conservation-card rounded-lg p-6">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{getTypeIcon(stakeholder.stakeholder_type)}</span>
              <div>
                <h3 className="text-lg font-semibold text-white">{stakeholder.name}</h3>
                <p className="text-slate-400 capitalize">{stakeholder.stakeholder_type}</p>
              </div>
            </div>

            {stakeholder.organization && (
              <div className="mb-3">
                <span className="text-slate-400 text-sm">Organization:</span>
                <p className="text-white">{stakeholder.organization}</p>
              </div>
            )}

            <div className="space-y-2 text-sm">
              {stakeholder.email && (
                <div className="flex items-center">
                  <span className="text-slate-400 w-16">Email:</span>
                  <span className="text-green-400">{stakeholder.email}</span>
                </div>
              )}
              {stakeholder.phone && (
                <div className="flex items-center">
                  <span className="text-slate-400 w-16">Phone:</span>
                  <span className="text-white">{stakeholder.phone}</span>
                </div>
              )}
              {stakeholder.location && (
                <div className="flex items-center">
                  <span className="text-slate-400 w-16">Location:</span>
                  <span className="text-white">{stakeholder.location}</span>
                </div>
              )}
            </div>

            {stakeholder.donation_history && stakeholder.donation_history.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-700">
                <span className="text-slate-400 text-sm">Recent Donations:</span>
                <div className="mt-2 space-y-1">
                  {stakeholder.donation_history.slice(0, 2).map((donation, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-slate-300">{donation.project || 'General Fund'}</span>
                      <span className="text-green-400">${donation.amount?.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {stakeholder.volunteer_skills && stakeholder.volunteer_skills.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-700">
                <span className="text-slate-400 text-sm">Skills:</span>
                <div className="mt-2 flex flex-wrap gap-1">
                  {stakeholder.volunteer_skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {stakeholder.expertise && stakeholder.expertise.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-700">
                <span className="text-slate-400 text-sm">Expertise:</span>
                <div className="mt-2 flex flex-wrap gap-1">
                  {stakeholder.expertise.slice(0, 3).map((exp, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stakeholders;
