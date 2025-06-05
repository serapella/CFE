'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { Calendar as CalendarPrimitive } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar = React.forwardRef<
  React.ElementRef<typeof CalendarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CalendarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CalendarPrimitive.Root
    ref={ref}
    className={cn("p-3", className)}
    {...props}
  />
));
Calendar.displayName = 'Calendar';

export { Calendar };
