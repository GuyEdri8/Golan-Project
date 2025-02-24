<<<<<<< HEAD
'use client'
import { ProjectProvider } from "@/components/ProjectContext"
=======
// 'use client'
// import { ProjectProvider } from "@/components/ProjectContext"
// import { ScrollArea } from "@/components/ui/scroll-area";
// // import { useRouter, useParams, useSearchParams } from "next/navigation"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { useState } from "react";


// export default function DashboardLayout({
//     children,
//     header,
//     dashboard,
//     settings,
//     activity,
//     documents,
//     sidebar,


// }: Readonly<{
//     children: React.ReactNode
//     dashboard: React.ReactNode
//     header: React.ReactNode
//     settings: React.ReactNode
//     activity: React.ReactNode
//     documents: React.ReactNode
//     sidebar: React.ReactNode




// }>) {
//     // const router = useRouter();
//     // const params = useParams();
//     // const id = params.id as string;
//     // const searchParams = useSearchParams();
//     // const tab = searchParams.get('tab') as string || 'overview';
//      const [tab, setTab] = useState('overview');

//     return (
//         <ProjectProvider>
//             <div className="min-h-screen bg-gray-50">

//                 <div className="container mx-auto px-4 py-8">
//                     {header}
//                     <div className="flex flex-col h-full  lg:grid lg:grid-cols-3 mt-8 gap-3">
//                         <div className="pt-0 flex-1 h-full p-4 rounded-lg lg:col-span-2">
//                             <Tabs
//                                 className="flex flex-col justify-start"
//                                 onValueChange={(value) => {
//                                     setTab(value);
//                                 }}
//                                 defaultValue="overview"
//                                 dir="rtl"

//                             >

//                             <TabsList>
//                                 <TabsTrigger value="overview">סקירה כללית</TabsTrigger>
//                                 <TabsTrigger value="documents">מסמכים</TabsTrigger>

//                                 <TabsTrigger value="activity">יומן פעילות</TabsTrigger>
//                                 <TabsTrigger value="settings">הגדרות</TabsTrigger>
//                             </TabsList>
//                             <TabsContent className='h-full flex-1'  value={tab}>
//                                 <ScrollArea className="h-full">
//                                     {tab === 'overview' ? dashboard : tab === 'settings' ? settings : tab === 'activity' ? activity : tab === 'documents' ? documents : children}
//                                 </ScrollArea>
//                             </TabsContent>
//                         </Tabs>

                        
//                         </div>
//                         <div className="place-self-center">
//                             {sidebar}
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </ProjectProvider>
//     )
// }

'use client'
import { ProjectProvider } from "@/components/ProjectContext"
import { ScrollArea } from "@/components/ui/scroll-area";
>>>>>>> guy
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from "react";

export default function DashboardLayout({
    children,
    header,
    dashboard,
    settings,
    activity,
    documents,
    sidebar,
}: Readonly<{
    children: React.ReactNode
    dashboard: React.ReactNode
    header: React.ReactNode
    settings: React.ReactNode
    activity: React.ReactNode
    documents: React.ReactNode
    sidebar: React.ReactNode
}>) {
    const [tab, setTab] = useState('overview');

    return (
        <ProjectProvider>
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    {header}
                    <div className="flex flex-col h-full lg:grid lg:grid-cols-4 mt-8 gap-3">
                        <div className="pt-0 h-full rounded-lg lg:col-span-3">
                            <Tabs
                                className="flex h-full flex-col justify-start w-full"
                                onValueChange={(value) => {
                                    setTab(value);
                                }}

                                defaultValue="overview"
                                dir="rtl"
                            >
                                <TabsList className="w-full justify-start">
                                    <TabsTrigger value="overview" className="flex-1">סקירה כללית</TabsTrigger>
                                    <TabsTrigger value="documents" className="flex-1">מסמכים</TabsTrigger>
                                    <TabsTrigger value="activity" className="flex-1">יומן פעילות</TabsTrigger>
                                    <TabsTrigger value="settings" className="flex-1">הגדרות</TabsTrigger>
                                </TabsList>
                                <TabsContent className="h-full text-right flex-1" value={tab}>
                                        {tab === 'overview' ? dashboard : 
                                         tab === 'settings' ? settings : 
                                         tab === 'activity' ? activity : 
                                         tab === 'documents' ? documents : 
                                         children}
                                </TabsContent>
                            </Tabs>
                        </div>
<<<<<<< HEAD
                        <div className="h-full justify-self-end w-full">
=======
                        <div className="h-full justify-self-end w-fit">
>>>>>>> guy
                            {sidebar}
                        </div>
                    </div>
                </div>
            </div>
        </ProjectProvider>
    )
}