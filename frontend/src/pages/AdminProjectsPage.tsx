import React, { use, useEffect, useState } from 'react';
import type { Project } from '../types/Project';
import { deleteProject, fetchProjects } from '../api/ProjectsAPI';
import Pagination from '../components/Pagination';
import NewProjectForm from '../components/NewProjectForm';
import EditProjectForm from '../components/EditProjectForm';

const AdminProjectsPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    
    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true);
                const response = await fetchProjects(pageSize, pageNum, []); // Example: Fetch first page with 10 projects and no category filters
                setProjects(response.projects);
                setTotalPages(Math.ceil(response.totalNumProjects / pageSize));
            } catch (error) {
                console.error('Error fetching projects:', (error as Error).message);
                setError((error as Error).message);
            } finally {
                setLoading(false);
            };
        };

        loadProjects();
    }, [pageSize, pageNum]);

    const handleDelete = async (projectId: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this project?');
        if (!confirmDelete) return;

        try {
            await deleteProject(projectId);
            setProjects(projects.filter(p => p.projectId !== projectId));
        } catch (error) {
            console.error('Error deleting project:', (error as Error).message);
            setError((error as Error).message);
        }
    };

    if (loading) {return <p>Loading projects...</p>;}
    if (error) {return <p className='text-red-500'>Error loading projects: {error}</p>;}

    return (
        <>
            <div>
                <h1>Admin Projects</h1>

                {!showAddForm && (
                    <button className="btn btn-success" onClick={() => setShowAddForm(true)}>
                        Add New Project
                    </button>
                )}

                {showAddForm && (
                    <NewProjectForm
                        onProjectAdded={() => {
                        setShowAddForm(false);
                        fetchProjects(pageSize, pageNum, []).then((response) => {
                            setProjects(response.projects);
                        });
                        }}
                        onCancel={() => setShowAddForm(false)}
                    />
                )}

                {editingProject && (
                    <EditProjectForm
                        project={editingProject}
                        onProjectAdded={() => {
                            setEditingProject(null);
                            fetchProjects(pageSize, pageNum, []).then((response) => {
                                setProjects(response.projects);
                            });
                        }}
                        onCancel={() => setEditingProject(null)}
                    />
                )}


                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Project Name</th>
                            <th>Type</th>
                            <th>Regional Program</th>
                            <th>Impact</th>
                            <th>Phase</th>
                            <th>Functionality Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.projectId}>
                                <td>{project.projectId}</td>
                                <td>{project.projectName}</td>
                                <td>{project.projectType}</td>
                                <td>{project.projectRegionalProgram}</td>
                                <td>{project.projectImpact}</td>
                                <td>{project.projectPhase}</td>
                                <td>{project.projectFunctionalityStatus}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => setEditingProject(project)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(project.projectId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {setPageSize(newSize); setPageNum(1); /* Reset to first page when page size changes */}}
            />
        </>
    );
};  



export default AdminProjectsPage;