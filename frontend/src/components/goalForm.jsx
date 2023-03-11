import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createGoal, updateGoal} from '../features/goal/goalSlice'


function GoalForm({ currentId, setCurrentId }) {
  const [text, setText] = useState('')
  const [data, setData] = useState({id: '', goal: ''})

  const goal = useSelector((state) =>
    currentId ? state.goal.goals.find((p) => p._id === currentId) : null
  )

  useEffect(() => {
    if (goal) setText(goal.text)
  }, [goal])
  
  
  useEffect(() => {
    setData({id: currentId, goal: text})
    
  },[currentId, text])


  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    if(currentId === 0){
      dispatch(createGoal({ text }))
      console.log(currentId)
      setText('')

    } else{
      setData({id: currentId, goal: text})
      dispatch(updateGoal({...data}))
      setText('')
      setCurrentId(0)

    }
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Goal</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add Goal
          </button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm