import { Paciente, columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from '@/utils/supabase/client';
import ClientPage from '@/components/pacientes/ClientPage'



export default async function pacientes() {
  return (
    <div className="container mx-auto py-10">
      <ClientPage/>
    </div>
  )
}
