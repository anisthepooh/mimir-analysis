import useStore from '@/app/_store';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Hash, TestTube } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useRef } from 'react';

interface ResultTableProps {
  model: string;
}

const ResultTable: React.FC<ResultTableProps> = ({ model }) => {
  const { datapoints, answers } = useStore();
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="mt-8 w-full">
      <div className="overflow-x-auto rounded-lg w-full">
        {t('defaultAnswers.title')}
        <Table>
          <TableHeader className="rounded-b-none">
            <TableRow className="bg-base-200 bg-muted/50 rounded-b-none">
              <TableHead>
                <div className="flex items-center gap-1">
                  <Hash className="w-4 h-4" />
                  {'test_nb'}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {'tested'}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <TestTube className="w-4 h-4" />
                  {'test_value'}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datapoints.map((datapoint, index) => (
              <TableRow key={datapoint.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {model === "cronical" ? 
                    new Date(datapoint.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' }) 
                    : 
                    new Date(datapoint.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })
                  }
                </TableCell>
                <TableCell>{datapoint.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ResultTable;