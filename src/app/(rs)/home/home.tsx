"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, Line, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
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

export default function Home() {
  // נתוני סיכום זהים לקודם...

  // נתונים לגרף העמודות הראשי זהים לקודם...

  // נתונים לגרף זמני ביצוע
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
      data: [40, 35, 15, 10],
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
    labels: ['פבר 2024', 'מרץ 2024', 'אפר 2024', 'מאי 2024', 'יונ 2024', 'יול 2024', 'אוג 2024', 'ספט 2024', 'אוק 2024', 'נוב 2024', 'דצמ 2024', 'ינו 2025'],
    datasets: [
      {
        label: 'הפרויקטים שלי',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgb(0, 182, 182)',
        barPercentage: 0.5,
      },
      {
        label: 'ממוצע פרויקטים בקהילה',
        data: [4.2, 3.3, 4.8, 4.4, 3.6, 3.8, 3.4, 4.2, 3.4, 2.2, 1.8, 4.2],
        backgroundColor: 'rgb(0, 51, 89)',
        barPercentage: 0.5,
      }
    ]
  }

  return (
    <div className="p-8" dir="rtl">
      {/* קטע הסיכום זהה לקודם... */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-blue-800">מספר פרויקטים</CardTitle>
            <div className="text-sm text-gray-600">
              כמות פרויקטים חודשית
            </div>
            <div className="text-sm">
              הפרויקטים החודשיים שלי: 0 / ממוצע משתמשים חודשי: 4
            </div>
          </CardHeader>
          <CardContent>
            <Bar data={monthlyData} options={chartOptions} height={100} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-blue-800">זמני ביצוע</CardTitle>
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
            <CardTitle className="text-xl text-blue-800">שימוש במשאבים</CardTitle>
            <div className="text-sm text-gray-600">
              ממוצע משאבים לפרויקט לאורך זמן
            </div>
          </CardHeader>
          <CardContent>
            <Line 
              data={resourcesData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 4
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
      </div>

      {/* רשימת הפרויקטים האחרונים */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-blue-800">פרויקטים אחרונים</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { date: '22 ינו 2025', type: 'לא ידוע' },
              { date: '21 ינו 2025', type: 'לא ידוע' },
              { date: '20 ינו 2025', type: 'Fundoplication' },
              { date: '20 ינו 2025', type: 'Gastric Sleeve' },
              { date: '17 ינו 2025', type: 'Fundoplication' }
            ].map((project, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">{project.date}</span>
                <span className="text-blue-800">{project.type}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}