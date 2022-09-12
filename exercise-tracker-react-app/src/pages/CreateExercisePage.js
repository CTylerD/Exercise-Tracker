import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function CreateExercisePage() {
    const [name, setName]     = useState('');
    const [reps, setReps]     = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit]     = useState('');
    const [date, setDate]     = useState('');
    const history = useHistory();

    const createExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 201) {
            alert("Exercise has been successfully created!");
        } else {
            alert(`Failed to create exercise - exited with status code ${response.status}`);
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
                onChange={e => setUnit(e.target.value)}>
                <option value="select">Select:</option>
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

            <button onClick={createExercise}> Create </button>
            </fieldset>

        </div>
    )
}
