"use client"

import { ChartArea, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { format, formatDistance } from "date-fns"
import { useDatapointsStore } from "@/app/_store"
import { useEffect, useState } from "react"
import { lte, pick, uniq } from "lodash"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { Progress } from "@/components/ui/progress"

type DataPoint = {
  id: any
  value: number
  date: Date
  answerTitle: string
  answerBorder: string
}

type TransformedData = Pick<DataPoint, 'date' | 'value'>

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig


const ChartResult = () => {
  const {datapoints} = useDatapointsStore()
  const [data, setData] = useState<TransformedData[]>([]) 
  const t = useTranslations()


  useEffect(() => {
    // Transform datapoints and pick only 'date' and 'value'
    const _transformedData = datapoints.map((item) =>
      pick(item, ['date', 'value'])
    ) as TransformedData[]

    setData(_transformedData)
  }, [datapoints])


  const dateFormatter = (date: Date) => {
    return format(date, "MMM dd")
  }

  const calcDatePeriod = () => {
    if (lte(data.length, 1) ) return 
    return formatDistance(data[0]?.date, data[data.length - 1]?.date)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('graph_heading')}</CardTitle>
        <CardDescription>
          { lte(data.length, 1) ?
            t('add_to_tests')
            :
            t('graph_description', {date: calcDatePeriod()})
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
         <Card className={cn(
          "flex absolute right-0 left-0 bottom-0 top-0 h-fit w-full mx-auto my-auto z-10 shadow-none border-none justify-center ",
         {"hidden": lte(2, datapoints.length )}
         )}>
          <CardHeader className="font-medium flex flex-col items-center gap-2 w-full">
            <ChartArea size={32} className="text-muted-foreground" />
            <p> { datapoints.length < 1 ? t('add_to_tests') : t('add_one_more') } </p>
            <Progress value={datapoints.length * 50} max={2} /> 

          </CardHeader>
        </Card>
        <ChartContainer config={chartConfig} className={cn(
          "relative visible ",
          {'invisible': lte(datapoints.length, 1)}
        )}>
            <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickMargin={8}
              scale="time"
              type="number"
              ticks={data
                .map((item) => (item?.date ? new Date(item.date).getTime() : null))
                .filter((timestamp) => timestamp !== null)} // Filter out invalid timestamps
              tickFormatter={(timestamp) => {
                const date = new Date(timestamp);
                return isNaN(date.getTime()) ? '' : dateFormatter(date);
              }}
              domain={[
                data[0]?.date ? new Date(data[0].date).getTime() : 'dataMin',
                data[data.length - 1]?.date
                  ? new Date(data[data.length - 1].date).getTime()
                  : 'dataMax',
              ]}
            />
            <YAxis
              domain={['dataMin - 5', 'dataMax + 10']} 
              tickLine={false}
              axisLine={false}
              ticks={uniq(data.map((item) => item.value))}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
             <Line
              dataKey="value"
              type={'linear'}
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
            </Line>
            </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


export default ChartResult
