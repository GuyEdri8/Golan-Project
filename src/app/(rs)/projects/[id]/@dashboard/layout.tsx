
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { milliseconds } from 'date-fns'

export default function DashboardLayout({
    teammemebers,
    documents,
    milestones,
    overview2,
}: Readonly<{
    teammemebers: React.ReactNode
    documents: React.ReactNode
    milestones: React.ReactNode
    overview2: React.ReactNode
}>) {
    return (
        <div className="bg-red-50">
            <Tabs defaultValue="overview" dir="rtl">
                <TabsList className="mb-4">
                    <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
                    <TabsTrigger value="documents">מסמכים</TabsTrigger>
                    <TabsTrigger value="activity">יומן פעילות</TabsTrigger>
                    <TabsTrigger value="settings">הגדרות</TabsTrigger>
                </TabsList>
          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>תיאור הפרויקט</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Content</p>
                </CardContent>
              </Card>
              {milestones}
              {teammemebers}
              <Card>
                <CardHeader>
                  <CardTitle>פרטי קשר</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>דוא"ל: project@example.com</p>
                  <p>טלפון: 03-1234567</p>
                  <p>כתובת: רחוב הרצל 1, תל אביב</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value='documents'>
              {documents}
          </TabsContent>
          </Tabs>
                {overview2}
        </div>
    )
}