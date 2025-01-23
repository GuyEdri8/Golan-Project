'use client'
import { DataTable } from '@/components/data-table'
import { Header } from '@/components/projects/header'
import { ProjectGrid } from '@/components/projects/project-grid'
import { SearchBar } from '@/components/projects/search-bar'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Department, columns } from './columns'
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Briefcase, Calendar } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { format } from 'date-fns'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import useDebounce from '@/hooks/useDebounce'
import { useEffect } from 'react'
export default function Home({ projects } : {projects : any[]}) {
    const [selectedProjects, setSelectedProjects] = useState<any[]>([])
    const [selectDepartment, setSelectedDepartment] = useState<string | null>(null);
    const [searchDepartment, setSearchDepartment] = useState<string>('');
    const [loading, setLoading] = useState(false)
    const [departments, setDepartments] = useState(projects);
    const debouncedSearchTerm = useDebounce(searchDepartment, 500);

    // Fetch projects for a selected department
    const fetchProjects = async (departmentId: string) => {
      setSelectedDepartment(departmentId);
      setLoading(true)
      try {
        const response = await fetch(`/api/projects?departmentId=${departmentId}`)
        const data = await response.json()
        setSelectedProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }
    
  const handleSearch = async () => {
    if (debouncedSearchTerm) {
      try {
          const filteredDepartments = projects.filter(department => 
            department.department_name.toLowerCase().includes(searchDepartment.toLowerCase())
          );
          setDepartments(filteredDepartments);
      } catch (error) {
        console.error('Search error:', error);
      }
    }
  };

    useEffect(() => {
      if(debouncedSearchTerm)
      {
        handleSearch();
      }
      else
      {
        setDepartments(projects);
      }
    }, [debouncedSearchTerm]);

  return (
    <section className='h-screen grid grid-cols-3'>
        <article className='departments flex flex-col h-full overflow-scroll p-1 gap-2'>
          <h2>מחלקות:</h2>
          <ScrollArea className='p-4 text-right'> 
              <Input type="text" placeholder="חיפוש" className='text-right' 
              value={searchDepartment}
              onChange={(e) => setSearchDepartment(e.target.value)}/>
              <div>
              {departments.map((project) => (
                <Card key={project.id} className={(selectDepartment === project.id) ? 'mt-2 hover:bg-gray-100/80 hover:cursor-pointer bg-gray-100' : 'mt-2 hover:bg-gray-100/80 hover:cursor-pointer '} onClick={() => fetchProjects(project.id)}>
                  <CardHeader>
                    <CardTitle>{project.department_name} {project.project_type}</CardTitle>
                    <CardDescription>קיימים {project.project_count} מתוך 33 פרוייקטים</CardDescription>
                  </CardHeader>
                  {/* <CardContent>
                    <p>Card Content</p>
                  </CardContent> */}
                </Card>
              ))}
              </div>
          </ScrollArea>
        </article>
        <article className=' col-span-2 flex flex-col h-full overflow-scroll p-1 gap-2'>
          <h2>פרוייקטים:</h2>
          <ScrollArea className='p-4 text-right'> 
              <Input type="text" placeholder="חיפוש" className='text-right' />
              <div>
              {selectedProjects.map((proj) => (
                <Link key={proj.id}  href={ `/projects/${proj.id}`}>
                  <Card className="overflow-hidden mt-2 text-right">
                  <CardHeader className="flex flex-row-reverse space-y-0 pb-2">
                    <CardTitle className="text-lg font-bold">{proj.project_name}</CardTitle>
                  </CardHeader>
                  <CardContent className=''>
                    <div className="flex flex-row-reverse items-center justify-between mb-2">
                      {/* <Badge variant="secondary" className="flex items-center">
                        <Briefcase className="ml-1 h-3 w-3" />
                        {/* {department} 
                      </Badge> */}
                      <Badge>{proj.status}</Badge>
                    </div>
                    {/* <Progress value={75} className="mb-2" /> */}
                    <p className="text-sm text-gray-600 mb-2">תקציב: {proj.budget}</p>
                    <div className="flex flex-row-reverse items-center text-sm text-gray-600">
                      <Calendar className="ml-1 h-3 w-3" />
                      <span>{format(new Date(proj.start_date), "MM/yyyy")} - {format(new Date(proj.end_date), "MM/yyyy")}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      
                      <img src="/placeholder.svg" alt={`${proj.owner.firstName} ${proj.owner.lastName}`} className="w-8 h-8 rounded-full" />
                      <span className="text-sm text-gray-600">{proj.owner.firstName} {proj.owner.lastName}</span>
                    </div>
                    <div className='flex flex-row-reverse'>
                      <p>
                      ישובים משתתפים בפרוייקט
                      </p>
                      <article className='mr-2 flex gap-2'>
                        {proj.settlements.map((settlement) => (
                          <Badge key={settlement.settlement_id}>{settlement.name}</Badge>
                        ))}
                      </article>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              ))}
              </div>
          </ScrollArea>
        </article>
    </section>
    // <div className="flex h-screen ">
    //   <main className="flex-1 overflow-y-auto">
    //     <div className="container mx-auto px-4 py-8">
    //     </div>
    //   </main>
    // </div>
  )
}

 