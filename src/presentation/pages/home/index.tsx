import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import AuthContext, { AuthContextType } from 'presentation/context/authContext'
import { DateNavigator } from '../../components/DateNavigatior'
import { FaPlus } from 'react-icons/fa'
import { useDateNavigation } from '../../hooks/useDateNavigation'
import Button from 'presentation/components/ui/Button'

import Modal from 'presentation/components/ui/Modal'
import HabitForm from 'presentation/components/Habit/HabitForm'
import HabitList from 'presentation/components/Habit/HabitList'
import { useHabits } from 'presentation/context/habitContext'
import HabitNotFound from 'presentation/components/Habit/HabitNotFound'
import { Habit } from 'domain/entities/habit'

import HabitListSkeleton from 'presentation/components/Habit/HabitListSkeleton'
import './index.css'

export function formatDate(currentDate) {
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  const [day, month, date] = formattedDate.split(' ');
  return { day, date, month, year: currentDate.getFullYear() };
}

const HomePage = () => {
  const { currentUser }: AuthContextType = useContext(AuthContext)
  const { dates, currentDateIndex, navigateDates, selectDate } = useDateNavigation();
  const [loadingHabit, setLoadingHabit] = useState(false)

  const [editingHabit, setEditingHabit] = useState<Partial<Habit> | undefined>(undefined);

  const [showForm, setShowForm] = useState(false)

  const { getAllHabits, addHabit, filterHabitsByDate, markHabitAsDone, updateHabitSet } = useHabits();

  useEffect(() => {
    const fetchHabits = async () => {
      if (!currentUser?.id) return;

      setLoadingHabit(true);
      try {
        await getAllHabits(currentUser.id);
      } catch (error) {
        console.error("Error fetching habits:", error);
      } finally {
        setLoadingHabit(false);
      }
    };

    fetchHabits();
  }, [currentUser?.id]);



  const filteredHabits = filterHabitsByDate(dates[currentDateIndex]);

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setShowForm(true);
  };

  const handleFormSubmit = async (habit: Partial<Habit>, freqChanged = false, effectiveDate) => {
    if (editingHabit && habit.id) {

      let abc = updateHabitSet(habit.id, habit, freqChanged, effectiveDate);
      await toast.promise(abc, {
        loading: 'hold on, we are saving your update',
        success: 'habit updated successfully',
        error: 'ops! Please try again',
      });
      setShowForm(false);
      setEditingHabit(undefined)
    } else {

      let addedHabit = addHabit(habit);

      await toast.promise(addedHabit, {
        loading: 'hold on, we are creating your habit',
        success: 'habit created successfully',
        error: 'ops! Please try again',
      });
      setShowForm(false);
    }

    setEditingHabit(undefined);

  };


  return (
    <div className='flex flex-col gap-8'>
      <div className='mt-4 md:mt-8'>
        <h1 className='text-2xl md:text-4xl font-bold'> Hey, {currentUser?.username} 👋</h1>
        <p className='text-primary_muted mt-2'>Success is built on daily habits.</p>
      </div>
      <DateNavigator
        dates={dates.map(formatDate)}
        currentDateIndex={currentDateIndex}
        onNavigate={navigateDates}
        onSelect={selectDate}
      />

      <div>
        {filteredHabits?.length > 0 ? (
          <>
            <h1 className='text-2xl font-bold'>Today Task</h1>
            <HabitList
              habits={filteredHabits}
              markHabitAsDone={markHabitAsDone}
              selectedHabitDate={dates[currentDateIndex]}
              onEditHabit={handleEditHabit}
            />
          </>
        ) : (
          loadingHabit ? <HabitListSkeleton /> : <HabitNotFound />
        )}
      </div>

      <Button
        onClick={() => setShowForm(true)}
        className='fixed bottom-10 right-10 md:bottom-20 md:right-20 text-2xl rounded-full p-4'
        variant='primary-raised'>
        <FaPlus />
      </Button>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <Modal.Body>
          <HabitForm 
            habit={editingHabit} 
            selectedHabitDate={dates[currentDateIndex]}
            handleSubmit={(habit, freqChanged, effectiveDate) => handleFormSubmit(habit, freqChanged, effectiveDate)} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default HomePage