'use client'
import React from 'react';
import { Download, Printer } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import ModelSelector from '@/app/Components/ModelSelector';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({ 
}) => {
  const t = useTranslations(); 

  
  return (
    <div className='my-8 w-full'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl sm:text-4xl font-semibold tracking-tighter'>{t('overview_tests')}</h1>
      </div>
      <div className='flex justify-between items-center mt-16'>
        <ModelSelector />
        <Button variant={'default'} onClick={() => window.print()} className='capitalize'>
          <Printer /> Print
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
