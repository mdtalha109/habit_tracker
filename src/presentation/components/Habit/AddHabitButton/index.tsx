import { Button } from "presentation/components/ui";
import { FaPlus } from "react-icons/fa";

const AddHabitButton = ({ onClick }) => (
    <Button
      onClick={onClick}
      className='fixed bottom-10 right-10 md:bottom-20 md:right-20 text-2xl rounded-full p-4'
      variant='primary-raised'>
      <FaPlus />
    </Button>
  );
  

export default AddHabitButton