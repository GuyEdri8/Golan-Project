import { getAllProjects } from "@/lib/queries/getAllProjects";
import { BackButton } from "@/components/BackButton";
import ProjectPage from "./project-pages";

export default async function  CitiesPage() {
    const projects: Array<any> = await getAllProjects();
    if(!projects)
    {
        return (
            <>
                <h2>No Projects were found</h2>
                <BackButton title="Go Back" variant={'default'}/>
            </>
        )
    }
    else 
    {
        return (
            <>
                <ProjectPage projects={projects} />
            </>
        )
    }
}