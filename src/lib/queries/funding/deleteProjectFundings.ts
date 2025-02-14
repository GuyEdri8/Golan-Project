import { projectFundings } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function deleteProjectFundings(project_id: number, tx?: any) {
    const result = await (tx || db)
      .delete(projectFundings)
      .where(eq(projectFundings.project_id, project_id))
    return result;
}

