import { PrayerTimes } from '@/actions/sholat'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { CalendarCheck, CalendarDays, Clock, Map } from 'lucide-react'
import Time from './time'

type TodayCardProps = Omit<PrayerTimes, 'timings'>

export default function TodayCard({ date, meta }: TodayCardProps) {
  return (
    <div className="grid grid-cols-2 text-sm sm:text-base gap-3 *:flex *:items-center *:gap-2">
      <div>
        <Clock className="w-5" />
        <Time />
      </div>
      <div>
        <Map className="w-5" /> {meta.timezone}
      </div>
      <div>
        <CalendarCheck className="w-5" />
        {format(new Date(), 'dd MMMM yyyy', { locale: id })}
      </div>
      <div>
        <CalendarDays className="w-5" /> {date.hijri.day} {date.hijri.month.en}{' '}
        {date.hijri.year}
      </div>
    </div>
  )
}
