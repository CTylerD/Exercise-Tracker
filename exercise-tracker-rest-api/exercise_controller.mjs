import express from 'express';
import * as exercises from './exercise_model.mjs';

const app = express();
app.use(express.json());
const PORT = 3000;

/*
Create exercise
Create a new exercise with the name, reps, weight, unit, and date attributes 
in the query request parameters
*/
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    .then(exercise => {
    res.status(201).json(exercise);
    })
    .catch(error => {
    console.error(error);
    res.status(400).json({ Error: 'Request failed' })
    });
});

/*
Retrieve exercise(s)
Retrieve all exercise with attributes that match the given query parameters
If no valid parameters are given, return all exercises
*/
app.get('/exercises', (_, res) => {
    exercises.findExercises({}, '', 0)
    .then(exercise => { res.json(exercise) })   // default status code is 200
    .catch(error => { 
    console.error(error) 
    res.status(400).json( { Error: 'Request failed' } )
    });
});

/*
Update exercise
Updates the exercise information with the given _id to the
values in the provided query parameters
 */
app.put('/exercises/:id', (req, res) => {
    const args = { _id: req.params.id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date };
    exercises.replaceExercise(args)
    .then(nModified => {
        if (nModified === 0){
            res.status(404).json({ Error: 'Resource not found' }) 
        } else {
            res.json(args)
        }
    })
    .catch(error => {
        console.error(error)
        res.status(400).json({ Error: 'Request failed' })
    });
});

/*
Delete exercise
Delete the exercise whose id matches the given id query filter
*/
app.delete('/exercises/:id', (req, res) => {
    exercises.deleteExercise(req.params.id)
    .then(deletedCount => {
    if (deletedCount === 0) {
        res.status(404).json({ Error: 'Resource not found' });
    } else {
        res.status(204).send();
    }
    })
    .catch(error => {
    console.error(error);
    res.status(400).json({ Error: 'Request failed' });
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
