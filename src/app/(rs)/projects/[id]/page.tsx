import { Header } from './components/header';
import { StatsBar } from './components/stats-bar';
import { MainContent } from './components/main-content';
import { Sidebar } from './components/sidebar';
import { getProject } from '@/lib/queries/projects/getProject';
import { BackButton } from '@/components/BackButton';

export default async function ProjectDetailsPage({
  params,
}: {
  params: { id?: string };
}) {
  try {
    const { id:project_id } = await params;

    if (project_id) {
      const project = await getProject(parseInt(project_id));

      if (!project) {
        return (
          <>
            {/* <Header /> */}
            <div>Project ID #{project_id} not found</div>
          </>
        );
      }

      return (
        <>
            <Sidebar project={project} />
          </>
      );
    } else {
      return (
        <>
          {/* <Header /> */}
          <div>No project ID provided</div>
        </>
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}
