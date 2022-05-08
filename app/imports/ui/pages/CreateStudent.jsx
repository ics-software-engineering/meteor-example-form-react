import React from 'react';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
// Must use destructuring import to avoid https://github.com/vazco/uniforms/issues/433
import {
  AutoForm, TextField, DateField, LongTextField,
  RadioField, SelectField, SubmitField,
} from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { StudentFormSchema as formSchema, gpa2Number } from '../forms/StudentFormInfo';
import { StudentData } from '../../api/studentdata/StudentData';
import { EnrollmentData } from '../../api/enrollmentdata/EnrollmentData';

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class CreateStudent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: false };
  }

  /** On submit, try to insert the data. If successful, reset the form. */
  submit(data, formRef) {
    let insertError;
    const { name, email, bio, level, gpa, enrolled, hobbies, major } = data;
    StudentData.insert({ name, email, bio, level, gpa: gpa2Number(gpa), hobbies, major },
      (error) => { insertError = error; });
    if (insertError) {
      swal('Error', insertError.message, 'error');
    } else {
      EnrollmentData.insert({ email, enrolled },
        (error) => { insertError = error; });
      if (insertError) {
        swal('Error', insertError.message, 'error');
      } else {
        swal('Success', 'The student record was created.', 'success');
        this.setState({ email });
        formRef.reset();
      }
    }
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
      <Container>
        <Row className="justify-content-center">
          <Col>
            <h2 className="text-center">Create Student</h2>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <Card>
                <Row>
                  <Col><TextField name='name' showInlineError={true} placeholder={'Your name'}/></Col>
                  <Col><TextField name='email' showInlineError={true} placeholder={'Your email'}/></Col>
                </Row>
                <LongTextField name='bio' showInlineError={true} placeholder={'A bit about you'}/>
                <Row>
                  <Col><SelectField name='level' showInlineError={true}/></Col>
                  <Col><SelectField name='gpa' showInlineError={true} placeholder={'Select one'}/></Col>
                  <Col><DateField name='enrolled' showInlineError={true}/></Col>
                </Row>
                <SelectField name='hobbies' showInlineError={true} placeholder={'Select hobbies (optional)'} multiple/>
                <RadioField name='major' inline showInlineError={true}/>
                <SubmitField value='Submit'/>
              </Card>
            </AutoForm>
            {this.state.email ? <Alert>Edit <a href={`/#/student/${this.state.email}`}>this data</a></Alert> : ''}</Col>
        </Row>
      </Container>
    );
  }
}

export default CreateStudent;
