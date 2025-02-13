/*import { db } from '@/db'
import { projects, funding_sources, project_funding_sources } from '@/db/schema'
import { sql } from 'drizzle-orm'
import { eq, and, or, inArray } from 'drizzle-orm'

export async function getTopFundingSources() {
    const result = await db
        .select({
            source_name: funding_sources.source_name,
            total_amount: sql<number>`SUM(${project_funding_sources.allocated_amount})`
        })
        .from(project_funding_sources)
        .leftJoin(funding_sources, eq(funding_sources.id, project_funding_sources.funding_source_id))
        .leftJoin(projects, eq(projects.id, project_funding_sources.project_id))
        .where(inArray(projects.status, ['פעיל', 'תכנון', 'מעוכב']))
        .groupBy(funding_sources.id, funding_sources.source_name)
        .orderBy(sql`SUM(${project_funding_sources.allocated_amount}) DESC`)
        .limit(6);

    return result;
}*/