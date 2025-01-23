import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getAllUsersProject } from "@/lib/queries/getAllUsersProject";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export default async function ProjectHeader({
    params,
  }: {
    params: { id?: string };
  }) {
    // const { id:project_id } = await params;
    // if(!project_id)
    //     return <p>Waiting for ID</p>
    // const users = await getAllUsersProject(parseInt(project_id));
    // console.log(users);
    // // if (!searchParams.project_id) return null
    return (
      <Card>
      <CardHeader>
        <CardTitle>ציר זמן ואבני דרך</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>אפיון ותכנון: 01/05/2023 - 31/05/2023</li>
          <li>פיתוח גרסה ראשונית: 01/06/2023 - 31/08/2023</li>
          <li>בדיקות ושיפורים: 01/09/2023 - 30/11/2023</li>
          <li>השקה: 01/12/2023 - 31/12/2023</li>
        </ul>
      </CardContent>
    </Card>
    )
}