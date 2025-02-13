"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, Line, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ChartOptions,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

interface HomeComponentProps {
  firstName: string;
  activeProjects: number;
  completedProjects: number;
  plannedProjects: number;
  delayedProjects: number;
  currentMonthProjects: number;
  monthData: { month: string; total_count: number; user_count: number; }[];
  last12Months: string[];
  upcomingProjects: {
    project_name: string | null ;
    description: string | null;
    end_date: Date | null;
  }[];
  newestProjects: {
    project_name: string | null;
    description: string | null;
    created_at: Date | null;
  }[];
  villageBudgetData: any;
  departmentData: any;
}

const chartOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      max: 6,
      ticks: {
        stepSize: 1
      }
    }
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
      align: 'start' as const,
    }
  }
}

const budgetChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      position: 'left',
      ticks: {
        callback: function(value) {
          if (typeof value === 'number') {
            return `₪${value.toLocaleString()}`;
          }
          return value;
        }
      }
    },
    x: {
      ticks: {
        autoSkip: false,
        maxRotation: 45,
        minRotation: 45
      }
    }
  },
  plugins: {
    legend: {
      position: 'bottom',
      align: 'start'
    },
    tooltip: {
      callbacks: {
        title: function(context) {
          const value = context[0].raw;
          if (typeof value === 'number') {
            return `₪${value.toLocaleString()}`;
          }
          return '';
        },
      }
    }
  }
};

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
}: HomeComponentProps)  {
  const timelineData = {
    labels: ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יונ'],
    datasets: [
      {
        label: 'זמן ממוצע (דקות)',
        data: [25, 28, 22, 30, 25, 27],
        borderColor: 'rgb(0, 182, 182)',
        tension: 0.4,
        fill: false
      }
    ]
  }

  // נתונים להתפלגות סטטוס פרויקטים
  const statusData = {
    labels: ['בביצוע', 'הושלם', 'מעוכב', 'בתכנון'],
    datasets: [{
      data: [activeProjects, completedProjects, delayedProjects, plannedProjects],
      backgroundColor: [
        'rgb(0, 182, 182)',
        'rgb(0, 51, 89)',
        'rgb(255, 99, 132)',
        'rgb(255, 205, 86)'
      ]
    }]
  }

  // נתונים לגרף משאבים
  const resourcesData = {
    labels: ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יונ'],
    datasets: [
      {
        label: 'משאבים בשימוש',
        data: [2.5, 2.7, 2.4, 2.8, 2.6, 2.7],
        borderColor: 'rgb(0, 51, 89)',
        backgroundColor: 'rgba(0, 51, 89, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const monthlyData = {
    labels: last12Months,
    datasets: [
      {
        label: 'הפרויקטים שלי',
        data: monthData.map(d => d.user_count),
        backgroundColor: 'rgb(0, 182, 182)',
        barPercentage: 0.5,
      },
      {
        label: 'מספר פרויקטים בחודש זה',
        data: monthData.map(d => d.total_count),
        backgroundColor: 'rgb(0, 51, 89)',
        barPercentage: 0.5,
      }
    ]
  }

  // Get the current month's data (last item in the array)
  const currentMonthUserProjects = monthData[monthData.length - 1]?.user_count || 0;

  const formatDate = (dateString: Date | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('he', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="p-8" dir="rtl">
      <h1 className="text-4xl font-bold mb-8 text-blue-800">שלום {firstName}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-blue-800">מספר פרויקטים</CardTitle>
            <div className="text-sm text-gray-600">
              כמות פרויקטים חודשית
            </div>
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
            <CardTitle className="text-xl text-blue-800">עמידה ביעדים (לפי ג'ירה)</CardTitle>
            <div className="text-sm text-gray-600">
              זמן ממוצע לפרויקט (בדקות)
            </div>
          </CardHeader>
          <CardContent>
            <Line 
              data={timelineData} 
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 40
                  }
                },
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }} 
              height={100}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-blue-800">סטטוס פרויקטים</CardTitle>
            <div className="text-sm text-gray-600">
              התפלגות לפי סטטוס
            </div>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-[300px]">
              <Doughnut 
                data={statusData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'right'
                    }
                  }
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
    <CardHeader>
        <CardTitle className="text-xl text-blue-800">מחלקות מובילות</CardTitle>
        <div className="text-sm text-gray-600">
            מחלקות מובילות לפי מספר פרויקטים
        </div>
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
                            precision: 0 // This ensures whole numbers only
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.raw} פרויקטים`;
                            }
                        }
                    }
                }
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
          <div className="text-sm text-gray-600">
            תקציב פרויקטים ישובי כולל
          </div>
        </CardHeader>
        <CardContent>
          <Bar data={villageBudgetData} options={budgetChartOptions} height={300} /> {/* Increased height for better visibility */}
        </CardContent>
      </Card>
    </div>

    <div className="grid grid-cols-1 gap-6 mt-6">
      {/* רשימת הפרויקטים הקרובים לסיום */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-blue-800">פרויקטים קרובים לסיום</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
          {upcomingProjects.map((project, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <div className="text-blue-800">
                  {project.project_name}
                  {project.description && (
                    <span className="text-gray-600 mr-2">- {project.description}</span>
                  )}
                </div>
                <span className="text-gray-600">{formatDate(project.end_date)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* רשימת הפרויקטים החדשים האחרונים */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-blue-800">פרויקטים חדשים אחרונים</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
          {newestProjects.map((project, index) => (
          <div key={index} className="flex justify-between items-center border-b pb-2">
            <div className="text-blue-800">
              {project.project_name}
              {project.description && (
                <span className="text-gray-600 mr-2">- {project.description}</span>
              )}
            </div>
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