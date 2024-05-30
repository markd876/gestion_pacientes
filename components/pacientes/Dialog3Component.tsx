'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import { Paciente } from "@/app/pacientes/columns"
import { createClient } from '@/utils/supabase/client';
import { Router, useRouter } from "next/router"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Dialog3ComponentProps {
    paciente: Paciente;
    isActive: boolean;
}
interface Tratamiento{
    nombre: String;
}
interface Compras {
    fecha: Date;
    id: Number;
    paciente_id: Number;
    tratamiento_id: Number;
    total: Number;
    tratamiento: Tratamiento;
}

export default function Dialog3Component({ paciente, isActive }: Dialog3ComponentProps) {


    const [data, setData] = useState<Compras[]>([])
    const getData = async () => {
        const supabase = createClient()
        const { data: compras, error } = await supabase
        .from('compras')
        .select('*,tratamiento(nombre)')
        .eq('paciente_id', paciente.id)
        .order('fecha',{ ascending: true })
        console.log(compras)
        setData(compras as Compras[])
    }
    useEffect(() => {
        if(isActive){
            getData()
        }
        isActive = false
      }, [isActive,paciente.id])

    return (
        <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
                <DialogTitle> Detalle de saldo de {paciente.nombre} {paciente.apellido}</DialogTitle>
                <DialogDescription>
                    
                </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[200px] w-[550px] rounded-md border p-4">
            <Table>
                <TableCaption>{/* desc */}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Fecha</TableHead>
                        <TableHead>Tratamiento</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((compra,e) => (
                        <TableRow key={e}>
                            <TableCell className="font-medium">{(compra.fecha).toString()}</TableCell>
                            <TableCell>{(compra.tratamiento.nombre).toString()}</TableCell>
                            <TableCell className="text-right">{(compra.total).toString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>Saldo actual</TableCell>
                        <TableCell className="text-right">{paciente.saldo}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            </ScrollArea>
            <DialogFooter>
                <DialogTrigger asChild>
                    <Button type="submit" onClick={getData}>Cerrar</Button>
                </DialogTrigger>
            </DialogFooter>
        </DialogContent>
    )
}