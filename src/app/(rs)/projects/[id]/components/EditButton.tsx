'use client'
import { useProject } from "@/components/ProjectContext"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

export function EditButton() {
    const { editing, setEditing } = useProject()
    return (<Button  className="w-full justify-start" onClick={() => setEditing(!editing)}>
        <Edit className="ml-2 h-4 w-4" />
        {editing ? "סגור" : "מצב עריכה"}
    </Button>)
}