import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Define a Mongo collection to hold the data. */
const StudentData = new Mongo.Collection('StudentData');

const StudentDataValues = {
  hobbies: ['Surfing', 'Running', 'Biking', 'Paddling'],
  levels: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
  majors: ['Physics', 'Math', 'Chemistry', 'Computer Science'],
};

/** Define a schema to specify the structure of each document in the collection. */
const StudentDataSchema = new SimpleSchema({
  name: String,
  email: String,
  bio: { type: String, optional: true, defaultValue: '' },
  hobbies: { type: Array, optional: true },
  'hobbies.$': { type: String, allowedValues: StudentDataValues.hobbies },
  level: { type: String, allowedValues: StudentDataValues.levels },
  gpa: Number,
  major: String,
});

/** Attach the schema to the collection. */
StudentData.attachSchema(StudentDataSchema);

/** Make these objects available to others. */
export { StudentDataValues, StudentData, StudentDataSchema };
