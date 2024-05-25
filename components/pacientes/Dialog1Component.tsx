import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import { Paciente } from "@/app/pacientes/columns"
import { createClient } from '@/utils/supabase/client';
import { Router, useRouter } from "next/router"

interface Dialog1ComponentProps {
    paciente: Paciente;
    setData: React.Dispatch<React.SetStateAction<Paciente[]>>;
  }

export default function Dialog1Component({paciente, setData}: Dialog1ComponentProps) {
    const [nombre, setNombre] = useState(paciente.nombre)
    const [apellido, setApellido] = useState(paciente.apellido)

    const handleSubmit : any = async () =>{
        const supabase = createClient();
        console.log(nombre)
        console.log(apellido)
        const response = await supabase.from('paciente').update({nombre: nombre, apellido: apellido}).eq('id', paciente.id).select()
        console.log(response.data)
        paciente.nombre = nombre
        paciente.apellido = apellido
        setData(prevData => prevData.map((p) => p.id === paciente.id ? {...p, nombre, apellido} : p));
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            {}
            <DialogHeader>
                <DialogTitle>Editar paciente</DialogTitle>
                <DialogDescription>
                    Editar paciente, cuando termine apriete salvar cambios
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
                        defaultValue={paciente.nombre}
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
                        defaultValue={paciente.apellido}
                        className="col-span-3"
                    />
                </div>
            </div>
            <DialogFooter>
                <DialogTrigger asChild>
                    <Button type="submit" onClick={handleSubmit}>Salvar cambios</Button>
                </DialogTrigger>
            </DialogFooter>
            </DialogContent>
    )
}