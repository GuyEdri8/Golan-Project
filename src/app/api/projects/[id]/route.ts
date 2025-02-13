import { updateProject } from "@/lib/queries/projects/updateProject";
import { deleteProject, getProject } from "@/lib/queries/projects/getProject";
import { projects } from "@/db/schema";
import { createLog } from "@/lib/logs";
import { getFilesByProject } from "@/lib/queries/getProjectFiles";
import { deleteFile } from "@/app/api/storage/route";
import { deleteAllProjectEditors } from "@/lib/queries/projects/editors/createProjectEditor";
import { db } from "@/db";
import { deleteProjectLogs } from "@/lib/queries/logs/deleteProjectlogs";
import { deleteProjectSettlements } from "@/lib/queries/settlements/deleteProjectSettlements";
import { deleteProjectFundings } from "@/lib/queries/funding/deleteProjectFundings";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

export async function PATCH(request: Request, {params}: {params: {id: number}}) {
    try {
      const { id } = await params; 

      const project_id = id;
      const body: Partial<typeof projects> = await request.json();
      const project = await getProject(project_id);
      if(!project) {
        return new Response(JSON.stringify({ error: 'Project not found' }), { status: 404 });
      }
      await createLog(id, 'update', 'description', 'עדכון תיאור הפרויקט', project, body);
      await updateProject(project_id, body);

      return new Response(JSON.stringify({ message: 'Project updated successfully' }), { status: 200 });
    } catch (error) {
      console.error('Error updating project:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  } 


  export async function DELETE(request: Request, { params }: { params: { id: number } }) {
    // Start a database transaction to ensure atomicity    
    try {
      const { id } = params;
      const project_id = id;
      const {getUser} = getKindeServerSession();
      const user = await getUser();
      if(!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
      }
      // 1. Verify project exists first
      const project = await getProject(project_id);
      if (!project) {
        return new Response(
          JSON.stringify({ error: 'Project not found' }), 
          { status: 404 }
        );
      }

      if(user.id !==  project.owner_id) {
        return new Response(JSON.stringify({ error: 'Only the project owner can delete the project' }), { status: 401 });
      }
      // Begin transaction
       await db.transaction(async (tx) => {

        // 2. Delete project editors
        const files = await getFilesByProject(project_id.toString(), tx);
        
        // 3. Delete files
        await deleteAllProjectEditors(project_id, tx);
        for (const file of files) {
          await deleteFile(file.file_name, project_id, tx);
        }
        // 4. Delete project logs
        await deleteProjectLogs(project_id, tx);
        // 5. Delete Project Settlements
        await deleteProjectSettlements(project_id, tx);
        // 6. Delete Project Funding
        await deleteProjectFundings(project_id, tx);
        // 7. Finally delete the project itself
        await deleteProject(project_id, tx);

      })

      return new Response(null, { status: 204 });
  
    } catch (error) {
      // Rollback transaction on error
      console.error('Error deleting project:', error);
      
      // Provide more specific error messages when possible
      const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
      return new Response(
        JSON.stringify({ error: errorMessage }), 
        { status: 500 }
      );
    }
  }