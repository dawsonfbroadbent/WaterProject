import { useState } from 'react';
import type { Project } from '../types/Project';
import { addProject } from '../api/ProjectsAPI';

interface NewProjectFormProps {
    onProjectAdded: (project: Project) => void;
    onCancel: () => void;
}

const NewProjectForm = ({ onProjectAdded, onCancel }: NewProjectFormProps) => {
    const [formData, setFormData] = useState<Project>({
        projectId: 0,
        projectName: '',
        projectType: '',
        projectRegionalProgram: '',
        projectImpact: 0,
        projectPhase: '',
        projectFunctionalityStatus: ''  
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(formData => ({ ...formData, [name]: value }));
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addProject(formData);
        onProjectAdded(formData);
    };


    return (
        <form action="" onSubmit={handleSubmit}>
            <h2>Add New Project</h2>
            <label htmlFor="projectName">Project Name:
                <input type="text" name="projectName" value={formData.projectName} onChange={handleChange}/></label>
            <label htmlFor="projectType">Project Type:
                <input type="text" name="projectType" value={formData.projectType} onChange={handleChange} /></label>
            <label htmlFor="projectRegionalProgram">Regional Program:
                <input type="text" name="projectRegionalProgram" value={formData.projectRegionalProgram} onChange={handleChange} /></label>
            <label htmlFor="projectImpact">Impact (Individuals Served):
                <input type="number" name="projectImpact" value={formData.projectImpact} onChange={handleChange} /></label>
            <label htmlFor="projectPhase">Project Phase:
                <input type="text" name="projectPhase" value={formData.projectPhase} onChange={handleChange} /></label>
            <label htmlFor="projectFunctionalityStatus">Functionality Status:
                <input type="text" name="projectFunctionalityStatus" value={formData.projectFunctionalityStatus} onChange={handleChange} /></label>
            <button type="submit">Add Project</button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
}

export default NewProjectForm;