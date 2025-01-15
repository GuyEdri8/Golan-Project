"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Settlement = {
    settlement_id: string
    name: string
}

export const columns: ColumnDef<Settlement>[] = [
    {
        accessorKey: 'select',
        header: () => <div className="text-right">בחר</div>,
        cell: ({ row }) => (
            <Checkbox
            className="mr-2"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "settlement_id",
        header: () => <div className="text-right">מזהה אשכול</div>,
    },
    {
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
    },
    // {
    //     accessorKey: "type",
    //     header: () => <div className="text-right">סוג אשכול</div>,
    // },
]
