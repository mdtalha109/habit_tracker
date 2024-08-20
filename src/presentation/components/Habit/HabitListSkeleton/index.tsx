import HabitItemSkeleton from "./HabitItemSkeleton"

const HabitListSkeleton = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <HabitItemSkeleton/>
        <HabitItemSkeleton/>
        <HabitItemSkeleton/>
        <HabitItemSkeleton/>
    </div>
  )
}

export default HabitListSkeleton