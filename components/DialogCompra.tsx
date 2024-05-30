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
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import { Paciente } from "@/app/pacientes/columns"
import { Tratamiento } from "./pacientes/ClientPage"
import { createClient } from '@/utils/supabase/client';
import { Router, useRouter } from "next/router"
import { CommandList } from "cmdk"
import { ScrollArea } from "./ui/scroll-area"

interface DialogCompraProps {
    pacientes: Paciente[];
    tratamientos: Tratamiento[];
}

export default function DialogCompra({ pacientes, tratamientos }: DialogCompraProps) {
    const [open1, setOpen1] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [value1, setValue1] = React.useState("")
    const [value2, setValue2] = React.useState("")
    const [pac, setPac] = React.useState<Paciente>()
    const [trat, setTrat] = React.useState<Tratamiento>()
    console.log(pacientes)
    console.log(tratamientos)

    useEffect(()=>{
        if(value2){
            const tratamientoEncontrado = tratamientos.find(
                (tratamiento) => `${tratamiento.id}` === value2
              );
              setTrat(tratamientoEncontrado);
        }
    },[value2])

    useEffect(()=>{
        if(value1){
            const pacienteEncontrado = pacientes.find(
                (paciente) => `${paciente.id}` === value1
            );
            setPac(pacienteEncontrado)
        }
    },[value1])
    

    const handleSubmit: any = async () => {
                const supabase = createClient();
                let total = trat?.precio_ars;
                let fecha = new Date()
                let year = fecha.getFullYear()
                const month = String(`${fecha.getMonth() + 1}`)
                const day = String(`${fecha.getDate()}`)
                const parsedDate = `${year}-${month}-${day}`
                console.log(trat)
                console.log(pac)
                const response = await supabase.from('compras').insert({paciente_id: pac?.id, tratamiento_id: trat?.id, total, fecha: parsedDate})
                console.log(response.data)
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Compra</DialogTitle>
                <DialogDescription>
                    {/* desc */}
                </DialogDescription>
            </DialogHeader>
            <Popover open={open1} onOpenChange={setOpen1} modal={true}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open1}
                        className="w-[200px] justify-between"
                    >

                        {value1 ? (
                            (() => {
                                const pacienteEncontrado = pacientes.find(
                                    (paciente) => `${paciente.id}` === value1
                                );
                                
                                return pacienteEncontrado
                                    ? `${pacienteEncontrado.nombre} ${pacienteEncontrado.apellido}`
                                    : "Seleccionar paciente";
                            })()
                        ) : (
                            "Seleccionar paciente"
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Buscar paciente" />
                        <CommandEmpty>Ningun paciente encontrado.</CommandEmpty>
                        <ScrollArea className="h-24">
                            <CommandGroup>
                                <CommandList>
                                    {pacientes.map((paciente, e) => (
                                        <CommandItem
                                            key={e}
                                            value={`${paciente.id}`}
                                            onSelect={(currentValue) => {
                                                console.log(currentValue === value1)
                                                setValue1(currentValue === value1 ? "" : currentValue)
                                                setOpen1(false)
                                                console.log(currentValue)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value1 === paciente.nombre ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {paciente.nombre + ' '  +  paciente.apellido}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </CommandGroup>
                        </ScrollArea>
                    </Command>
                </PopoverContent>
            </Popover>
            <Popover open={open2} onOpenChange={setOpen2} modal={true}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open2}
                        className="w-[200px] justify-between"
                    >

                        {value2 ? (
                            (() => {
                                const tratamientoEncontrado = tratamientos.find(
                                    (tratamiento) => `${tratamiento.id}` === value2
                                );
                                return tratamientoEncontrado
                                    ? `${tratamientoEncontrado.nombre}`
                                    : "Seleccionar tratamiento";
                            })()
                        ) : (
                            "Seleccionar tratamiento"
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Buscar tratamiento" />
                        <CommandEmpty>Ningun paciente encontrado.</CommandEmpty>
                        <ScrollArea className="h-24">
                            <CommandGroup>
                                <CommandList>
                                    {tratamientos.map((tratamiento, e) => (
                                        <CommandItem
                                            key={e}
                                            value={`${tratamiento.id}`}
                                            onSelect={(currentValue) => {
                                                console.log(currentValue === value2)
                                                setValue2(currentValue === value2 ? "" : currentValue)
                                                setOpen2(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value2 === tratamiento.nombre ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {tratamiento.nombre}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </CommandGroup>
                        </ScrollArea>
                    </Command>
                </PopoverContent>
            </Popover>
            <DialogFooter>
                <DialogTrigger asChild>
                    <Button type="submit" onClick={handleSubmit}>Añadir compra</Button>
                </DialogTrigger>
            </DialogFooter>
        </DialogContent>
    )
}