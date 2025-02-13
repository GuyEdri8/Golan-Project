"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon } from "@radix-ui/react-icons"
import { type insertSettlementSchemaType, type insertStatisticsSchemaType } from "@/zod-schemas/city"
import { format } from 'date-fns'
import { ComboboxDemo } from "./combobox"
import FileUploader from "./uploadFile"
type Props  = {
  settlement: insertSettlementSchemaType,
  settlement_statistics: Array<insertStatisticsSchemaType>
}
export default function StatisticsDashboard({ settlement, settlement_statistics} : Props) {
  console.log(settlement_statistics[0].updatedAt);
  const statisticsYear = settlement_statistics.map((stat) => {
    return {
      value: `${new Date(stat.updatedAt!).getFullYear()}`,
      label: `${new Date(stat.updatedAt!).getFullYear()}`,
    }
  })
  const handleSuccess = (message: string) => {
    alert(message);
  };

  const handleError = (error: string) => {
    alert(error);
  };
  const removeDuplicates = (str: string) => {
    const sentanceSet = new Set();
    str.split(" ").map((word) => {
      if(sentanceSet.has(word))
      {
        return;
      }
      sentanceSet.add(word);
      return ' ' + word;
    })
  }
  const updateDate = settlement_statistics[0].updatedAt !== undefined ? new Date(settlement_statistics[0].updatedAt) : new Date()
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/${settlement.name}/photo_1.jpg?height=300&width=1200')`,
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full flex items-end p-6">
            <h1 className="text-4xl font-bold text-white">{settlement.name}</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">מצב דמוגרפי:</h2>
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">בתי אב נכון ל{format(updateDate, "dd/MM/yyyy")}</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{settlement_statistics[0].households}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">מספר תושבים {format(updateDate, "yyyy")}</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{settlement_statistics[0].population}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">צפי מוערך לשנת 2030</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{settlement_statistics[0].population_2030}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">אחוז צמיחה צפוי</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{settlement_statistics[0].growth_rate}%</div>
            </CardContent>
          </Card>
        </div>
          <ComboboxDemo name="שנה" items={statisticsYear}/>
        <h2 className="text-2xl font-semibold mb-6">תכנית ראשונית – עיקרי החומש הישובי</h2>
        <Tabs defaultValue="2024" className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="2024">2024</TabsTrigger>
            <TabsTrigger value="2025">2025</TabsTrigger>
            <TabsTrigger value="2026">2026</TabsTrigger>
            <TabsTrigger value="2027">2027</TabsTrigger>
            <TabsTrigger value="2028">2028</TabsTrigger>
          </TabsList>
          <TabsContent value="2024">
            <Card>
              <CardContent className="space-y-2 pt-6">
                <p>שיפוץ מתקן שעשועים -החלפת משטח</p>
                <p>שיקום כביש הקיים ומרכזי ביישוב</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="2025">
            <Card>
              <CardContent className="space-y-2 pt-6">
                <p>ביצוע שיקום תשתיות מקיף</p>
                <p>כולל ביוב</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="2026">
            <Card>
              <CardContent className="space-y-2 pt-6">
                <p>צביעת קיר- גן שקד</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="2027">
            <Card>
              <CardContent className="space-y-2 pt-6">
                <p>התחלת תאורה שנה לסולארי - ניר עבודה</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="2028">
            <Card>
              <CardContent className="space-y-2 pt-6">
                <p>קידום שיפוץ מבני החינוך החברתי-קהילתי</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>נושאים בטיפול מותנה של המועצה והנהגת היישוב</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>קידום תב״ע חדשה (182 יח״ד)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>שיפוץ מבני החינוך החברתי-קהילתי</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>השלמת מועדון הצעירים בישובי המועצה לשימור אחרים</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>הקמת קריית חינוך אפיק</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>הרחבת אזור המשחקים בגן יהודה</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="bg-green-50">
            <CardContent className="p-6">
              <p className="text-green-800">
                אפיק מעלה על נס את חותם החינוך ושואפת להפוך ליישוב המוביל בגולן בתחומו!
              </p>
            </CardContent>
          </Card>
          </div>
      </div>
    </div>
  )
}

