import { Habit } from "domain/entities/habit";
import { HabitRepository } from "domain/interface/habitRepository";

export class CreateHabit {
  constructor(private habitRepository: HabitRepository) {}

  async execute(habit: Habit): Promise<void> {
    habit.created_at = new Date().toISOString();
    habit.streak = 0;
    habit.longest_streak = 0;
    habit.last_completed_at = null;
    habit.completed_dates = [],
    habit.frequency_history = [{
      date: new Date().toISOString(),
      frequency: habit.frequency
    }],
    await this.habitRepository.save(habit);
  }
}
