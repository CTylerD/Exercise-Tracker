import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable';

export default function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    useEffect(() => loadExercises(), []);

    const onDelete = async (_id) => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if (response.status === 204) {
            setExercises(exercises.filter(e => e._id !== _id));
        } else {
            console.error(`Failed to delete exercise - exited with status code ${response.status}`)
        }
    };

    const onEdit = (exercise) => {
        setExerciseToEdit(exercise);
        history.push('/edit');
    };

    return (
    <>
        <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}/>
        <Link id="createNewLink" to='/create'>Click here to create an exercise</Link>
    </>
    )
}
