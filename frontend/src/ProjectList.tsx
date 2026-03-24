import { useEffect, useState } from 'react';
import type { Project } from './types/Project';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalProjects, setTotalProjects] = useState<number>(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {

        const categoryParams = selectedCategories.map((cat) => `projectTypes=${encodeURIComponent(cat)}`).join('&');

        const response = await fetch(
          `https://localhost:5000/api/Water/AllProjects?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
        );
        const data = await response.json();
        setProjects(data.projects);
        setTotalProjects(data.totalNumProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [pageSize, pageNum, totalProjects, selectedCategories]);

  const totalPages = Math.ceil(totalProjects / pageSize);

  return (
    <>
      {projects.map((project) => (
        <div id='projectCard' className='card' key={project.projectId}>
          <h3 className='card-title'>{project.projectName}</h3>
          <div className='card-body'>
            <ul className='list-unstyled'>
              <li><strong>Project Type:</strong> {project.projectType}</li>
              <li><strong>Regional Program:</strong> {project.projectRegionalProgram}</li>
              <li><strong>Impact:</strong> {project.projectImpact} Individuals Served</li>
              <li><strong>Phase:</strong> {project.projectPhase}</li>
              <li><strong>Functionality Status:</strong> {project.projectFunctionalityStatus}</li>
            </ul>
          </div>
        </div>
      ))}

      <br />

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button 
        key={i + 1} 
        onClick={() => setPageNum(i + 1)}
        disabled={pageNum === i + 1}>
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />

      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='20'>20</option>
        </select>
      </label>
    </>
  );
}

export default ProjectList;