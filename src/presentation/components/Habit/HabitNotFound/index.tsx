
import calendar from 'application/assets/images.png'
import { useTranslation } from 'react-i18next'

const HabitNotFound = () => {
  const {t: translate} = useTranslation()
  return (
    <div className='text-center flex flex-col items-center gap-8 mt-24'>
        <div>
         <img className='w-28' src={calendar} alt="Calendar"/>
        </div>
        
        <div className='text-primary_muted'>
            <p >{translate('habit.no_habit_scheduled_message')}</p>
            <p>{translate('habit.try_adding_new_habits')}</p>
        </div>
    </div>
    
  )
}

export default HabitNotFound