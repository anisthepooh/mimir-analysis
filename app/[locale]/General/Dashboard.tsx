'use client'
import React from 'react';
import { Download, Printer } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

interface DashboardProps {
  model: string;
  setModel: (model: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  model, 
  setModel, 
}) => {
  const t = useTranslations(); 

  const displayTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.value;
    if (window.confirm(t('changingModel', { target }))) {
      setModel(target); // Update the model
      setTimeout(() => {
        window.location.reload(); // Refresh the page
      }, 500)              

    }
  };
  return (
    <div className='my-8 w-full'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl sm:text-4xl font-semibold tracking-tighter'>{t('overview_tests')}</h1>
      </div>
      <div className='flex justify-between items-center mt-16'>
      <div className="flex-col sm:flex-row inline-flex rounded-lg text-muted-foreground bg-muted p-1">
        <button
            key={"tab"}
            value="cronical" 
            onClick={displayTag}
            className={`px-4 py-2 font-medium transition-colors duration-150 ease-in-out focus:outline-none rounded-md ${
              model === "cronical"
                ? 'bg-white text-slate-900 '
                : 'text-slate-500 hover:text-slate-900 '
            }`}
          >
            {t('chronical_use')}
          </button>
        <button
            key={"tab"}
            value="occational"  
            onClick={displayTag}
            className={`px-4 py-2 font-medium transition-colors duration-150 ease-in-out focus:outline-none rounded-md ${
              model === "occational"
              ? 'bg-white text-slate-900 '
              : 'text-slate-500 hover:text-slate-900 '
            }`}
          >
            {t('occational_use')}
          </button>
        </div>
        <Button variant={'default'} onClick={() => window.print()} className='capitalize'>
          <Printer /> Print
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
