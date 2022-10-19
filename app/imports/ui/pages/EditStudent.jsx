import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import {
  AutoForm, DateField, TextField, LongTextField, RadioField, SelectField, SubmitField,
} from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { _ } from 'meteor/underscore';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { StudentFormSchema as formSchema, gpa2String, gpa2Number } from '../forms/StudentFormInfo';
import { StudentData } from '../../api/studentdata/StudentData';
import { EnrollmentData } from '../../api/enrollmentdata/EnrollmentData';
import LoadingSpinner from '../components/LoadingSpinner';

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the Page for editing a document. */
const EditStudent = () => {
  // Get the email from the URL field. See imports/ui/layouts/App.jsx for the route containing :email.
  const { email } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker

  const { ready, studentDoc, enrollmentDoc } = useTracker(() => {
    // Request StudentData and Enrollment docs. Won't be locally available until ready() returns true.
    const studentDataSubscription = Meteor.subscribe('StudentData');
    const enrollmentDataSubscription = Meteor.subscribe('EnrollmentData');
    return {
      studentDoc: StudentData.findOne({ email }),
      enrollmentDoc: EnrollmentData.findOne({ email }),
      ready: studentDataSubscription.ready() && enrollmentDataSubscription.ready(),
    };
  }, []);

  /* On submit, try to insert the data. If successful, reset the form. */
  const submit = (data) => {
    let updateError;
    const studentId = studentDoc._id;
    const enrollmentId = enrollmentDoc._id;
    const { name, bio, level, gpa, enrolled, hobbies, major } = data;
    StudentData.update(studentId, { $set: { name, bio, level, gpa: gpa2Number(gpa), hobbies, major } }, (error) => {
      updateError = error;
    });
    if (updateError) {
      swal('Error', updateError.message, 'error');
    } else {
      EnrollmentData.update(enrollmentId, { $set: { enrolled } }, (error) => {
        updateError = error;
      });
      if (updateError) {
        swal('Error', updateError.message, 'error');
      } else {
        swal('Success', 'The student record was updated.', 'success');
      }
    }
  };

  const transform = (label) => ` ${label}`;

  /* If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  const model = _.extend({}, studentDoc, enrollmentDoc);
  model.gpa = gpa2String(model.gpa);
  return (ready) ? (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <h2 className="text-center">Edit Student</h2>
          <AutoForm schema={bridge} onSubmit={(data) => submit(data)} model={model}>
            <Card className="p-2">
              <Container>
                <Row>
                  <Col><TextField name="name" showInlineError placeholder="Your name" /></Col>
                  <Col><TextField name="email" showInlineError placeholder="Your email" disabled /></Col>
                </Row>
                <LongTextField name="bio" showInlineError placeholder="A bit about you" />
                <Row>
                  <Col><SelectField name="level" showInlineError /></Col>
                  <Col><SelectField name="gpa" showInlineError placeholder="Select one" /></Col>
                  <Col><DateField name="enrolled" showInlineError type="datetime-local" /></Col>
                </Row>
                <SelectField
                  name="hobbies"
                  showInlineError
                  help="Select hobbies (optional)"
                  multiple
                  checkboxes
                  inline
                  transform={transform}
                />
                <RadioField name="major" inline showInlineError labelClassName="px-2" />
                <SubmitField value="Update" />
              </Container>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditStudent;
