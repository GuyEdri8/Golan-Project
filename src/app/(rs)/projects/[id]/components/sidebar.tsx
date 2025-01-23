import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
// import 'react-circular-progressbar/dist/styles.css'
import { FileText, MessageSquare, Share2 } from 'lucide-react'
import type { getProjectProp } from '@/lib/queries/projects/getProject'
import FileUploadDialog from "@/components/file-upload-dialog"
// import FileUploader from '@/components/uploadFile'
type Props = {
  project: getProjectProp
}
export function Sidebar({project}: Props) {
  const progress = 75

  return (
    <div className="w-full lg:w-80 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>פעולות מהירות</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <FileUploadDialog project_id={project.id}/>
          <Button className="w-full justify-start">
            <MessageSquare className="ml-2 h-4 w-4" />
            שלח הודעה
          </Button>
          <Button className="w-full justify-start">
            <Share2 className="ml-2 h-4 w-4" />
            שתף פרויקט
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>התקדמות הפרויקט</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-32 h-32">
            {/* <CircularProgressbar 
              value={progress} 
              text={`${progress}%`}
              styles={buildStyles({
                textSize: '16px',
                pathColor: `rgba(62, 152, 199, ${progress / 100})`,
                textColor: '#3e98c7',
                trailColor: '#d6d6d6',
              })}
            /> */}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>פעילות אחרונה</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="text-sm">
              <span className="font-medium">דן כהן</span> עדכן את סטטוס המשימה
              <span className="block text-xs text-gray-500">לפני שעתיים</span>
            </li>
            <li className="text-sm">
              <span className="font-medium">רונה לוי</span> העלתה מסמך חדש
              <span className="block text-xs text-gray-500">אתמול ב-14:30</span>
            </li>
            <li className="text-sm">
              <span className="font-medium">אבי ישראלי</span> הוסיף הערה
              <span className="block text-xs text-gray-500">לפני 2 ימים</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

