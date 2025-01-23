'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Calendar, Search } from 'lucide-react'
import { format } from 'date-fns'
import useDebounce from '@/hooks/useDebounce'
import GoogleSearchAutocomplete from './projectAutoComplete';
export default function Home({ projects }: {projects: any[]}) {
  const [selectedProjects, setSelectedProjects] = useState<any[]>([])
  const [selectDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [searchDepartment, setSearchDepartment] = useState<string>('');
  const [loading, setLoading] = useState(false)
  const [departments, setDepartments] = useState(projects);
  const debouncedSearchTerm = useDebounce(searchDepartment, 500);

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

  useEffect(() => {
    if(debouncedSearchTerm) {
      const filteredDepartments = projects.filter(department => 
        department.department_name.toLowerCase().includes(searchDepartment.toLowerCase())
      );
      setDepartments(filteredDepartments);
    } else {
      setDepartments(projects);
    }
  }, [debouncedSearchTerm]);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='h-screen grid grid-cols-3 bg-gray-50'
    >
      <article className='departments flex flex-col h-full overflow-hidden p-4 gap-2 bg-white shadow-lg'>
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className='text-2xl font-bold text-gray-800 mb-4'
        >
          מחלקות
        </motion.h2>
        
        <div className='relative mb-4'>
          <Input 
            type="text" 
            placeholder="חיפוש מחלקות" 
            className='pl-10 text-right'
            value={searchDepartment}
            onChange={(e) => setSearchDepartment(e.target.value)}
          />
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
        </div>

        <ScrollArea className='pr-2'> 
          <AnimatePresence>
            {departments.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  className={`
                    mt-2 transition-all duration-300 
                    ${selectDepartment === project.id 
                      ? 'border-primary-500 bg-blue-50 scale-105' 
                      : 'hover:bg-gray-100 hover:shadow-md'}
                  `} 
                  onClick={() => fetchProjects(project.id)}
                >
                  <CardHeader>
                    <CardTitle className='text-lg'>{project.department_name} - {project.project_type}</CardTitle>
                    <CardDescription>
                      {project.project_count} פרויקטים פעילים
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      </article>

      <article className='col-span-2 flex flex-col h-full overflow-hidden p-4 gap-2 bg-gray-100'>
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className='text-2xl font-bold text-gray-800 mb-4'
        >
          פרויקטים
        </motion.h2>

        <div className='relative mb-4'>
          {/* <Input 
            type="text" 
            placeholder="חיפוש פרויקטים" 
            className='pl-10 text-right'
          />
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' /> */}
          <GoogleSearchAutocomplete/>
        </div>

        <ScrollArea> 
          <AnimatePresence>
            {loading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-center text-gray-500'
              >
                טוען פרויקטים...
              </motion.div>
            ) : selectedProjects.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-center text-gray-500'
              >
                לא נמצאו פרויקטים במחלקה זו
              </motion.div>
            ) : (
              selectedProjects.map((proj) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/projects/${proj.id}`}>
                    <Card className="overflow-hidden mt-2 text-right hover:shadow-lg transition-shadow">
                      <CardContent className='p-6'>
                        <div className='flex justify-between items-center mb-4'>
                          <h3 className="text-xl font-bold text-gray-800">{proj.project_name}</h3>
                          <Badge>{proj.status}</Badge>
                        </div>
                        
                        <div className='grid grid-cols-2 gap-4'>
                          <div>
                            <p className="text-sm text-gray-600 mb-2">תקציב: {proj.budget}</p>
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="ml-2 h-4 w-4" />
                              <span>{format(new Date(proj.start_date), "MM/yyyy")} - {format(new Date(proj.end_date), "MM/yyyy")}</span>
                            </div>
                          </div>
                          
                          <div className='flex items-center justify-end'>
                            <img 
                              src={proj.owner.avatar || "/placeholder.svg"} 
                              alt={`${proj.owner.firstName} ${proj.owner.lastName}`} 
                              className="w-10 h-10 rounded-full ml-3 border-2 border-primary-500" 
                            />
                            <span className="text-sm font-medium">{proj.owner.firstName} {proj.owner.lastName}</span>
                          </div>
                        </div>
                        
                        <div className='mt-4'>
                          <p className='text-sm font-semibold mb-2'>ישובים משתתפים</p>
                          <div className='flex flex-wrap gap-2 justify-end'>
                            {proj.settlements.map((settlement) => (
                              <Badge key={settlement.settlement_id} variant="secondary">
                                {settlement.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </ScrollArea>
      </article>
    </motion.section>
  )
}