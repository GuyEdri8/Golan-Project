import { getAllDepartmentsWithCount } from "@/lib/queries/getAllDepartments";
import { BackButton } from "@/components/BackButton";
import ProjectPage from "./project-pages";
import { Suspense } from "react";
import { getAllProjectFromFundingSorce } from "@/lib/queries/getAllProjectFromFundingSorce";
import { getProjectsByDepartmentAndSettlement } from '@/lib/queries/getProjectsByDepartment';
import {getProjectsByIds} from '@/lib/queries/getProjectsByDepartment';
import { getAllFundingSources } from "@/lib/queries/getFundingSources";
export default async function ProjectDirectionPage ({
    searchParams,
}: {
    searchParams: Promise<{[key: string] : string | undefined}>
}) {
    const {department_id,prop_sort_by, funder_id} = await searchParams;
    // console.log(department_id,project_id,funder_id);
    const currentSorting = (prop_sort_by ?? 'מחלקות')
    
    if(funder_id)
    {
        return(
            <Suspense fallback={
                <div className="flex items-center justify-center h-screen">
                    <div className="text-2xl">טוען מחלקות...</div>
                </div>
            }>
                <ProjectFundingSources funder_id={funder_id}/>
            </Suspense>
        )
    }
    else {
        if(department_id)
        {
            const departments: Array<any> =  await getAllDepartmentsWithCount();
            const proejctsFromDepartments = await getProjectsByDepartmentAndSettlement(department_id);
            // console.log(proejctsFromDepartments)
            if(!proejctsFromDepartments)
            {
                return <ProjectPage prop_sort_by={'מחלקות'} projects={[]} prop_departments={proejctsFromDepartments}/>
            }
            if(proejctsFromDepartments)
            {
                return (
                    <Suspense fallback={
                        <div className="flex items-center justify-center h-screen">
                            <div className="text-2xl">טוען מחלקות...</div>
                        </div>
                    }>
    
                        <ProjectPage prop_sort_by={'מחלקות'} prop_department_id={parseInt(department_id)} projects={proejctsFromDepartments} prop_departments={departments}/>
                        
                    </Suspense>
                )
            }
        }
        
        return (
            <Suspense fallback={
                <div className="flex items-center justify-center h-screen">
                    <div className="text-2xl">טוען מחלקות...</div>
                </div>
            }>
                <ProjectsDepartments currentSorting={currentSorting}/>
            </Suspense>
        )
    }
}

async function ProjectsDepartments({currentSorting} : {currentSorting : string}) {
    const elementsSortby: Array<any> =  (currentSorting === 'מחלקות') ? await getAllDepartmentsWithCount() : await getAllFundingSources(); // Get all Funding Soruces        

    if(!elementsSortby)
    {
        return (
            <>
                <h2>אין פרוייקטים בעלי אותה מחלקת ממימון.</h2>
                <BackButton title="Go Back" variant={'default'}/>
            </>
        )
    }   
    return (
            <ProjectPage  prop_sort_by={currentSorting}  prop_departments={elementsSortby}/> 
    )
}

async function ProjectFundingSources({funder_id} : {funder_id : string}) {
    const fundingSoucres: Array<any> =  await getAllFundingSources(); // Get all Funding Soruces        
    const projectsFromFunding = await getAllProjectFromFundingSorce(funder_id); // Find All projects within the same source
    if(!projectsFromFunding) {
        return (
            <>
                <h2>אין פרוייקטים בעלי אותה מחלקת ממימון.</h2>
                <BackButton title="Go Back" variant={'default'}/>
            </>
        )
    }
    if(projectsFromFunding)
    {
        const arrProjects = projectsFromFunding.map((element) => element.project_id ?? -1)
        
        if(!arrProjects)
        {
            return <ProjectPage prop_sort_by={'מקורות מימון'} projects={[]} prop_departments={fundingSoucres}/>
        }
        if(arrProjects)
        {
            const projects = await getProjectsByIds(arrProjects)
            if(!projects)
            {
                return <ProjectPage prop_sort_by={'מקורות מימון'} projects={[]} prop_departments={fundingSoucres}/>
            }
            return ( <ProjectPage prop_sort_by={'מקורות מימון'} prop_funder_id={parseInt(funder_id)} projects={projects} prop_departments={fundingSoucres}/>
            )
        }
    }
}

// import { getAllDepartments } from "@/lib/queries/getAllDepartments";
// import { BackButton } from "@/components/BackButton";

// export default async function CustomerFormPage({
//     searchParams,
// }: {
//     searchParams: Promise<{[key: string] : string | undefined}>
// })
// {
//     try {
//         const { customerId } = await searchParams;
//         // Edit customer form
//         if(customerId)
//         {
//             const customer = await getCustomer(parseInt(customerId));
//             if(!customer)
//             {
//                 return (
//                     <>
//                         <h2 className="text-2xl mb-2"> Customer ID #{customerId} not found</h2>
//                         <BackButton title="Go Back" variant={'default'}/>
//                     </>
//                 )
//             }
//             // put customer form component
//         } else {
//             // new customer form component
//         }
//     } catch (error) {
//         if( error instanceof Error )
//         {
//             throw error;
//         }
//     }
// }