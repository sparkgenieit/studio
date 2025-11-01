
"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Car } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const dailyMoments = [
  { id: 'DVI102025200', status: 'Arrival' },
  { id: 'DVI102025201', status: 'On-route' },
  { id: 'DVI102025202', status: 'Departed' },
]

export function DailyMomentCard() {
  const [date, setDate] = React.useState<Date>(new Date('2025-11-01T00:00:00'))

  return (
    <Card className="shadow-sm rounded-2xl h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-bold font-headline">Daily Moment</CardTitle>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[200px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dailyMoments.map((moment, index) => (
            <React.Fragment key={moment.id}>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-accent/10">
                  <Car className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-primary">{moment.id}</p>
                </div>
                <p className="text-sm font-medium text-muted-foreground">{moment.status}</p>
              </div>
              {index < dailyMoments.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
