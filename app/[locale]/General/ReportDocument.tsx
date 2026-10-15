'use client'

import {
  Circle,
  Document,
  Line,
  Page,
  Path,
  StyleSheet,
  Svg,
  Text,
  View,
} from '@react-pdf/renderer'

export type ReportChartPoint = {
  date: Date | string
  value: number
}

export type ReportTableRow = {
  testNumber: number
  dateLabel: string
  valueLabel: string
}

export type ReportDocumentProps = {
  reportTitle: string
  generatedAtLabel: string
  interpretationTitle: string
  interpretationDescription: string
  interpretationCardTitle: string
  interpretationCardText: string
  interpretationCalculation: string
  interpretationOutside: string
  status: string | null
  badgeLabels: {
    noAnswer: string
    newTestRequired: string
    signOnUse: string
    noNewUse: string
  }
  graphHeading: string
  graphDescription: string
  chartData: ReportChartPoint[]
  testHistoryHeading: string
  testNbLabel: string
  testedLabel: string
  testValueLabel: string
  tableRows: ReportTableRow[]
}

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 10,
    color: '#1f2937',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#1f2937',
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 9,
    color: '#6b7280',
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
  },
  sectionDescription: {
    marginTop: 2,
    fontSize: 9,
    color: '#6b7280',
  },
  card: {
    marginTop: 10,
    padding: 10,
    borderRadius: 4,
    borderLeftWidth: 4,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: 700,
  },
  cardText: {
    marginTop: 6,
    fontSize: 9,
    lineHeight: 1.4,
  },
  badgeRow: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  badge: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
    fontSize: 8,
  },
  table: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 5,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
    paddingVertical: 5,
  },
  tableCellNumber: {
    width: '15%',
    fontSize: 9,
  },
  tableCellDate: {
    width: '55%',
    fontSize: 9,
  },
  tableCellValue: {
    width: '30%',
    fontSize: 9,
  },
  tableHeaderCell: {
    fontSize: 9,
    fontWeight: 700,
  },
  emptyState: {
    marginTop: 10,
    fontSize: 9,
    color: '#6b7280',
  },
})

// Same palette as the badge legend, so the interpretation boxes match their corresponding tag.
const STATUS_COLORS: Record<string, { background: string; border: string }> = {
  sign_on_use: { background: '#fecaca', border: '#991b1b' },
  no_new_use: { background: '#bbf7d0', border: '#166534' },
  new_test_required: { background: '#fed7aa', border: '#9a3412' },
}
const DEFAULT_STATUS_COLOR = { background: '#e2e8f0', border: '#1e293b' } // no_answer

const getStatusColors = (status: string | null) =>
  (status && STATUS_COLORS[status]) || DEFAULT_STATUS_COLOR

const CHART_WIDTH = 520
const CHART_HEIGHT = 200
const CHART_PADDING = 28

const buildChartPoints = (chartData: ReportChartPoint[]) => {
  const timestamps = chartData.map((point) => new Date(point.date).getTime())
  const values = chartData.map((point) => point.value)

  const minTimestamp = Math.min(...timestamps)
  const maxTimestamp = Math.max(...timestamps)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)

  const timestampRange = maxTimestamp - minTimestamp || 1
  const valueRange = maxValue - minValue || 1

  const plotWidth = CHART_WIDTH - CHART_PADDING * 2
  const plotHeight = CHART_HEIGHT - CHART_PADDING * 2

  const scaleX = (timestamp: number) =>
    CHART_PADDING + ((timestamp - minTimestamp) / timestampRange) * plotWidth
  const scaleY = (value: number) =>
    CHART_PADDING + plotHeight - ((value - minValue) / valueRange) * plotHeight

  const points = chartData.map((point) => ({
    x: scaleX(new Date(point.date).getTime()),
    y: scaleY(point.value),
  }))

  const pathData = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')

  return { points, pathData, minValue, maxValue }
}

const ReportChart = ({ chartData }: { chartData: ReportChartPoint[] }) => {
  if (chartData.length < 2) return null

  const { points, pathData, minValue, maxValue } = buildChartPoints(chartData)
  const firstDate = new Date(chartData[0].date)
  const lastDate = new Date(chartData[chartData.length - 1].date)
  const dateFormatter = (date: Date) =>
    isNaN(date.getTime())
      ? ''
      : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

  const axisY = CHART_HEIGHT - CHART_PADDING

  return (
    <Svg width={CHART_WIDTH} height={CHART_HEIGHT} viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}>
      <Line x1={CHART_PADDING} y1={CHART_PADDING} x2={CHART_PADDING} y2={axisY} stroke="#cbd5e1" strokeWidth={1} />
      <Line x1={CHART_PADDING} y1={axisY} x2={CHART_WIDTH - CHART_PADDING} y2={axisY} stroke="#cbd5e1" strokeWidth={1} />
      <Path d={pathData} stroke="#2563eb" strokeWidth={2} fill="none" />
      {points.map((point, index) => (
        <Circle key={index} cx={point.x} cy={point.y} r={2.5} fill="#2563eb" />
      ))}
      <Text x={CHART_PADDING} y={axisY + 14} style={{ fontSize: 8, fill: '#6b7280' }}>
        {dateFormatter(firstDate)}
      </Text>
      <Text x={CHART_WIDTH - CHART_PADDING} y={axisY + 14} textAnchor="end" style={{ fontSize: 8, fill: '#6b7280' }}>
        {dateFormatter(lastDate)}
      </Text>
      <Text x={CHART_PADDING - 4} y={CHART_PADDING + 4} textAnchor="end" style={{ fontSize: 8, fill: '#6b7280' }}>
        {maxValue}
      </Text>
      <Text x={CHART_PADDING - 4} y={axisY} textAnchor="end" style={{ fontSize: 8, fill: '#6b7280' }}>
        {minValue}
      </Text>
    </Svg>
  )
}

const ReportDocument = ({
  reportTitle,
  generatedAtLabel,
  interpretationTitle,
  interpretationDescription,
  interpretationCardTitle,
  interpretationCardText,
  interpretationCalculation,
  interpretationOutside,
  status,
  badgeLabels,
  graphHeading,
  graphDescription,
  chartData,
  testHistoryHeading,
  testNbLabel,
  testedLabel,
  testValueLabel,
  tableRows,
}: ReportDocumentProps) => {
  const statusColors = getStatusColors(status)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{reportTitle}</Text>
          <Text style={styles.subtitle}>{generatedAtLabel}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{interpretationTitle}</Text>
          <Text style={styles.sectionDescription}>{interpretationDescription}</Text>
          <View style={[styles.card, { backgroundColor: statusColors.background, borderLeftColor: statusColors.border }]}>
            <Text style={styles.cardTitle}>{interpretationCardTitle}</Text>
            <Text style={styles.cardText}>{interpretationCardText}</Text>
          </View>
          <View style={[styles.card, { backgroundColor: statusColors.background, borderLeftColor: statusColors.border }]}>
            <Text style={styles.cardText}>{interpretationCalculation}</Text>
            {interpretationOutside ? (
              <Text style={styles.cardText}>{interpretationOutside}</Text>
            ) : null}
          </View>
          <View style={styles.badgeRow}>
            <Text style={[styles.badge, { backgroundColor: '#e2e8f0', color: '#1e293b' }]}>
              {badgeLabels.noAnswer}
            </Text>
            <Text style={[styles.badge, { backgroundColor: '#fed7aa', color: '#9a3412' }]}>
              {badgeLabels.newTestRequired}
            </Text>
            <Text style={[styles.badge, { backgroundColor: '#fecaca', color: '#991b1b' }]}>
              {badgeLabels.signOnUse}
            </Text>
            <Text style={[styles.badge, { backgroundColor: '#bbf7d0', color: '#166534' }]}>
              {badgeLabels.noNewUse}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{graphHeading}</Text>
          <Text style={styles.sectionDescription}>{graphDescription}</Text>
          {chartData.length < 2 ? (
            <Text style={styles.emptyState}>{graphDescription}</Text>
          ) : (
            <View style={{ marginTop: 10 }}>
              <ReportChart chartData={chartData} />
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{testHistoryHeading}</Text>
          <View style={styles.table}>
            <View style={styles.tableHeaderRow}>
              <Text style={[styles.tableCellNumber, styles.tableHeaderCell]}>{testNbLabel}</Text>
              <Text style={[styles.tableCellDate, styles.tableHeaderCell]}>{testedLabel}</Text>
              <Text style={[styles.tableCellValue, styles.tableHeaderCell]}>{testValueLabel}</Text>
            </View>
            {tableRows.map((row) => (
              <View key={row.testNumber} style={styles.tableRow}>
                <Text style={styles.tableCellNumber}>{row.testNumber}</Text>
                <Text style={styles.tableCellDate}>{row.dateLabel}</Text>
                <Text style={styles.tableCellValue}>{row.valueLabel}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default ReportDocument
