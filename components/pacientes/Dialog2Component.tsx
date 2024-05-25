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
import React from "react"
import { createClient } from '@/utils/supabase/client';
import { Paciente } from "@/app/pacientes/columns"

interface Dialog1ComponentProps {
  paciente: Paciente;
  setData: React.Dispatch<React.SetStateAction<Paciente[]>>;
}



export default function Dialog2Component({paciente, setData}: Dialog1ComponentProps) {

  const handleSubmit = async () =>{
    const supabase = createClient();
    const response = await supabase.from('paciente').delete().eq('id', paciente.id)
    setData(prevData => prevData.filter(p => p.id !== paciente.id))
  }

    return(
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Eliminar paciente</DialogTitle>
          <DialogDescription>
            Presione Eliminar para confirmar la eliminacion del paciente {paciente.nombre} {paciente.apellido}, una vez realizado no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" variant="destructive" onClick={handleSubmit}>Eliminar</Button>
          </DialogTrigger>
        </DialogFooter>
        </DialogContent>
    )
}