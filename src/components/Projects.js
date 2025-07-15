import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'planning': return 'bg-blue-500';
      case 'completed': return 'bg-gray-500';
      case 'on_hold': return 'bg-yellow-500';
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
          <h1 className="text-2xl font-bold text-white">Conservation Projects</h1>
          <p className="text-slate-400">Manage and track conservation initiatives</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="conservation-card rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{project.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(project.status)}`}>
                {project.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <p className="text-slate-400 mb-4">{project.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Location:</span>
                <p className="text-white">{project.location}</p>
              </div>
              <div>
                <span className="text-slate-400">Budget:</span>
                <p className="text-green-400">${project.budget?.toLocaleString() || 'TBD'}</p>
              </div>
              <div>
                <span className="text-slate-400">Project Lead:</span>
                <p className="text-white">{project.project_lead}</p>
              </div>
              <div>
                <span className="text-slate-400">Duration:</span>
                <p className="text-white">
                  {new Date(project.start_date).getFullYear()} - {project.end_date ? new Date(project.end_date).getFullYear() : 'Ongoing'}
                </p>
              </div>
            </div>
            {project.goals && project.goals.length > 0 && (
              <div className="mt-4">
                <span className="text-slate-400 text-sm">Goals:</span>
                <ul className="mt-2 space-y-1">
                  {project.goals.slice(0, 3).map((goal, index) => (
                    <li key={index} className="text-sm text-slate-300 flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      {goal}
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

export default Projects;
