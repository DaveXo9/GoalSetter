import {useEffect, useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux' 
import GoalForm from '../components/goalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals } from '../features/goal/goalSlice'
import { reset } from '../features/auth/authSlice'


function Dashboard() {
  const [currentId, setCurrentId] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const {user} = useSelector(state => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
     (state) => state.goal
   )
  useEffect(() => {
    if(isError){
      console.log(message)
    }
    if (user== null) { // if user is not logged in
      navigate('/login')
    } 
    if(location.pathname === '/'){
    dispatch(getGoals())
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if(isLoading) return <Spinner/>

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm currentId={currentId} setCurrentId={setCurrentId}  />
      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem currentId={currentId} setCurrentId={setCurrentId} key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>There are no goals</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard