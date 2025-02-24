<<<<<<< HEAD
import ProjectDashboard from './@dashboard/page';
import { getProject } from '@/lib/queries/projects/getProject';

export default async function ProjectDetailsPage({
  params,
}: {
  params: { projectId: string }
}) {

  return null;  
=======
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@/components/ui/tabs';
import ProjectDashboard from './@dashboard/page';
import ProjectSettings from './@settings/page';

export default async function ProjectDetailsPage({
  params,
  searchParams
}: {
  params: { projectId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const tab = searchParams.tab as string || 'overview';

  if(tab === 'overview') {
    return (
      <>
        <ProjectDashboard />
      </>
    )
  }
  else if(tab === 'settings') {
    return (
      <>
        <ProjectSettings />
      </>
    )
  }


  return (
    <>
      <ProjectDashboard />
    </>
  )
>>>>>>> guy
}
