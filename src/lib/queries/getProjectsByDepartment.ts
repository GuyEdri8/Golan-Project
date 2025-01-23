import { db } from '@/db'
import { projects, users, settlements, projectSettlements } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

export async function getProjectsByDepartment(departmentId: string) {
    if (!departmentId) {
        throw new Error('Department ID is required')
    }

    const projectsArr = await db
        .select({
            "*": projects,
            ownerFirstName: users.first_name,
            ownerLastName: users.last_name,
        })
        .from(projects)
        .leftJoin(users, eq(projects.owner_id, users.id))
        .where(eq(projects.department_id, departmentId)) // Filter by department
    return projectsArr
}


export async function getProjectsCountByDepartment(departmentId: string) {
    if (!departmentId) {
        throw new Error('Department ID is required')
    }
    const result = await db
        .select({
            count: sql<number>`count(*)::int`
        })
        .from(projects)
        .where(eq(projects.department_id, departmentId))
    
    return result[0].count
}

export async function getProjectsByDepartmentAndSettlement(departmentId: string) {
    if (!departmentId) {
        throw new Error('Department ID is required')
    }

    const projectsArr = await db
        .select({
            project: {
                id: projects.id,
                project_name: projects.project_name,
                description: projects.description,
                budget: projects.budget,
                start_date: projects.start_date,
                end_date: projects.end_date,
                status: projects.status,
                priority: projects.priority,
                contact_email: projects.contact_email,
                contact_phone: projects.contact_phone,
                created_at: projects.created_at,
                updated_at: projects.updated_at
            },
            owner: {
                firstName: users.first_name,
                lastName: users.last_name,
            },
            settlements: {
                settlement_id: settlements.settlement_id,
                name: settlements.name,
                is_main_settlement: projectSettlements.is_main_settlement,
                budget_allocation: projectSettlements.budget_allocation,
                specific_goals: projectSettlements.specific_goals,
                settlement_status: projectSettlements.settlement_status
            }
        })
        .from(projects)
        .leftJoin(users, eq(projects.owner_id, users.id))
        .leftJoin(projectSettlements, eq(projects.id, projectSettlements.project_id))
        .leftJoin(settlements, eq(projectSettlements.settlement_id, settlements.settlement_id))
        .where(eq(projects.department_id, departmentId))

    // Group projects with their settlements
    const groupedProjects = projectsArr.reduce((acc, curr) => {
        const projectId = curr.project.id;
        
        if (!acc[projectId]) {
            acc[projectId] = {
                ...curr.project,
                owner: curr.owner,
                settlements: []
            };
        }

        if (curr.settlements.settlement_id) {
            acc[projectId].settlements.push(curr.settlements);
        }

        return acc;
    }, {} as Record<number, any>);


    return Object.values(groupedProjects);
}