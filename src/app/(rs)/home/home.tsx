"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, Line, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  type ChartOptions,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend)

interface HomeComponentProps {
  firstName: string
  activeProjects: number
  completedProjects: number
  plannedProjects: number
  delayedProjects: number
  currentMonthProjects: number
  monthData: { month: string; total_count: number; user_count: number }[]
  last12Months: string[]
  villageBudgetData: any
  departmentData: any
  fundingSourcesData: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      tension: number
      fill: boolean
    }[]
  }
  upcomingProjects: {
    id: number;
    project_name: string | null;
    description: string | null;
    end_date: any;
    budget: any;
    status: string;
    priority: string;
    start_date: any;
    department_name: string;
    owner_first_name: string;
    owner_last_name: string;
    contact_email: string;
    contact_phone: string;
    created_at: any;
    updated_at: any;
  }[];
  newestProjects: {
    id: number;
    project_name: string | null;
    description: string | null;
    end_date: any;
    budget: any;
    status: string;
    priority: string;
    start_date: any;
    department_name: string;
    owner_first_name: string;
    owner_last_name: string;
    contact_email: string;
    contact_phone: string;
    created_at: any;
    updated_at: any;
  }[]
}

const chartOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      max: 6,
      ticks: {
        stepSize: 1,
      },
    },
  },
  plugins: {
    legend: {
      position: "bottom" as const,
      align: "start" as const,
    },
  },
}

const budgetChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      position: "left",
      ticks: {
        callback: (value) => {
          if (typeof value === "number") {
            return `₪${value.toLocaleString()}`
          }
          return value
        },
      },
    },
    x: {
      ticks: {
        autoSkip: false,
        maxRotation: 45,
        minRotation: 45,
      },
    },
  },
  plugins: {
    legend: {
      position: "bottom",
      align: "start",
    },
    tooltip: {
      callbacks: {
        title: (context) => {
          const value = context[0].raw
          if (typeof value === "number") {
            return `₪${value.toLocaleString()}`
          }
          return ""
        },
      },
    },
  },
}

export default function Home({
  firstName,
  activeProjects,
  completedProjects,
  plannedProjects,
  delayedProjects,
  currentMonthProjects,
  monthData,
  last12Months,
  upcomingProjects,
  newestProjects,
  villageBudgetData,
  departmentData,
  fundingSourcesData,
}: HomeComponentProps) {
  const [openDialogId, setOpenDialogId] = useState<number | null>(null)
  const selectedProject = upcomingProjects.find(p => p.id === openDialogId)
  const [chosenProject, setChosenProject] = useState<any>(null)

  // נתונים להתפלגות סטטוס פרויקטים
  const statusData = {
    labels: ["בביצוע", "הושלם", "מעוכב", "בתכנון"],
    datasets: [
      {
        data: [activeProjects, completedProjects, delayedProjects, plannedProjects],
        backgroundColor: ["rgb(0, 182, 182)", "rgb(0, 51, 89)", "rgb(255, 99, 132)", "rgb(255, 205, 86)"],
      },
    ],
  }

  const monthlyData = {
    labels: last12Months,
    datasets: [
      {
        label: "הפרויקטים שלי",
        data: monthData.map((d) => d.user_count),
        backgroundColor: "rgb(0, 182, 182)",
        barPercentage: 0.5,
      },
      {
        label: "מספר פרויקטים בחודש זה",
        data: monthData.map((d) => d.total_count),
        backgroundColor: "rgb(0, 51, 89)",
        barPercentage: 0.5,
      },
    ],
  }

  // Get the current month's data (last item in the array)
  const currentMonthUserProjects = monthData[monthData.length - 1]?.user_count || 0

  const formatDate = (dateString: Date | null) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString("he", { month: "short" })
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
  }

  const handleProjectClick = (projectId: number) => {
    const project = newestProjects.find(p => p.id === projectId)
    setChosenProject(project)
    setOpenDialogId(projectId)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS" }).format(amount)
  }

  return (
    <div className="p-8" dir="rtl">
      <h1 className="text-4xl font-bold mb-8 text-blue-800">שלום {firstName}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-blue-800">מספר פרויקטים</CardTitle>
            <div className="text-sm text-gray-600">כמות פרויקטים חודשית</div>
            <div className="text-sm">
              הפרויקטים החודשיים שלי: {currentMonthUserProjects} / מספר פרויקטים חודשי(נוכחי): {currentMonthProjects}
            </div>
          </CardHeader>
          <CardContent>
            <Bar data={monthlyData} options={chartOptions} height={100} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-blue-800">מקורות מימון מובילים</CardTitle>
            <div className="text-sm text-gray-600">מקורות המימון המובילים בפרויקטים פעילים / בתכנון</div>
          </CardHeader>
          <CardContent>
            <Line
              data={fundingSourcesData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => {
                        if (typeof value === "number") {
                          return `₪${value.toLocaleString()}`
                        }
                        return value
                      },
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => {
                        const value = tooltipItem.parsed.y
                        return `₪${value.toLocaleString()}`
                      },
                    },
                  },
                },
              }}
              height={100}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-blue-800">סטטוס פרויקטים</CardTitle>
            <div className="text-sm text-gray-600">התפלגות לפי סטטוס</div>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-[300px]">
              <Doughnut
                data={statusData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "right",
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-blue-800">מחלקות מובילות</CardTitle>
            <div className="text-sm text-gray-600">מחלקות מובילות לפי מספר פרויקטים</div>
          </CardHeader>
          <CardContent>
            <Line
              data={departmentData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                      precision: 0, // This ensures whole numbers only
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.raw} פרויקטים`,
                    },
                  },
                },
              }}
              height={100}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-blue-800">חלוקת תקציב בין ישובים</CardTitle>
            <div className="text-sm text-gray-600">תקציב פרויקטים ישובי כולל</div>
          </CardHeader>
          <CardContent>
            <Bar data={villageBudgetData} options={budgetChartOptions} height={300} />{" "}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* רשימת הפרויקטים הקרובים לסיום */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-blue-800">פרויקטים קרובים לסיום</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingProjects.map((project) => (
                <div key={project.id} className="flex justify-between items-center border-b pb-2">
                  <Dialog
                    open={openDialogId === project.id}
                    onOpenChange={(open) => setOpenDialogId(open ? project.id : null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="text-blue-800 p-0 h-auto font-normal text-lg"
                        onClick={() => handleProjectClick(project.id)}
                      >
                        {project.project_name}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] rtl" dir="rtl">
                      <DialogHeader className="border-b pb-4">
                        <DialogTitle className="text-3xl font-bold text-blue-800 text-right">
                          {selectedProject?.project_name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">תיאור</h3>
                            <p className="text-gray-900">{selectedProject?.description}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">מחלקה</h3>
                            <p className="text-gray-900">{selectedProject?.department_name}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">תקציב</h3>
                            <p className="text-gray-900">{formatCurrency(selectedProject?.budget)}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">בעלים</h3>
                            <p className="text-gray-900">{`${selectedProject?.owner_first_name} ${selectedProject?.owner_last_name}`}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">תאריך התחלה</h3>
                            <p className="text-gray-900">{formatDate(selectedProject?.start_date)}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">תאריך סיום</h3>
                            <p className="text-gray-900">{formatDate(selectedProject?.end_date)}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">אימייל ליצירת קשר</h3>
                            <p className="text-gray-900">{selectedProject?.contact_email}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">טלפון ליצירת קשר</h3>
                            <p className="text-gray-900">{selectedProject?.contact_phone}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">נוצר בתאריך</h3>
                            <p className="text-gray-900">{formatDate(selectedProject?.created_at)}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">עודכן לאחרונה</h3>
                            <p className="text-gray-900">{formatDate(selectedProject?.updated_at)}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">סטטוס</h3>
                            <p className="text-gray-900">{selectedProject?.status}</p>
                          </div>
                          <div className="p-4 rounded-lg flex justify-center items-center">
                            <Button
                              variant="default"
                              className=""
                              onClick={() => window.location.href = `/projects/${selectedProject?.id}`}
                            >
                              עבור לעמוד הפרויקט
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <span className="text-gray-600">{formatDate(project.end_date)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* רשימת הפרויקטים החדשים האחרונים */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-blue-800">פרויקטים חדשים אחרונים</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {newestProjects.map((project, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  
                  <Dialog
                    open={openDialogId === project.id}
                    onOpenChange={(open) => setOpenDialogId(open ? project.id : null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="text-blue-800 p-0 h-auto font-normal text-lg"
                        onClick={() => handleProjectClick(project.id)}
                      >
                        {project.project_name}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] rtl" dir="rtl">
                      <DialogHeader className="border-b pb-4">
                        <DialogTitle className="text-3xl font-bold text-blue-800 text-right">
                          {chosenProject?.project_name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">תיאור</h3>
                            <p className="text-gray-900">{chosenProject?.description}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">מחלקה</h3>
                            <p className="text-gray-900">{chosenProject?.department_name}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">תקציב</h3>
                            <p className="text-gray-900">{formatCurrency(chosenProject?.budget)}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">בעלים</h3>
                            <p className="text-gray-900">{`${chosenProject?.owner_first_name} ${chosenProject?.owner_last_name}`}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">תאריך התחלה</h3>
                            <p className="text-gray-900">{formatDate(chosenProject?.start_date)}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">תאריך סיום</h3>
                            <p className="text-gray-900">{formatDate(chosenProject?.end_date)}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">אימייל ליצירת קשר</h3>
                            <p className="text-gray-900">{chosenProject?.contact_email}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">טלפון ליצירת קשר</h3>
                            <p className="text-gray-900">{chosenProject?.contact_phone}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">נוצר בתאריך</h3>
                            <p className="text-gray-900">{formatDate(chosenProject?.created_at)}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">עודכן לאחרונה</h3>
                            <p className="text-gray-900">{formatDate(chosenProject?.updated_at)}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">סטטוס</h3>
                            <p className="text-gray-900">{chosenProject?.status}</p>
                          </div>
                          <div className="p-4 rounded-lg flex justify-center items-center">
                            <Button
                              variant="default"
                              className=""
                              onClick={() => window.location.href = `/projects/${chosenProject?.id}`}
                            >
                              עבור לעמוד הפרויקט
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <span className="text-gray-600">{formatDate(project.created_at)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}