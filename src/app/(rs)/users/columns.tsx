"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define the User type
export type User = {
    id: string
    email: string
    picture: string
    username: string
    full_name: string
    last_name: string
    firstname: string
}

// Define columns
export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "picture",
        header: () => <div className="text-right">אוואטר</div>,
        cell: ({ row }) => (
            <div className="flex justify-start">
                <Avatar>
                    <AvatarImage src={row.original.picture} />
                    <AvatarFallback>{row.original.full_name.split(' ').map((word) => word.charAt(0).toUpperCase())}</AvatarFallback>
                </Avatar>
            </div>
        ),
        filterFn: 'includesString',
    },    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <div className="text-right">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                        שם
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => (
            <div className="text-right font-semibold">
                {row.original.full_name}
            </div>
        ),
        filterFn: 'includesString',
    },
    {
        accessorKey: "email",
        header: () => <div className="text-right">אימייל</div>,
        cell: ({ row }) => (
            <div className="text-right text-sm text-gray-500">
                {row.original.email}
            </div>
        ),
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-right">פעולות</div>,
        cell: ({ row }) => (
            <div className="text-right text-sm text-gray-500">
                ...
            </div>
        ),
        filterFn: 'includesString',
    },
]
