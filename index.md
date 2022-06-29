![](https://raw.githubusercontent.com/ics-software-engineering/meteor-example-form-react/main/doc/create-student-page.png)

meteor-example-form-react is a sample Meteor 2.7.1 application that illustrates how to use [Uniforms](https://uniforms.tools/) for form development.

Some features of this example: 

* In order to focus on form processing, the application has just two pages: Create Student and Edit Student.
* A variety of common controllers are shown: text box, text area, single selection, multiple selection, date selection, and radio boxes.
* Two customized versions of Uniform controllers illustrate how to extend the built-in Uniforms controllers.
* The forms in this example update two Mongo collections, illustrating the situation where there is not a one-to-one correspondence between the collection schema and the form schema.
* There is a 35 minute YouTube screencast providing a walkthrough of the code.

## Installation

First, [install Meteor](https://www.meteor.com/install).

Second, download this repository to your computer. You can download it as a zip file, or you can click the "Use as template" button to create your own copy of the system, then clone it to your local computer.

Third, cd into the app/ directory of your local copy of the repo, and install third party libraries with:

```
$ meteor npm install
```

## Running the system

Once the libraries are installed, you can run the application by invoking the "start" script in the [package.json file](https://github.com/ics-software-engineering/meteor-example-form-react/blob/main/app/package.json):


```shell
% meteor npm run start

> meteor-example-form-react@ start /Users/carletonmoore/GitHub/ICS314/meteor-example-form-react/app
> meteor --no-release-check --exclude-archs web.browser.legacy,web.cordova --settings ../config/settings.development.json

[[[[[ ~/GitHub/ICS314/meteor-example-form-react/app ]]]]]

=> Started proxy.                             
=> Started HMR server.                        
=> Started MongoDB.                           
I20220629-09:06:46.335(-10)? Monti APM: completed instrumenting the app
=> Started your app.

=> App running at: http://localhost:3000/
```

### Viewing the running app

If all goes well, the application will appear at [http://localhost:3000](http://localhost:3000).

### ESLint

You can verify that the code obeys our coding standards by running ESLint over the code in the imports/ directory with:

```
meteor npm run lint
```

### Prerequisites

To best understand this application, it is useful to familiarize yourself with:

* [Meteor Application Template React](http://ics-software-engineering.github.io/meteor-application-template-react/). This sample application illustrates conventions for directory layout, naming conventions, routing, integration of Semantic UI, and coding standards. Meteor-example-form is based on this template, so we won't discuss any of these issues here.

* [Bootstrap 5 React](https://react-bootstrap.github.io/). We use Bootstrap 5 for this template.

* [Uniforms](https://uniforms.tools/). Uniforms is a library for simplifying form management with React, and includes built-in integration with Bootstrap 5.

## Walkthrough

The landing page for this application provides the Create Student form:

![](https://github.com/ics-software-engineering/meteor-example-form-react/raw/master/doc/create-student-page.png)

This form has the following input controls:

* Name and Email: text fields, both required.
* Biographical statement: text area, optional.
* Level: select field, required. Default is Freshman
* GPA: select field, required. User must choose one.
* Date enrolled: date field. Defaults to current time and day.
* Hobbies: multiple select field.
* Major: select field implemented as Radio buttons.

A filled out but not yet submitted Create Student form looks like this:


![](https://github.com/ics-software-engineering/meteor-example-form-react/raw/main/doc/create-student-page-filled-in.png)

After submission, the page pops up an alert showing the submission was successful:

![](https://github.com/ics-software-engineering/meteor-example-form-react/raw/main/doc/create-student-page-submitted.png)

Also note that after dismissing the alert, there is a link of the Create Student page to a page where you can edit the document. Here is this page:

![](https://github.com/ics-software-engineering/meteor-example-form-react/raw/main/doc/edit-student-page.png)

You can edit the fields, then click 'Update' to save the changes.

## Screencast

Watch a 35 minute screencast explaining this system at [https://www.youtube.com/watch?v=ZCHf_rNbDaM](https://www.youtube.com/watch?v=ZCHf_rNbDaM).
