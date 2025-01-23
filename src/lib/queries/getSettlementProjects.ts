import { eq } from "drizzle-orm";
import { db } from '@/db' // Replace with your Drizzle DB instance
import {
  projectSettlements,
  settlements,
} from "@/db/schema"; // Replace with your schema imports

export async function getSettlementsInProject(projectId: number) {
  const results = await db
    .select({
      settlementId: settlements.settlement_id,
      settlementName: settlements.name,
      isMainSettlement: projectSettlements.is_main_settlement,
      budgetAllocation: projectSettlements.budget_allocation,
      specificGoals: projectSettlements.specific_goals,
      settlementStatus: projectSettlements.settlement_status,
    })
    .from(projectSettlements)
    .innerJoin(
      settlements,
      eq(projectSettlements.settlement_id, settlements.settlement_id)
    )
    .where(eq(projectSettlements.project_id, projectId));

  return results;
}   