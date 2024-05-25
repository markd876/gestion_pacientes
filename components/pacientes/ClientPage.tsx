'use client'; 

import React, { useState, useEffect } from 'react';
import { Paciente, columns } from "@/app/pacientes/columns";
import { DataTable } from "@/app/pacientes/data-table";
import { createClient } from '@/utils/supabase/client';

const ClientPage = () => {
  const [data, setData] = useState<Paciente[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: fetchedData, error } = await supabase.from('paciente').select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(fetchedData as Paciente[]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns(setData)} data={data} setData={setData} />
    </div>
  );
};

export default ClientPage;