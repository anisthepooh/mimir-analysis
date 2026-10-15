'use client'
import React from 'react';
import { Download } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { pdf } from '@react-pdf/renderer';
import { formatDistance } from 'date-fns';
import { lt, lte } from 'lodash';
import { Button } from '@/components/ui/button';
import ModelSelector from '@/app/Components/ModelSelector';
import ReportDocument from './ReportDocument';
import { useDatapointsStore, useUtilitiesStore } from '@/app/_store';
import useModelStore from '@/app/_store/modelStore';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({ 
}) => {
  const t = useTranslations(); 
  const locale = useLocale();
  const { datapoints } = useDatapointsStore();
  const { unit } = useUtilitiesStore();
  const { model } = useModelStore();

  const handleExportPdf = async () => {
    const datapointsLength = datapoints.length - 1;
    const latestAnswer = datapoints[datapointsLength]?.answer;
    const hasDatapoints = !lt(datapoints.length, 1);

    const interpretationCardTitle = hasDatapoints ? latestAnswer.title : t('defaultAnswers.title');
    const interpretationCardText = hasDatapoints ? latestAnswer.text : t('defaultAnswers.text');
    const interpretationCalculation = hasDatapoints ? latestAnswer.calculation : t('defaultAnswers.calculation');
    const interpretationOutside = hasDatapoints ? latestAnswer.outside : '';
    const status = hasDatapoints ? latestAnswer.status : null;

    const chartData = datapoints.map((datapoint) => ({ date: datapoint.date, value: datapoint.value }));
    const graphDescription = lte(chartData.length, 1)
      ? t('add_to_tests')
      : t('graph_description', {
          date: formatDistance(new Date(chartData[0].date), new Date(chartData[chartData.length - 1].date)),
        });

    const tableRows = datapoints.map((datapoint, index) => ({
      testNumber: index + 1,
      dateLabel: model === 'cronical'
        ? new Date(datapoint.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })
        : new Date(datapoint.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }),
      valueLabel: `${datapoint.value} ${unit}`,
    }));

    const generatedAtLabel = `${t('generated_on')} ${new Date().toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}`;

    const blob = await pdf(
      <ReportDocument
        reportTitle={t('overview_tests')}
        generatedAtLabel={generatedAtLabel}
        interpretationTitle={t('interpretation')}
        interpretationDescription={t('interpretation_description')}
        interpretationCardTitle={interpretationCardTitle}
        interpretationCardText={interpretationCardText}
        interpretationCalculation={interpretationCalculation}
        interpretationOutside={interpretationOutside}
        status={status}
        badgeLabels={{
          noAnswer: t('badges.no_answer'),
          newTestRequired: t('badges.new_test_required'),
          signOnUse: t('badges.sign_on_use'),
          noNewUse: t('badges.no_new_use'),
        }}
        graphHeading={t('graph_heading')}
        graphDescription={graphDescription}
        chartData={chartData}
        testHistoryHeading={t('test_history')}
        testNbLabel={t('test_nb')}
        testedLabel={t('tested')}
        testValueLabel={t('test_value')}
        tableRows={tableRows}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mimir-report-${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  
  return (
    <div className='my-8 w-full'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl sm:text-4xl font-semibold tracking-tighter'>{t('overview_tests')}</h1>
      </div>
      <div className='flex justify-between items-center mt-16'>
        <ModelSelector />
        <Button variant={'default'} onClick={handleExportPdf} className='capitalize'>
          <Download /> {t('download_report')}
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
