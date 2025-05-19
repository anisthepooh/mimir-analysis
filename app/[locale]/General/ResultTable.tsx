import { useAnswersStore, useDatapointsStore } from '@/app/_store';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Hash, Tag, TestTube } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useRef } from 'react';

interface ResultTableProps {
  model: string;
  unit: string;
}

const ResultTable: React.FC<ResultTableProps> = ({ model, unit }) => {
  const t = useTranslations()
  const { datapoints } = useDatapointsStore()
  const { answers } = useAnswersStore()
  const locale = useLocale();

  const renderBadge = (status: string) => {
    switch (status) {
      case 'no_answer':
        return (
          <Badge className="flex items-center gap-1 bg-slate-200 text-slate-800">
            <Tag size={12} />
            <span className="text-xs">{t('badges.no_answer')}</span>
          </Badge>
        ) 
      case 'new_test_required':
        return (
          <Badge className="flex items-center gap-1 bg-orange-200 text-orange-800">
            <Tag size={12} />
            <span className="text-xs">{t('badges.new_test_required')}</span>
          </Badge>
        )
      case 'sign_on_use':
        return (
          <Badge className="flex items-center gap-1 bg-red-200 text-red-800">
            <Tag size={12} />
            <span className="text-xs">{t('badges.sign_on_use')}</span>
          </Badge>
        )
      case 'no_new_use':
        return (
          <Badge className="flex items-center gap-1 bg-green-200 text-green-800">
            <Tag size={12} />
            <span className="text-xs">{t('badges.no_new_use')}</span>
          </Badge>
        )
      default:
        return (
          <Badge className="flex items-center gap-1 bg-slate-200 text-slate-800">
            <Tag size={12} />
            <span className="text-xs">{t('badges.no_answer')}</span>
          </Badge>
        )
    }
  }
  return (
    <div className="mt-8 w-full">
      <div className="overflow-x-auto rounded-lg w-full">
        <Table>
          <TableHeader className="rounded-b-none">
            <TableRow className="bg-base-200 bg-muted/50 rounded-b-none">
              <TableHead>
                <div className="flex-col sm:flex-row flex items-center gap-1">
                  <Hash className="w-4 h-4" />
                  {t('test_nb')}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex-col sm:flex-row  flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {t('tested')}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex-col sm:flex-row  flex items-center gap-1">
                  <TestTube className="w-4 h-4" />
                  {t('test_value')}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex-col sm:flex-row  flex items-center gap-1">
                  <TestTube className="w-4 h-4" />
                  {t('status')}
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
                  //@ts-ignore
                    new Date(datapoint.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' }) 
                    : 
                    //@ts-ignore
                    new Date(datapoint.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })
                  }
                </TableCell>
                <TableCell>{datapoint.value} {unit}</TableCell>
                <TableCell>
                  { renderBadge(datapoint.answer.status) }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ResultTable;
