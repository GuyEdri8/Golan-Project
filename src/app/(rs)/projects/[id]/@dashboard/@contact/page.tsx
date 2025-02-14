
import { getProjectFundings } from "@/lib/queries/funding/getProjectFundings";
import ProjectContact from "./contactpage";
import { getProject } from "@/lib/queries/projects/getProject";

export default async function ContentPage({params}: {params: {id: string}}) {
    const {id} = await params;
    const project = await getProject(Number(id));
    const fundings = await getProjectFundings(Number(id));
    console.log(fundings);
    return (
            <ProjectContact project={project} fundings={fundings} />
    )

}