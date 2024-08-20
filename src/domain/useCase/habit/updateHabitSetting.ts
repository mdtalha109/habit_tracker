import { Habit } from "domain/entities/habit";
import { FirebaseHabitRepository } from "infrastructure/repositories/habit/habitRepository";

export class updateHabitSetting {
  constructor(private habitRepository: FirebaseHabitRepository) { }

  async execute(_habitId: string, habit: Habit, effectiveDate, changedFreq=false): Promise<void> {
   
    if(changedFreq){
      habit.updateFrequency(habit.frequency, new Date(effectiveDate))
    }
    
    await this.habitRepository.updateHabit(habit);
  }
}
