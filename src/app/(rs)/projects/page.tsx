import { getAllDepartmentsWithCount } from "@/lib/queries/getAllDepartments";
import { BackButton } from "@/components/BackButton";
import ProjectPage from "./project-pages";

export default async function  CitiesPage() {
    const projects: Array<any> = await getAllDepartmentsWithCount();
    if(!projects)
    {
        return (
            <>
                <h2>No Projects were found</h2>
                <BackButton title="Go Back" variant={'default'}/>
            </>
        )
    }
    else 
    {
        return (
            <>
                <ProjectPage projects={projects} />
            </>
        )
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