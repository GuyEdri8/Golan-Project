import { getAllSettlements } from "@/lib/queries/getAllSettlements";
import { BackButton } from "@/components/BackButton";
import CitiesTable from "./citiestable";
import { Settlement } from "./columns";

export default async function  CitiesPage() {
    const settlements: Array<any> = await getAllSettlements();
    if(!settlements)
    {
        return (
            <>
                <h2>No Cities were found</h2>
                <BackButton title="Go Back" variant={'default'}/>
            </>
        )
    }
    else 
    {
        return (
            <>
                <h2>Cities List</h2>
                <CitiesTable settlements={settlements} />
            </>
        )
    }
}