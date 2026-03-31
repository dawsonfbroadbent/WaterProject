import { useEffect, useState, type SetStateAction } from 'react';
import type { Project } from '../types/Project';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../api/ProjectsAPI';
import Pagination from './Pagination';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true)
        const data = await fetchProjects(pageSize, pageNum, selectedCategories);
        setProjects(data.projects);
        setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
      } catch (error) {
        console.error((error as Error).message);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [pageSize, pageNum, selectedCategories]);


  if (loading) {
    return <p>Loading projects...</p>;
  }
  
  if (error) {
    return <p className='text-red-500'>Error loading projects: {error}</p>;
  }

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

            <button className="btn btn-success" 
            onClick={() => navigate(`/donate/${project.projectName}/${project.projectId}`)}
            >Donate</button>
          </div>
        </div>
      ))}

      <br />
      
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {setPageSize(newSize); setPageNum(1); /* Reset to first page when page size changes */}}
      />
    </>
  );
}

export default ProjectList;