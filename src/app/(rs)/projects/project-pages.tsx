'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { Calendar, Search } from 'lucide-react'
import { format } from 'date-fns'
import useDebounce from '@/hooks/useDebounce'
import { Skeleton } from "@/components/ui/skeleton"
import GoogleSearchAutocomplete from './projectAutoComplete';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DepartmentItem from './components/departmentItem'
import FundingItem from './components/fundingItem'
import SkeletonItem from './components/skeletonItem'
type Props = {
  prop_departments: any[]
  prop_sort_by: ViewType
  prop_department_id?: number,
  prop_funder_id?: number,
  projects?: any[],
}
type ViewType = "מחלקות" | "מקורות מימון" 

export default function Home({ projects, prop_sort_by, prop_department_id, prop_funder_id, prop_departments }: Props) {
  const router = useRouter()
  const [selectedProjects, setSelectedProjects] = useState<any[]>(projects ?? [])
  const [selectDepartment, setSelectedDepartment] = useState<number | null>((prop_sort_by === 'מחלקות') ? prop_department_id ?? null : prop_funder_id ?? null);
  const [searchDepartment, setSearchDepartment] = useState<string>('');
  const [currentView, setCurrentView] = useState<ViewType>(prop_sort_by ?? 'מחלקות')
  const [loading, setLoading] = useState(false)
  const [departments, setDepartments] = useState(prop_departments);
  const debouncedSearchTerm = useDebounce(searchDepartment, 500);
  // Improved view change handler
  const handleViewChange = (value: ViewType) => {
    router.push(`?prop_sort_by=${value}`);
    setCurrentView(value);
  }

  // Properly handle department selection and filtering
  useEffect(() => {
    const filteredDepartments = prop_departments.filter(department => 
      (currentView === 'מחלקות' ? 
        department.department_name?.toLowerCase().includes(searchDepartment.toLowerCase()) :
        department.source_name?.toLowerCase().includes(searchDepartment.toLowerCase())
      )
    )
    const departmentEmpty = filteredDepartments.length === 0 ?  prop_departments.filter(department => 
      (currentView === 'מחלקות' ? 
        department.project_type?.toLowerCase().includes(searchDepartment.toLowerCase()) :
        department.source_type?.toLowerCase().includes(searchDepartment.toLowerCase())
      )
    ) : filteredDepartments;
    setDepartments(departmentEmpty);
  }, [searchDepartment, prop_departments, currentView]);

  // Simplified department selection
  useEffect(() => {
      setSelectedDepartment(prop_department_id ?? null);
  }, [prop_department_id]);
  useEffect(() => {
      setSelectedDepartment(prop_funder_id ?? null);
  }, [prop_funder_id]);

  useEffect(() => {
    setDepartments(prop_departments ?? []);
  }, [prop_departments])

  useEffect(() => {
    setSelectedProjects(projects ?? []);
  }, [projects])
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='h-screen grid grid-cols-3 bg-gray-50'
    >
      <article className='departments flex flex-col h-full overflow-hidden p-4 gap-2 bg-white shadow-lg'>
        <div className='flex flex-row-reverse justify-between'>
          <div className="mb-6 text-right" dir="rtl">
          <Select value={currentView} onValueChange={handleViewChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="בחר תצוגה" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="מחלקות">מחלקות</SelectItem>
              <SelectItem value="מקורות מימון">מקורות מימון</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className='text-2xl font-bold text-gray-800 mb-4'
        >
          {currentView}
        </motion.h2>
        </div>
        
        <div className='relative mb-4'>
          <Input 
            type="text" 
            placeholder={`חיפוש ${currentView}`}
            className='pl-10 text-right'
            value={searchDepartment}
            onChange={(e) => setSearchDepartment(e.target.value)}
          />
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
        </div>

        <ScrollArea className='pr-2 text-right'> 
          <AnimatePresence>
            {!departments && [...Array(5)].map((_, index) => (
              <motion.div
              key={(index)}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <SkeletonItem></SkeletonItem>
            </motion.div>
            ))}
            {departments.map((element) => (
              <motion.div
                key={(element.id)}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {currentView === 'מחלקות' ? 
                  <DepartmentItem department={element} selectedDepartment={selectDepartment}></DepartmentItem>
                  :
                  <FundingItem fundingSource={element} selectedFunding={selectDepartment}></FundingItem> 
                }
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
            {[...Array(5)].map((_, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* <Card className="mt-2 text-right">
                  <CardHeader>
                    <Skeleton className="ml-auto h-7 w-3/4" />
                    <Skeleton className="ml-auto h-3 w-1/2" />
                  </CardHeader>
                </Card> */}
                    <Card className="overflow-hidden mt-2 text-right hover:shadow-lg transition-shadow">
                      <CardContent className='p-6'>
                        <div className='flex justify-between flex-row-reverse items-center mb-4'>
                          <Skeleton className="ml-auto h-7 w-3/4" />
                          <Badge>....</Badge>
                        </div>
                        
                        <div className='grid grid-cols-2 gap-4'>                          
                          <div className='flex items-center justify-start'>
                            <Skeleton className="h-12 w-12 rounded-full" />

                            {/* <span className="text-sm font-medium">{proj.owner.firstName} {proj.owner.lastName}</span> */}
                          </div>
                          <div>
                            <div className=' flex flex-row'> 
                              <Skeleton className="ml-2 mt-1 mr-2 h-5 w-3/4" />
                              <p className="text-sm text-gray-600 mb-2 text-right">:</p>
                              <p className="text-sm text-gray-600 mb-2 text-right">תקציב</p>

                            </div>
                            {/* <p className="text-sm text-gray-600 mb-2">תקציב: {proj.budget}</p> */}
                            <div className="flex flex-row-reverse items-center text-sm text-gray-600">
                              <Calendar className="ml-2 h-4 w-4" />
                              <Skeleton className="mt-2 h-5 w-3/4" />
                              {/* <span>{format(new Date(proj.start_date), "MM/yyyy")} - {format(new Date(proj.end_date), "MM/yyyy")}</span> */}
                            </div>
                          </div>
                        </div>
                        
                        <div className='mt-4'>
                          <p className='text-sm font-semibold mb-2'>ישובים משתתפים</p>
                          <div className='flex flex-wrap gap-2 justify-end'>
                            {[...Array(2)].map((_, index) => (
                              <Skeleton key={index} className="mt-2 h-5 w-8" />
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
              </motion.div>
            ))}
              </motion.div>
            ) : selectedProjects.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-center text-gray-500'
              >
                לא נמצאו פרויקטים 
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
                        <div className='flex justify-between flex-row-reverse items-center mb-4'>
                          <h3 className="text-xl font-bold text-gray-800">{proj.project_name}</h3>
                          <Badge>{proj.status}</Badge>
                        </div>
                        
                        <div className='grid grid-cols-2 gap-4'>                          
                          <div className='flex items-center justify-start'>
                          <Avatar className='w-12 h-12 rounded-full bg-gray-100 relative'>
                            <AvatarImage src={proj.owner.picture} />
                            <AvatarFallback className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>{proj.owner.firstName[0] + '' + proj.owner.lastName[0]}</AvatarFallback>
                          </Avatar>

                            {/* <span className="text-sm font-medium">{proj.owner.firstName} {proj.owner.lastName}</span> */}
                          </div>
                          <div className='text-right'>
                            <p className="text-sm text-gray-600 mb-2">תקציב: {proj.budget}</p>
                            <div className="flex flex-row-reverse items-center text-sm text-gray-600">
                              <Calendar className="ml-2 h-4 w-4" />
                              <span>{format(new Date(proj.start_date), "MM/yyyy")} - {format(new Date(proj.end_date), "MM/yyyy")}</span>
                            </div>
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