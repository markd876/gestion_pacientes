"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal,ArrowUpDown } from "lucide-react"
import { Row } from '@tanstack/react-table';


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
import { useEffect, useState } from "react";
import React from "react";
import Dialog1Component from "@/components/pacientes/Dialog1Component";
import Dialog2Component from "@/components/pacientes/Dialog2Component";
import Dialog3Component from "@/components/pacientes/Dialog3Component";
import {DataTableColumnHeader} from "./data-tableColumnHeader";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Paciente = {
  id: number
  nombre: string
  apellido: string
  saldo: number
}


enum Dialogs {
  dialog1 = 'dialog1',
  dialog2 = 'dialog2',
  dialog3 = 'dialog3'
}


export const columns= (setData: React.Dispatch<React.SetStateAction<Paciente[]>>): ColumnDef<Paciente>[] => [
  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "apellido",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Apellido" />
    ),
  },
  {
    accessorKey: "saldo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Saldo" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const paciente = row.original
      const [dialog, setDialog] = useState<any>()
      const [dialogKey, setDialogKey] = useState(0)
      useEffect(()=>{

      },[dialog])

      const openDialog = (dialogType: string) =>{
        setDialog(null)
        setTimeout(() => {          
          setDialog(dialogType)
        }, 0);
        
      } 

      return (
        <React.Fragment>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DialogTrigger asChild onClick={() => openDialog(Dialogs.dialog1)}>
                  <DropdownMenuItem>Editar paciente</DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger asChild onClick={() => openDialog(Dialogs.dialog3)}>
                  <DropdownMenuItem>Ver detalle de saldo</DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger asChild onClick={() => openDialog(Dialogs.dialog2)}>
                  <DropdownMenuItem className="text-red-600">Eliminar paciente</DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            {
              dialog === Dialogs.dialog1 ? (<Dialog1Component paciente={paciente} setData={setData} />): dialog === Dialogs.dialog2 ? (<Dialog2Component paciente={paciente} setData={setData}/>) : <Dialog3Component paciente={paciente} isActive={dialog === Dialogs.dialog3}/>
            }
          </Dialog>
        </React.Fragment>
      )
    },
  },
]