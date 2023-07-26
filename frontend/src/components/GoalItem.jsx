import { useDispatch } from 'react-redux'
import { deleteGoal} from '../features/goal/goalSlice'
import {AiFillEdit} from 'react-icons/ai'

function GoalItem({currentId, setCurrentId, goal }) {
  const dispatch = useDispatch()

  const selectPost = (e) => {
    setCurrentId(goal._id);
  };

  return (
    <div className='goal'>
      <div>{new Date(goal.updatedAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        X
      </button>
      <button onClick={() => selectPost()} className='edit'>  
      <AiFillEdit/>
      </button>
    </div>
  )
}

export default GoalItem