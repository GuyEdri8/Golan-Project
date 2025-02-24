"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { insertCustomerSchema,type insertCustomerSchemaType, type selectCustomerSchemaType, selectCustomerSchema } from "@/zod-schemas/customer"

type Props = {
    customer?: selectCustomerSchemaType,
}


export default function CustomerForm({ customer } : Props) {
    const defaultValues: insertCustomerSchemaType = {
        id: customer?.id || 0,
        firstName: customer?.firstName || '',
        lastName: customer?.lastName || '',
        address1: customer?.address1 || '',
        address2: customer?.address2 || '',
        phone: customer?.phone || '0',
        zip: customer?.zip || '0',
        email: customer?.email ||  "",
        city:  customer?.city || ""
    }
}