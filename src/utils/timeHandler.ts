import { DateTime } from 'luxon';
import { TimeCells } from '~/shared/data';

export function getWeekDates(year: number, weekNumber: number): DateTime[] {
  // Create a DateTime object for January 1st of the specified year
  const firstDayOfYear = DateTime.fromObject({ year, month: 1, day: 1 });

  // Find the first Monday of the year
  let firstMonday = firstDayOfYear;
  while (firstMonday.weekday !== 1) {
    firstMonday = firstMonday.plus({ days: 1 });
  }

  // Calculate the start date of the desired week by adding (weekNumber - 1) weeks to the first Monday
  const desiredWeekStartDate = firstMonday.plus({ weeks: weekNumber - 1 });

  // Generate an array of DateTime objects for all the days in the desired week
  const daysInWeek: DateTime[] = [];
  for (let i = 0; i < 7; i++) {
    daysInWeek.push(desiredWeekStartDate.plus({ days: i }));
  }

  return daysInWeek;
}

export function weeklyAvailConverter(sourceTz: string, targetTz: string, weeklyTimeSlot: any, weekDates: DateTime[]) {
  const [sourceFromHour, sourceFromMin] = TimeCells[weeklyTimeSlot.from_time].split(':');
  const [sourceToHour, sourceToMin] = TimeCells[weeklyTimeSlot.to_time].split(':');
  const sourceFromTime = weekDates[weeklyTimeSlot.day_of_week].set({
    hour: +sourceFromHour,
    minute: +sourceFromMin,
  });
  const sourceToTime = weekDates[weeklyTimeSlot.day_of_week].set({ hour: +sourceToHour, minute: +sourceToMin });

  const targetFromTime = sourceFromTime.setZone(sourceTz).setZone(targetTz);
  const targetToTime = sourceToTime.setZone(sourceTz).setZone(targetTz);

  if (targetFromTime.day === targetToTime.day) {
    return [
      {
        id: weeklyTimeSlot.id,
        coach_id: weeklyTimeSlot.coach_id,
        day_of_week: targetFromTime.weekday - 1,
        from_time: TimeCells.indexOf(targetFromTime.toFormat('HH:mm')),
        to_time: TimeCells.indexOf(targetToTime.toFormat('HH:mm')),
      },
    ];
  }
  if (targetFromTime.startOf('day') < targetToTime.startOf('day')) {
    return [
      {
        id: weeklyTimeSlot.id,
        coach_id: weeklyTimeSlot.coach_id,
        day_of_week: targetFromTime.weekday - 1,
        from_time: TimeCells.indexOf(targetFromTime.toFormat('HH:mm')),
        to_time: 48,
      },
      {
        id: weeklyTimeSlot.id,
        coach_id: weeklyTimeSlot.coach_id,
        day_of_week: targetToTime.weekday - 1,
        from_time: 0,
        to_time: TimeCells.indexOf(targetToTime.toFormat('HH:mm')),
      },
    ];
  }
  if (targetFromTime.startOf('day') > targetToTime.startOf('day')) {
    return [
      {
        id: weeklyTimeSlot.id,
        coach_id: weeklyTimeSlot.coach_id,
        day_of_week: targetToTime.weekday - 1,
        from_time: TimeCells.indexOf(targetToTime.toFormat('HH:mm')),
        to_time: 48,
      },
      {
        id: weeklyTimeSlot.id,
        coach_id: weeklyTimeSlot.coach_id,
        day_of_week: targetFromTime.weekday - 1,
        from_time: 0,
        to_time: TimeCells.indexOf(targetFromTime.toFormat('HH:mm')),
      },
    ];
  }
}

export function overAvailConverter(sourceTz: string, targetTz: string, overTimeSlot: any) {
  const fromTime = DateTime.fromISO(`${overTimeSlot.date}T${TimeCells[overTimeSlot.from_time]}`, {
    zone: sourceTz,
  }).setZone(targetTz);
  const toTime = DateTime.fromISO(`${overTimeSlot.date}T${TimeCells[overTimeSlot.to_time]}`, {
    zone: sourceTz,
  }).setZone(targetTz);

  if (fromTime.toFormat('yyyy-MM-dd') != toTime.toFormat('yyyy-MM-dd')) {
    if (fromTime > toTime) {
      return [
        {
          date: toTime.toFormat('yyyy-MM-dd'),
          from_time: TimeCells.indexOf(toTime.toFormat('HH:mm')),
          to_time: 48,
        },
        {
          date: fromTime.toFormat('yyyy-MM-dd'),
          from_time: 0,
          to_time: TimeCells.indexOf(fromTime.toFormat('HH:mm')),
        },
      ];
    } else if (fromTime < toTime) {
      return [
        {
          date: fromTime.toFormat('yyyy-MM-dd'),
          from_time: TimeCells.indexOf(fromTime.toFormat('HH:mm')),
          to_time: 48,
        },
        {
          date: toTime.toFormat('yyyy-MM-dd'),
          from_time: 0,
          to_time: TimeCells.indexOf(toTime.toFormat('HH:mm')),
        },
      ];
    }
  }

  return [
    {
      date: fromTime.toFormat('yyyy-MM-dd'),
      from_time: TimeCells.indexOf(fromTime.toFormat('HH:mm')),
      to_time: TimeCells.indexOf(toTime.toFormat('HH:mm')),
    },
  ];
}
