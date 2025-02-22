export const dynamic = 'force-dynamic';

import HomeComponent from "./home"
import { getProjectsByStatus } from "@/lib/queries/getProjectsByStatus"
import { getMonthlyProjects } from "@/lib/queries/getMonthlyProjects"
import { getUpcomingProjects } from "@/lib/queries/getUpcomingProjects"
import { getNewestProjects } from "@/lib/queries/getNewestProjects"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { getSettlementBudgets } from "@/lib/queries/getSettlementBudgets"
import { getTopDepartments } from "@/lib/queries/getTopDepartments"
export const metadata = {
    title: 'Home',
}
export default async function Home() {
    const { getUser } = await getKindeServerSession();
    const userResult = await getUser();
    const user = userResult ? userResult : { id: null };

    const activeProjects = await getProjectsByStatus('פעיל');
    const completedProjects = await getProjectsByStatus('הושלם');
    const plannedProjects = await getProjectsByStatus('תכנון');
    const delayedProjects = await getProjectsByStatus('מעוכב');

    console.log('User ID:', user.id);
    const monthData = await getMonthlyProjects(user?.id || '');

    // Get current month's total projects
    const currentMonthProjects = monthData[monthData.length - 1]?.total_count || 0;

    // Get last 12 months in Hebrew format
    const last12Months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (11 - i));
    return new Intl.DateTimeFormat('he', { month: 'short', year: 'numeric' }).format(date);
    });

    // Fetch projects for bottom tables
    const { projects: upcomingProjects } = await getUpcomingProjects();
    const { projects: newestProjects } = await getNewestProjects();

    const settlementBudgets = await getSettlementBudgets();

    const villageBudgetData = {
      labels: settlementBudgets.map(item => item.settlement_name),
      datasets: [
          {
              label: 'תקציב הפרויקטים בישוב',
              data: settlementBudgets.map(item => item.total_budget),
              backgroundColor: 'rgb(0, 51, 89)',
              barPercentage: 0.6,
          }
      ]
    };

    const topDepartments = await getTopDepartments();

    const departmentData = {
      labels: topDepartments.map(dept => dept.department_name),
      datasets: [
          {
              label: 'מספר פרויקטים',
              data: topDepartments.map(dept => dept.project_count),
              borderColor: 'rgb(0, 51, 89)',
              backgroundColor: 'rgba(0, 51, 89, 0.1)',
              fill: true,
              tension: 0.4
          }
      ]
  };
  
    return <HomeComponent 
      firstName={user?.given_name || 'Guest'}
      activeProjects={activeProjects}
      completedProjects={completedProjects}
      plannedProjects={plannedProjects}
      delayedProjects={delayedProjects}
      monthData={monthData}
      currentMonthProjects={currentMonthProjects}
      last12Months={last12Months}
      upcomingProjects={upcomingProjects}
      newestProjects={newestProjects}
      villageBudgetData={villageBudgetData}
      departmentData={departmentData}
    />
  }
 