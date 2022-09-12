import mongoose from 'mongoose';

mongoose.connect(
    'mongodb://localhost:27017/exercises_db',
    { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
  });

const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
Create an exercise
@param {String} name
@param {Number} reps 
@param {Number} weight
@param {String} unit
@param {String} Date 
@returns A promise. Resolves to the JSON object for the document created by calling save
 */

const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    return exercise.save();
}

/**
Retrive exercises based on the filter, projection and limit parameters
@param {Object} filter 
@param {String} projection 
@param {Number} limit 
@returns 
*/
const findExercises = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

/**
Update the member properties of the Exercise with the id value provided to 
those within the provided request query
@param {String} name
@param {Number} reps 
@param {Number} weight
@param {String} unit
@param {String} Date 
@returns A promise. Resolves to the number of documents modified
 */
const replaceExercise = async ({ _id, name, reps, weight, unit, date} ) => {
    const result = await Exercise.replaceOne( { _id: _id }, { name: name, reps: reps, weight: weight, unit: unit, date: date } );
    console.log(result);
    return result.nModified;
}

/**
Delete an exercise whose id matches the given id in the request query
@param {Number} _id 
@returns A promise. Resolves to the count of deleted documents
*/
const deleteExercise = async (_id) => {
    const result = await Exercise.deleteOne( {_id: _id} );
    console.log(result);
    return result.deletedCount;
}

export { createExercise, findExercises, replaceExercise, deleteExercise };
