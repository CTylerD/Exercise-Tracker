import { MdDelete, MdEdit } from 'react-icons/md'

export default function ExerciseRow({ exercise, onDelete, onEdit }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><MdEdit className="icon" onClick={ () => onEdit(exercise) }/></td>
            <td><MdDelete className="icon" onClick={ () => onDelete(exercise._id) }/></td>
        </tr>
    )
}
