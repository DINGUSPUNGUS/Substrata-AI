import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';

const FieldSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/field-surveys`);
      const data = await response.json();
      setSurveys(data);
    } catch (error) {
      console.error('Error fetching surveys:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critically_endangered': return 'text-red-400';
      case 'endangered': return 'text-red-300';
      case 'vulnerable': return 'text-yellow-400';
      case 'near_threatened': return 'text-yellow-300';
      case 'least_concern': return 'text-green-400';
      default: return 'text-slate-400';
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Field Surveys</h1>
          <p className="text-slate-400">Wildlife and vegetation observation data</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          + New Survey
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="conservation-card rounded-lg p-4">
          <div className="text-sm text-slate-400">Total Surveys</div>
          <div className="text-2xl font-bold text-white">{surveys.length}</div>
        </div>
        <div className="conservation-card rounded-lg p-4">
          <div className="text-sm text-slate-400">Species Observed</div>
          <div className="text-2xl font-bold text-green-400">
            {new Set(surveys.map(s => s.species_name)).size}
          </div>
        </div>
        <div className="conservation-card rounded-lg p-4">
          <div className="text-sm text-slate-400">Total Individuals</div>
          <div className="text-2xl font-bold text-blue-400">
            {surveys.reduce((sum, s) => sum + s.count, 0)}
          </div>
        </div>
        <div className="conservation-card rounded-lg p-4">
          <div className="text-sm text-slate-400">Threatened Species</div>
          <div className="text-2xl font-bold text-red-400">
            {surveys.filter(s => ['critically_endangered', 'endangered', 'vulnerable'].includes(s.conservation_status)).length}
          </div>
        </div>
      </div>

      {/* Surveys Table */}
      <div className="conservation-card rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">Recent Observations</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Species
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Observer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-800 divide-y divide-slate-700">
              {surveys.map((survey) => (
                <tr key={survey.id} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">
                        {survey.species_type === 'mammal' ? '🦒' :
                         survey.species_type === 'bird' ? '🦅' :
                         survey.species_type === 'plant' ? '🌳' :
                         survey.species_type === 'reptile' ? '🦎' : '🔬'}
                      </span>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {survey.species_name}
                        </div>
                        <div className="text-sm text-slate-400 capitalize">
                          {survey.species_type}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{survey.location_name}</div>
                    <div className="text-sm text-slate-400">
                      {survey.latitude.toFixed(4)}, {survey.longitude.toFixed(4)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{survey.count}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium capitalize ${getStatusColor(survey.conservation_status)}`}>
                      {survey.conservation_status?.replace('_', ' ') || 'Not evaluated'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {survey.observer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    {new Date(survey.observation_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="conservation-card rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Survey Locations</h3>
        <div className="bg-slate-700 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center text-slate-400">
            <span className="text-4xl block mb-2">🗺️</span>
            <p>Interactive map showing survey locations</p>
            <p className="text-sm mt-1">Map integration coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldSurveys;
        <h3 className="text-lg font-semibold text-white mb-4">Observation Map</h3>
        <div className="h-64 bg-slate-700 rounded-lg flex items-center justify-center">
          <div className="text-center text-slate-400">
            <span className="text-4xl block mb-2">🗺️</span>
            <p>Interactive map showing survey locations</p>
            <p className="text-sm">(Map integration coming soon)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldSurveys;
