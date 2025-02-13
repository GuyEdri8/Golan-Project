'use client'
import OverviewLayout from "../OverviewLayout";
import { useProject } from "@/components/ProjectContext";
import { Button } from "@/components/ui/button";
import { Check, X, Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function ProjectContent({project} : {project: any}) {
    const router = useRouter();
    const {editMode, setEditMode, editing} = useProject();
    const [description, setDescription] = useState(project.description);
    const handleCancelProjectEdit = () => {
        setEditMode(null);
    }
    const handleProjectEdit = () => {
        fetch(`/api/projects/${project.id}`, {
            method: 'PATCH',
            body: JSON.stringify({description: description})
        })
        setEditMode(null);
        router.refresh();
    }
    const header = (
        <div className="flex justify-between w-full">
            <p>תיאור הפרויקט</p>
            {editMode !== 'content' ?  
            <>
              <Button variant="ghost" onClick={() => setEditMode(prev => prev === 'content' ? null : 'content')}>
                <Pencil className="ml-2 h-2 w-2" />
              </Button>
            </> :(
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={handleCancelProjectEdit}>
                      <X className="ml-2 h-2 w-2" />
                  </Button>
                  <Button variant="ghost" onClick={handleProjectEdit}>
                    <Check className="ml-2 h-2 w-2" />
                  </Button>
                </div>
            )}
        </div>
    )
    return (
        <OverviewLayout header={editing ? header : "תיאור הפרויקט"}>
           {
            editMode === 'content' ? (
                <div className="flex flex-col gap-1 w-full justify-evenly">
                     <Textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Type your message here." />
                </div>
            ) : (
                <p>{project.description}</p>
            )
           }
        </OverviewLayout>
    )
}