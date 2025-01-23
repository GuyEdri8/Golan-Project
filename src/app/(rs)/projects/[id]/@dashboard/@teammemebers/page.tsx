import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getAllUsersProject } from "@/lib/queries/getAllUsersProject";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

export default async function ProjectHeader({
    params,
  }: {
    params: { id?: string };
  }) {
    const { id:project_id } = await params;
    if(!project_id)
        return <p>Waiting for ID</p>
    const users = await getAllUsersProject(parseInt(project_id));
    console.log(users);
    // if (!searchParams.project_id) return null
    return (
        <Card>
        <CardHeader>
          <CardTitle>חברי צוות</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {users.map((name, index) => (
              <div key={index} className="flex items-center">
                <Avatar className="h-8 w-8 ml-2">
                  <AvatarImage src={`/placeholder.svg`} />
                  {name.first_name && name.last_name &&
                  <AvatarFallback>{name.first_name?.charAt(0) + name.last_name?.charAt(0)}</AvatarFallback>
                  }
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{name.first_name} {name.last_name}</p>
                  <p className="text-xs text-gray-500">תפקיד</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
}