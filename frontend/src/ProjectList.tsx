import { useEffect, useState } from 'react';
import type { Project } from './types/Project';

function ProjectList() {
 
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('https://localhost:5000/api/Water/AllProjects');
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
    <>
    <h1>Water Project</h1>
    <br />
    {projects.map((project) => (
        <div id="projectCard" key={project.projectId}>
            <h3>{project.projectName}</h3>
            <ul>
                <li>{project.projectType}</li>
                <li>{project.projectRegionalProgram}</li>
                <li>Impact: {project.projectimpact} Individuals Served</li>
                <li>Phase: {project.projectPhase}</li>
                <li>Functionality Status: {project.projectFunctionalityStatus}</li>
            </ul>
        </div>
    ))}
    </>
 );
}

export default ProjectList;