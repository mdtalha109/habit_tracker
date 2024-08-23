import { Habit } from "domain/entities/habit";
import { FirebaseHabitRepository } from "infrastructure/repositories/habit/habitRepository";

export class MarkHabitAsDone {
  constructor(private habitRepository: FirebaseHabitRepository) { }

  async execute(habitId: string, date: Date): Promise<void> {
    const habitData = await this.habitRepository.getHabitById(habitId);

    const habit = new Habit(
      habitId,
      habitData.name,
      habitData.tracking_type,
      habitData.frequency,
      habitData.streak,
      habitData.longest_streak,
      habitData.last_completed_at,
      habitData.selected_days,
      habitData.created_at,
      habitData.user_id,
      habitData.completed_dates,
      habitData.frequency_history
    );

    if (!habit.isCompletedOn(date)) {
      habit.markAsDone(date);
      await this.habitRepository.updateHabit(habit);
    } else{
      throw new Error('This habit has already been completed for today.');
    }
  }
}
