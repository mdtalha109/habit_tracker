import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const useHabitItem = ( habit, markHabitAsDone, selectedHabitDate) => {

    const {t: translate} = useTranslation()
    const timesLeft = habit.getRemainingCount(selectedHabitDate) 

    const habitDone = async () => {
        let habitMarkedAsDone = markHabitAsDone(habit.id, selectedHabitDate);

        await toast.promise(habitMarkedAsDone, {
            loading: 'Marking your habit as done',
            success: 'Habit updated successfully',
            error: (err) => `${err.message || 'ops! Please try again' }`,
        });
    }
    return {
   
        timesLeft,
        habitDone,
        translate
    }
}

export default useHabitItem