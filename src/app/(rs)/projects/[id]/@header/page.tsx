import { Button } from "@/components/ui/button";
import { getProject } from "@/lib/queries/projects/getProject";
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import { ArrowRight, Edit, Trash2, Briefcase, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns'

export default async function ProjectHeader({
    params,
  }: {
    params: { id?: string };
  }) {
    // if (!searchParams.project_id) return null
    const { id:project_id } = await params;
    if(!project_id)
        return null
    const project = await getProject(parseInt(project_id))
    // if (!project) return null

    const budgetCurrency = formatCurrency(project.budget)
    const startDate = format(new Date(project.start_date), 'dd/MM/yyyy')
    const EndDate = (project.end_date  && format(new Date(project.end_date), 'dd/MM/yyyy') )

    return (
      <>
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
            <Link href="/projects" className="flex items-center text-blue-600 hover:text-blue-800 mb-2 sm:mb-0">
            <ArrowRight className="ml-2 h-4 w-4" />
            חזרה לפרויקטים
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">{project.project_name}</h1>
        </div>
        <div className="flex mt-4 sm:mt-0">
            <Button variant="outline" className="ml-2">
            <Edit className="ml-2 h-4 w-4" />
            ערוך
            </Button>
            <Button variant="destructive">
            <Trash2 className="ml-2 h-4 w-4" />
            מחק
            </Button>
        </div>
        </header>
        <section className="bg-white rounded-lg shadow p-6 flex flex-wrap justify-between items-center gap-4">
            <Badge className="bg-green-100 text-green-800">בביצוע</Badge>
            <div className="flex items-center">
                <span className="text-sm text-gray-600 ml-2">תקציב:</span>
                <Progress value={75} className="w-24 ml-2" />
                <span className="text-sm font-medium">{budgetCurrency}</span>
            </div>
            <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 ml-2" />
                <span className="text-sm">{startDate} {EndDate ? `- ${EndDate}` : ''}</span>
            </div>
            <div className="flex items-center">
                <Briefcase className="h-4 w-4 text-gray-400 ml-2" />
                <span className="text-sm">{project.department_name}</span>
            </div>
            <div className="flex items-center">
                <User className="h-4 w-4 text-gray-400 ml-2" />
                {/* <img src="/placeholder.svg" alt="Project Owner" className="w-6 h-6 rounded-full ml-2" /> */}
                <span className="text-sm">{project.owner_last_name} {project.owner_first_name}</span>
            </div>
        </section>
      </>
    )
  }

  export const formatCurrency = (amount, currency = 'ILS', locale = 'he-IL') => {
    if (amount === null || amount === undefined) return '';
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };