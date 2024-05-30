import { Paciente, columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from '@/utils/supabase/client';
import ClientPage from '@/components/pacientes/ClientPage'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import DialogCompra from "@/components/DialogCompra";


export default async function pacientes() {
  return (
    <div className="container mx-auto py-10">
      <ClientPage/>
    </div>
  )
}
