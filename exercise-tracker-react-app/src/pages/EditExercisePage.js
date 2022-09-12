import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function EditExercisePage({ exerciseToEdit }) {
    const [name, setName]     = useState(exerciseToEdit.name);
    const [reps, setReps]     = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit]     = useState(exerciseToEdit.unit);
    const [date, setDate]     = useState(exerciseToEdit.date);
    const history = useHistory();

    const editExercise = async () => {
        const updatedExercise = {name, reps, weight, unit, date};
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedExercise),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 200) {
            alert("Exercise has been successfully updated!");
        } else {
            alert(`Failed to update exercise - exited with status code ${response.status}`);
        }
        history.push('/');
    }

    return (
        <div>
            <fieldset>
                <label>Exercise:</label> 
                <input
                    value={name}
                    placeholder="Squats"
                    type="text"
                    onChange={e => setName(e.target.value)}
                />

                <label>Reps:</label> 
                <input
                    value={reps}
                    placeholder="5-8"
                    type="number"
                    min="0"
                    onChange={e => setReps(e.target.value)}
                />

                <label>Weight:</label> 
                <input
                    value={weight}
                    placeholder="100"
                    type="number"
                    min="0"
                    onChange={e => setWeight(e.target.value)}
                />

                <label>Unit:</label> 
                <select
                    value={unit}
                    onChange={e => setUnit(e.target.value)}>
                    <option value="kgs">kgs</option>
                    <option value="lbs">lbs</option>
                </select>

                <label>Date:</label> 
                <input
                    value={date}
                    placeholder="MM-DD-YY"
                    type="text"
                    onChange={e => setDate(e.target.value)}
                />

                <button onClick={editExercise}> Save </button>
            </fieldset>
        </div>
    )
};
