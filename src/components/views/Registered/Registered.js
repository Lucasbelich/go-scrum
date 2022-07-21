import { useParams } from 'react-router-dom'

const Registered = () => {
  const { teamID } = useParams()
  return (
    <div className="container">
      El team ID de tu equipo es {teamID}
    </div>
  )
}

export default Registered
