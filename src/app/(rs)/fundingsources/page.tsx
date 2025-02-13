import { getAllFundingSources } from "@/lib/queries/getFundingSources";
import FundingTable from './foundingtable'
import { AddFundingDialog } from "./funding-dialog"

export const metadata = {
    title: 'מקורות מימון',
}
export default async function Tickets() {
    const arrFundingSources: Array<any> = await getAllFundingSources();
    if(!arrFundingSources)
    {
        return <>
            <h2>אין מקורות מימון פאקאיט</h2>
        </>
    }
    return <>
        <div className="flex justify-between">
            <h2>מקורות מימון</h2>
        </div>
        <FundingTable arrFundingSources={arrFundingSources}/>
        {/* <FundingTable fundingSources={arrFundingSources}/> */}
    </>
} 

