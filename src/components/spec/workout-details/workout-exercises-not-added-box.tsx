import { Info } from "lucide-react"

const WorkoutExercisesNotAddedBox = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
        <Info />
        <p>No exercises in this workout.</p>
    </div>
  )
}

export default WorkoutExercisesNotAddedBox