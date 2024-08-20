import { HabitRepository } from "domain/interface/habitRepository";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { Habit } from "domain/entities/habit";


export class FirebaseHabitRepository implements HabitRepository {

  async save(habit: Habit): Promise<void> {
    const habitsCollection = collection(db, "habits");
    habit.created_at = new Date(habit.created_at).toISOString()
    await addDoc(habitsCollection, habit);
  }

  async getAllHabits(user_id: string): Promise<Habit[]> {
    const habitsCollection = collection(db, "habits");
    const q = query(habitsCollection, where("user_id", "==", user_id));
    const querySnapshot = await getDocs(q);

    const habits: any = [];
    querySnapshot.forEach((doc) => {
      const data = {
        ...doc.data(),
        id: doc.id
      }
    
      habits.push(data);
    });
    return habits;
  }

  async updateHabit(habit: Habit): Promise<void> {
   
    const habitDocRef = doc(db, 'habits', habit.id);

    await updateDoc(habitDocRef, {
      streak: habit.streak,
      last_completed_at: habit.last_completed_at?.toISOString() || null,
      completed_dates: habit.completed_dates.map(date => date),
      selected_days: habit.selected_days,
      name: habit.name,
      tracking_type: habit.tracking_type,
      frequency: habit.frequency,
      frequency_history: habit.frequency_history,
      longest_streak: habit.longest_streak
    });
  }

  async getHabitById(habitId: string): Promise<Habit> {
   
    const habitDocRef = doc(db, 'habits', habitId);
    const habitDoc = await getDoc(habitDocRef);
  
    if (!habitDoc.exists()) {
      throw new Error('Habit not found');
    }

    const habitData = habitDoc.data();
    return habitData as Habit;
  }
  
}
