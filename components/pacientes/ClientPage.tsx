'use client';

import React, { useState, useEffect } from 'react';
import { Paciente, columns } from "@/app/pacientes/columns";
import { DataTable } from "@/app/pacientes/data-table";
import { createClient } from '@/utils/supabase/client';
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

export type Tratamiento = {
  id: number
  nombre: string
  precio_ars: number
  precio_usd: number
}

const ClientPage = () => {
  const [dataPac, setDataPac] = useState<Paciente[]>([]);
  const [dataTrat, setDataTrat] = useState<Tratamiento[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: fetchedDataPac, error } = await supabase.from('paciente').select('*');
      const { data: fetchedDataTrat} = await supabase.from('tratamiento').select('*')

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setDataPac(fetchedDataPac as Paciente[]);
        setDataTrat(fetchedDataTrat as Tratamiento[])
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <Dialog>
        <DialogCompra pacientes={dataPac} tratamientos={dataTrat} />
        <DialogTrigger asChild>
          <Button>Añadir compra</Button>
        </DialogTrigger>
      </Dialog>
      <DataTable columns={columns(setDataPac)} data={dataPac} setData={setDataPac} />
    </div>
  );
};

export default ClientPage;