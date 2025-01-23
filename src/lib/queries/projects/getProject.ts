import { db } from '@/db'
import { projects, departments, users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type {selectProjecSchemaType} from '@/zod-schemas/projects'

export type getProjectProp = selectProjecSchemaType & {     department_name: string;
    owner_first_name: string;
    owner_last_name:string;
}
export async function getProject(project_id: number): Promise<getProjectProp> {
    const [project] = await db
      .select({
        id: projects.id,
        project_name: projects.project_name,
        description: projects.description,
        budget: projects.budget,
        start_date: projects.start_date,
        end_date: projects.end_date,
        status: projects.status,
        priority: projects.priority,
        department_name: departments.department_name,
        owner_first_name: users.first_name,
        owner_last_name: users.last_name,
        contact_email: projects.contact_email,
        contact_phone: projects.contact_phone,
        created_at: projects.created_at,
        updated_at: projects.updated_at,
      })
      .from(projects)
      .leftJoin(departments, eq(projects.department_id, departments.id))
      .leftJoin(users, eq(projects.owner_id, users.id))
      .where(eq(projects.id, project_id))
      .limit(1);
  
    return project;
  } 