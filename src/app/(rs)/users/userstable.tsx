'use client'
import { User, columns } from './columns'
import { DataTable } from "@/components/data-table";
import { useState } from 'react';

export default function UsersTable({ users } : {users : User[]}) {
    const [selected, setSelected] = useState<User | null>(null)
    return (
        <div className='p-4'>
            <DataTable label={'משתמש'} columns={columns} data={users} setSelected={setSelected} />
        </div>
    )
}