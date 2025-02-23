'use client'
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import NewMessageDialog from "./dialog-add-remove";
import OverviewLayout from "../OverviewLayout";
import { InvitedUser } from "@/zod-schemas/users";
import { useProject } from "@/components/ProjectContext";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
              <Users className="w-5 h-5 text-muted-foreground" />


export default function TeamMembersPage({project_users}: {project_users: InvitedUser[]}) {
    // if (!searchParams.project_id) return null  
    const {editMode, setEditMode, editing} = useProject();
    const headerContent = (
      <div className="flex justify-between items-center mb-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
        <h3 className="text-xl font-semibold">חברי צוות</h3>
        <Users className="w-5 h-5 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">הצוות המוביל את הפרויקט</p>
      </div>
    </div>
    )
    const header = (
      <div className="flex justify-between w-full">
      <div className="flex justify-between items-center mb-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
        <h3 className="text-xl font-semibold">חברי צוות</h3>
        <Users className="w-5 h-5 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">הצוות המוביל את הפרויקט</p>
      </div>
    </div>
        <NewMessageDialog project_users={project_users} />
      </div>
    )
    return (
        <OverviewLayout header={editing ? header : headerContent}>
          <div className="flex flex-wrap gap-4">
            {project_users.length === 0 && <p>לא נמצאו חברי צוות</p>}
            {project_users.map((name, index) => (
              
              <div className="space-y-4" key={index}>
              <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <Avatar className="w-12 h-12 border-2 rounded-full border-primary">
                  <AvatarImage className="rounded-full" src="/placeholder.svg" />
                  <AvatarFallback className="w-12 h-12 rounded-full">{name.user?.first_name?.charAt(0) + name.user?.last_name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">{name.user?.first_name} {name.user?.last_name}</div>
                </div>
              </div>
              </div>
            ))}
          </div>
        </OverviewLayout>
    )
}
