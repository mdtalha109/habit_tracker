export class Habit {
  constructor(
    public id: string,
    public name: string,
    public tracking_type: 'Daily' | 'Weekly',
    public frequency: number,
    public streak: number = 0,
    public longest_streak: number = 0,
    public last_completed_at: Date | null = null,
    public selected_days: number[],
    public created_at: string,
    public user_id: string,
    public completed_dates: string[] = [],
    public frequency_history: { date: string; frequency: number }[] = []

  ) { }

  // Check whether the habit is scheduled for that particular day
  isAvailableOn(date: Date): boolean {
    if (this.normalizeDate(new Date(this.created_at)) > this.normalizeDate(date)) {
      return false;
    }

    const dayOfWeek = date.getDay();
    if (!this.selected_days.includes(dayOfWeek)) {
      return false;
    }

    return true;
  }

  // Update the frequency and maintain a history to track the status of the habit over time
  updateFrequency(newFrequency: number, date: Date): void {
    const targetDate = this.normalizeDate(date);

    this.frequency_history = this.frequency_history.filter(change => {
        const changeDate = this.normalizeDate(new Date(change.date));
        return changeDate.getTime() !== targetDate.getTime();
    });

    this.frequency_history.push({
      date: date.toISOString(),
      frequency: newFrequency
    });

    this.frequency = newFrequency;
}

  markAsDone(date: Date): void {

    if (!this.isAvailableOn(date)) {
      throw new Error("Habit is not available on this date");
    }

    const targetDate = this.normalizeDate(date);
    const completedToday = this.getTimesCompletedOn(targetDate);
    const frequency = this.getFrequencyOn(date);

    if (this.tracking_type === 'Daily' && completedToday < frequency) {
      this.completed_dates.push(date.toISOString());
      this.last_completed_at = new Date(date);

      if (completedToday + 1 == frequency) {
        this.updateStreak(targetDate);
      }

    } else if (this.tracking_type === 'Weekly') {

      const startOfWeek = this.getStartOfWeek(date);
      const endOfWeek = this.getEndOfWeek(date);

      const completedThisWeek = this.completed_dates.filter(
        completedDate => {
          const normalizedDate = this.normalizeDate(new Date(completedDate));
          return normalizedDate >= startOfWeek && normalizedDate <= endOfWeek;
        }
      ).length;

      if (completedThisWeek < frequency) {

        this.completed_dates.push(date.toISOString());
        this.last_completed_at = new Date(date);

        // if (completedThisWeek + 1 == frequency) {
        this.updateWeeklyStreak(targetDate);
        //}

      }
    }
  }

  isCompleted(date: Date): boolean {

    if (this.tracking_type == 'Daily') {
      return this.isCompletedOn(date)
    }
    else return this.isCompletedForWeek(date)
  }

  getRemainingCount(date: Date): number {

    if (this.tracking_type === 'Daily') {
      return this.getRemainingDailyCount(date);
    }

    else if (this.tracking_type === 'Weekly') {
      return this.getRemainingWeeklyCount(date);
    }

    return 0
  }

  private getRemainingDailyCount(date: Date): number {
    const targetDate = this.normalizeDate(date);
    const completedToday = this.getTimesCompletedOn(targetDate);
    const frequency = this.getFrequencyOn(targetDate);
    return Math.max(0, frequency - completedToday);
  }

  private getRemainingWeeklyCount(date: Date): number {
    const weekStart = this.getStartOfWeek(date);
    const weekEnd = this.getEndOfWeek(date);

    const completedThisWeek = this.completed_dates
      .map(completedDate => new Date(completedDate))
      .filter(completedDate => completedDate >= weekStart && completedDate <= weekEnd)
      .length;

    const frequency = this.getFrequencyOn(date);
    return Math.max(0, frequency - completedThisWeek);
  }

  // Check whether the habit was completed for that day in the case of a daily schedule
  isCompletedOn(date: Date): boolean {
    const targetDate = this.normalizeDate(date);
    const completedToday = this.getTimesCompletedOn(targetDate);

    return completedToday >= this.getFrequencyOn(targetDate);
  }

  //  Check whether the habit was completed for that week in the case of a weekly schedule.
  isCompletedForWeek(date: Date): boolean {
    const startOfWeek = this.getStartOfWeek(date);
    const endOfWeek = this.getEndOfWeek(date);

    const completedThisWeek = this.completed_dates.filter(
      completedDate => {
        const normalizedDate = this.normalizeDate(new Date(completedDate));
        return normalizedDate >= startOfWeek && normalizedDate <= endOfWeek;
      }
    ).length;

    return completedThisWeek >= this.getFrequencyOn(date);
  }
  //  Check how many times the user has performed that habit on a particular day.
  getTimesCompletedOn(date: Date): number {
    const targetDate = this.normalizeDate(date);
    return this.completed_dates.filter(
      completedDate => this.normalizeDate(new Date(completedDate)).getTime() === targetDate.getTime()
    ).length;
  }

  // just return date with month and year
  normalizeDate(inputDate: Date): Date {
    return new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
  }

  public getFrequencyOn(date: Date): number {
    const sortedHistory = this.frequency_history
      .map(change => ({
        ...change,
        date: new Date(change.date)
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    const targetDate = this.normalizeDate(date);

    if (this.tracking_type === 'Weekly') {

      const startOfWeek = this.getStartOfWeek(targetDate);
      const endOfWeek = this.getEndOfWeek(targetDate);

      const relevantChange = sortedHistory
        .filter(change => {
          const changeDate = this.normalizeDate(change.date);
          return changeDate >= startOfWeek && changeDate <= endOfWeek;
        })
        .pop();

      return relevantChange ? relevantChange.frequency : this.frequency;
    } else {
      // For Daily habits
      const relevantChange = sortedHistory
        .filter(change => this.normalizeDate(change.date) <= targetDate)
        .pop();

     

      return relevantChange ? relevantChange.frequency : this.frequency;
    }
  }

  updateStreak(date: Date): void {
    const yesterday = new Date(date);
    yesterday.setDate(date.getDate() - 1);

    while (!this.isAvailableOn(yesterday)) {
      if (yesterday < new Date(this.created_at)) {
        this.streak = 1;
        this.longest_streak = Math.max(this.streak, this.longest_streak);
        return;
      }
      yesterday.setDate(yesterday.getDate() - 1);
    }

    if (this.isCompletedOn(yesterday)) {
      this.streak += 1;
    } else {
      this.streak = 1;
    }


    this.longest_streak = Math.max(this.streak, this.longest_streak);
  }

  updateWeeklyStreak(date: Date): void {
    const startOfWeek = this.getStartOfWeek(date);
    // const endOfWeek = this.getEndOfWeek(date);

    if (this.isHabitCreatedThisWeek(startOfWeek)) {
      
        this.streak = this.streak + 1;
        this.longest_streak = Math.max(this.streak, this.longest_streak);
    
    } else {

        const lastWeek = new Date(startOfWeek);
        lastWeek.setDate(startOfWeek.getDate() - 7);

        if (this.isWeekStreakMaintained(lastWeek)) {
          this.streak += 1;
        } else {
          this.streak = 1;
        }

        this.longest_streak = Math.max(this.streak, this.longest_streak);
   
    }
  }

  isHabitCreatedThisWeek(startOfWeek: Date): boolean {
   
    const habitCreationDate = this.normalizeDate(new Date(this.created_at));
    return habitCreationDate >= startOfWeek;
}

  isWeekStreakMaintained(date: Date): boolean {
    const startOfWeek = this.getStartOfWeek(date);
    const endOfWeek = this.getEndOfWeek(date);

    const completedInWeek = this.completed_dates.filter(
      completedDate => {
        const normalizedDate = this.normalizeDate(new Date(completedDate));
        return normalizedDate >= startOfWeek && normalizedDate <= endOfWeek;
      }
    ).length;

    return completedInWeek >= this.getFrequencyOn(date);
  }

  private getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - day);
    return this.normalizeDate(startOfWeek);
  }

  private getEndOfWeek(date: Date): Date {
    const day = date.getDay();
    const endOfWeek = new Date(date);
    endOfWeek.setDate(date.getDate() + (6 - day));
    return this.normalizeDate(endOfWeek);
  }
}


export interface DailySettings {
  schedule: Set<number>;
}

export interface WeeklySettings {
  targetPerWeek: number
}

export type HabitTrackingType = 'Daily' | 'Weekly';
