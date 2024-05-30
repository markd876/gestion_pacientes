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



interface Dialog4ComponentProps{
    setData: React.Dispatch<React.SetStateAction<Paciente[]>>;
}

export default function Dialog4Component({setData}:Dialog4ComponentProps) {

    const [nombre, setNombre] = useState<String>()
    const [apellido, setApellido] = useState<String>()
    const handleSubmit : any = async () =>{
        const supabase = createClient();
        const {data: nuevoPac, error} = await supabase.from('paciente').insert([{nombre: nombre, apellido: apellido}]).select()
        if(nuevoPac && nuevoPac.length > 0){
            setData(prevData => [...prevData, ...nuevoPac])
        }
    }

    return (
        <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
                <DialogTitle>Agregar paciente</DialogTitle>
                <DialogDescription>
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Nombre
                    </Label>
                    <Input
                        onChangeCapture={(e) => {
                            setNombre(e.currentTarget.value)
                        } }
                        id="name"
                        defaultValue=""
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Apellido
                    </Label>
                    <Input
                        onChangeCapture={(e) => setApellido(e.currentTarget.value)}
                        id="apellido"
                        defaultValue=""
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <DialogTrigger asChild>
                    <Button type="submit" onClick={handleSubmit}>Agregar</Button>
                </DialogTrigger>
            </DialogFooter>
        </DialogContent>
    )
}