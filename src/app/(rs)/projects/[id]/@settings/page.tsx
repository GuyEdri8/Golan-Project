import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DepartmentsPopup } from "./depratments-popup"
import { getAllDepartmentsWithCount } from "@/lib/queries/getAllDepartments";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { getProject } from "@/lib/queries/projects/getProject";
import { getAllUsers } from "@/lib/queries/users/getAllUsers";
import { OwnerUsersPopup } from "./owner-users";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function ProjectSettings({params}: {params: {id: string}}) {
    const {id} = await params;
    const projectData = await getProject(Number(id));
    const departments: Array<any> = await getAllDepartmentsWithCount();
    const users: Array<any> = await getAllUsers();
    const filteredUsers = users.filter((user) => user.id !== projectData?.owner_id);
    
    return (
        <ScrollArea className="h-full w-full">
            <div dir="rtl" className="flex flex-col gap-4 pb-4">
                <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">שם הפרויקט</CardTitle>
                        <CardDescription>שם הפרויקט יוצג לכל המשתתפים בפרויקט.</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                        <Input value={projectData?.project_name} placeholder="שם הפרויקט" />
                    </CardContent>
                    <CardFooter className="border-t pt-2">
                        <Button size="sm">שמירה</Button>
                    </CardFooter>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">תקציב הפרויקט</CardTitle>
                        <CardDescription>תקציב הפרויקט יוצג לכל המשתתפים בפרויקט.</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                        <Input value={projectData?.budget} placeholder="תקציב הפרויקט" />
                    </CardContent>
                    <CardFooter className="border-t pt-2">
                        <Button size="sm">שמירה</Button>
                    </CardFooter>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">מחלקות בפרויקט</CardTitle>
                        <CardDescription>בחר מחלקות בפרויקט כפי שהוא יוצג לכל המשתתפים בפרויקט.</CardDescription>
                    </CardHeader>

                    <CardContent className="pb-2">

                        <DepartmentsPopup departments={departments} />
                    </CardContent>
                    <CardFooter className="border-t pt-2">
                        <Button size="sm">שמירה</Button>
                    </CardFooter>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">פעולות אדמיניסטרטיביות</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500 mb-2">שינוי סטטוס פרוייקט מבין הסטטוסים המוגדרים במערכת.</p>
                            <Select dir="rtl">
                                <SelectTrigger>
                                    <SelectValue placeholder="בחר סטטוס" />
                                </SelectTrigger>
                                <SelectContent data-side="right">
                                    <SelectItem value="1">פעיל</SelectItem>
                                    <SelectItem value="2">בתכנון</SelectItem>
                                    <SelectItem value="3">מעוכב</SelectItem>
                                    <SelectItem value="4">סגור</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-2">מחיקת פרוייקט תוביל למחיקת כל הקשרים הקשורים לפרויקט.</p>
                            <Button variant="ghost" className="bg-red-200 hover:bg-red-400 text-red-500">
                                מחיקת פרוייקט
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </ScrollArea>
    )
}

