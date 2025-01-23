import { db } from '@/db'
import { projectEditors, users } from '@/db/schema'
import { eq } from 'drizzle-orm';

export async function getAllUsersProject(projectId: number) {
    const usersArr = await db
    .select({
        first_name: users.first_name,
        last_name: users.last_name,
        joined_date: projectEditors.added_at,
        added_by: projectEditors.added_by
    })
    .from(projectEditors)
    .where(eq(projectEditors.project_id, projectId))
    .leftJoin(users, eq(projectEditors.editor_id, users.id));
    return usersArr;
}