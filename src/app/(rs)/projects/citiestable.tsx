'use client'
import { Settlement, columns } from './columns'
import { DataTable } from "@/components/data-table";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function CitiesTable({ settlements } : {settlements : Settlement[]}) {
    const [selected, setSelected] = useState<Settlement | null>(null)
    const router = useRouter();
    const handleClick = () => {
        if (selected) {
            router.push(`/cities/form/?settlement_id=${selected.settlement_id}`)
        }
    }
    return (
        <div className='p-4'>
            <DataTable label={'בחר ישוב'} columns={columns} data={settlements} setSelected={setSelected} />
            <Button disabled={selected === null} onClick={handleClick} className='w-min mr-auto mt-3 ml-5'>
                בחר
            </Button>

        </div>
    )
}