import React, { useState } from 'react';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import {
  AutoForm, DateField, TextField, LongTextField, RadioField, SelectField, SubmitField,
} from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { StudentFormSchema as formSchema, gpa2Number } from '../forms/StudentFormInfo';
import { StudentData } from '../../api/studentdata/StudentData';
import { EnrollmentData } from '../../api/enrollmentdata/EnrollmentData';

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the Page for adding a document. */
const CreateStudent = () => {
  const [emailState, setEmailState] = useState('');

  /* On submit, try to insert the data. If successful, reset the form. */
  const submit = (data, formRef) => {
    let insertError;
    const {
      name, email, bio, level, gpa, enrolled, hobbies, major,
    } = data;
    StudentData.insert(
      {
        name, email, bio, level, gpa: gpa2Number(gpa), hobbies, major,
      },
      (error) => { insertError = error; },
    );
    if (insertError) {
      swal('Error', insertError.message, 'error');
    } else {
      EnrollmentData.insert({ email, enrolled }, (error) => { insertError = error; });
      if (insertError) {
        swal('Error', insertError.message, 'error');
      } else {
        swal('Success', 'The student record was created.', 'success');
        setEmailState(email);
        formRef.reset();
      }
    }
  };

  // Put a space before the label for the Hobbies SelectField.
  const transform = (label) => ` ${label}`;

  /* Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  let fRef = null;
  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <h2 className="text-center">Create Student</h2>
          <AutoForm ref={(ref) => { fRef = ref; }} schema={bridge} onSubmit={(data) => submit(data, fRef)}>
            <Card className="p-2">
              <Row>
                <Col><TextField name="name" showInlineError placeholder="Your name" /></Col>
                <Col><TextField name="email" showInlineError placeholder="Your email" /></Col>
              </Row>
              <LongTextField name="bio" showInlineError placeholder="A bit about you" />
              <Row>
                <Col>
                  <SelectField
                    name="level"
                    showInlineError
                    help="What is your level? (required)"
                    helpClassName="text-danger"
                  />
                </Col>
                <Col>
                  <SelectField name="gpa" showInlineError help="Select one (required)" helpClassName="text-danger" />
                </Col>
                <Col><DateField name="enrolled" showInlineError type="date" /></Col>
              </Row>
              <SelectField
                name="hobbies"
                showInlineError
                help="Select hobbies (optional)"
                multiple
                checkboxes
                inline
                labelClassName="px-2"
                inputClassName="px-1"
                transform={transform}
              />
              <RadioField
                name="major"
                inline
                showInlineError
                help="What is your major? (required)"
                helpClassName="text-danger"
                labelClassName="px-2"
              />
              <SubmitField value="Submit" />
            </Card>
          </AutoForm>
          {emailState ? (
            <Alert className="py-2">
              <a href={`/student/${emailState}`}>Edit this data</a>
            </Alert>
          ) : ''}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateStudent;
