import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for a patient
interface Patient {
  id: number;
  nombre: string;
  apellido: string;
  // Agrega otros campos que necesites
}

// Define the type for the context value
interface PatientContextValue {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  updatePatient: (updatedPatient: Patient) => void;
}

// Create the context
const PatientContext = createContext<PatientContextValue | undefined>(undefined);

// Hook to use the patient context
export const usePatients = (): PatientContextValue => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
};

// Provider component
interface PatientProviderProps {
  children: ReactNode;
}

export const PatientProvider: React.FC<PatientProviderProps> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);

  const updatePatient = (updatedPatient: Patient) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );
  };

  return (
    <PatientContext.Provider value={{ patients, setPatients, updatePatient }}>
      {children}
    </PatientContext.Provider>
  );
};