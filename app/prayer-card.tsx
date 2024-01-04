import { Timing } from '@/actions/sholat'
import { cn } from '@/utils/cn'
import { format } from 'date-fns'

type PrayerCardProps = Timing & {
  isActive?: boolean
}

export default function PrayerCard({ name, value, isActive }: PrayerCardProps) {
  return (
    <article
      className={cn(
        'p-3 rounded-lg relative shadow flex justify-between items-center',
        isActive && 'bg-primary text-primary-foreground mt-3',
      )}
    >
      {isActive && (
        <div className="absolute -top-3 bg-primary text-current px-1.5 py-1 rounded left-1/2 -translate-x-1/2 text-xs text-primary">
          Berikutnya
        </div>
      )}
      <h2>{name}</h2>
      <h3 className="text-xl">{format(value, 'HH:mm')}</h3>
    </article>
  )
}
