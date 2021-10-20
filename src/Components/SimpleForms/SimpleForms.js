// import React from 'react'
// import { useFormik } from 'formik'
// import * as Yup from 'yup'

// const SimpleForms = () => {


//     const initialValues = {
//         name: 'Vishwas',
//         email: '',
//         channel: ''
//     }

//     const onSubmit = values => {
//         console.log('Form data', values)
//     }

//     // const validate = values => {
//     //   const errors = {}

//     //   if (!values.name) {
//     //     errors.name = 'Required'
//     //   }

//     //   if (!values.email) {
//     //     errors.email = 'Required'
//     //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     //     errors.email = 'Invalid email format'
//     //   }

//     //   if (!values.channel) {
//     //     errors.channel = 'Required'
//     //   }

//     //   return errors
//     // }

//     const validationSchema = Yup.object({
//         name: Yup.string().required('Required'),
//         email: Yup.string()
//             .email('Invalid email format')
//             .required('Required'),
//         channel: Yup.string().required('Required')
//     })

//     const formik = useFormik({
//         initialValues,
//         onSubmit,
//         // validate,
//         validationSchema
//     })
//     return (
//         <form form onSubmit={formik.handleSubmit} >
//             <div className='form-group'>
//                 <label htmlFor='name'>Name</label>
//                 <input
//                     type='text'
//                     id='name'
//                     name='name'
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.name}
//                 />
//                 {formik.touched.name && formik.errors.name ? (
//                     <div className='error'>{formik.errors.name}</div>
//                 ) : null}
//             </div>

//             <div className='form-group'>
//                 <label htmlFor='email'>E-mail</label>
//                 <input
//                     type='email'
//                     id='email'
//                     name='email'
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.email}
//                 />
//                 {formik.touched.email && formik.errors.email ? (
//                     <div className='error'>{formik.errors.email}</div>
//                 ) : null}
//             </div>

//             <div className='form-group'>
//                 <label htmlFor='channel'>Channel</label>
//                 <input
//                     type='text'
//                     id='channel'
//                     name='channel'
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.channel}
//                 />
//                 {formik.touched.channel && formik.errors.channel ? (
//                     <div className='error'>{formik.errors.channel}</div>
//                 ) : null}
//             </div>

//             <button type='submit'>Submit</button>
//         </form>
//     )
// }

// export default SimpleForms

import React, { useState } from 'react'
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
    FieldArray,
    FastField
} from 'formik'
import * as Yup from 'yup'
import TextError from './TextError/TextError'
import { object, number, string, boolean, date } from 'yup'
import { parse, isDate } from "date-fns";
import { DatePickerField } from './DateTimePicker/DateTimeField'

function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
        ? originalValue
        : parse(originalValue, "yyyy-MM-dd", new Date());

    return parsedDate;
}

const today = new Date();

const initialValues = {
    name: '',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: ''
    },
    primaryPh: '',
    secondaryPh: '',
    phNumbers: [''],

    // Valid date 2000-12-12
    date: '',
}

const savedValues = {
    name: 'Vishwas',
    email: 'v@example.com',
    channel: 'codevolution',
    comments: 'Welcome to Formik',
    address: '221B Baker Street',
    social: {
        facebook: '',
        twitter: ''
    },
    primaryPh: '',
    secondaryPh: '',
    phNumbers: [''],
    date: '',

}

const onSubmit = (values, submitProps) => {
    console.log('Form data', values)
    console.log('submitProps', submitProps)
    submitProps.setSubmitting(false)
    submitProps.resetForm()
}

const phoneRegex = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})/;
const validationSchema = object({
    name: string().required('Required'),
    email: string()
        .email('Invalid email format')
        .required('Required'),
    channel: string().required('Required'),
    comments: string().required('Required'),
    address: string().required('Required'),
    primaryPh: string().matches(phoneRegex, 'Not valid phone number'),
    secondaryPh: string().matches(phoneRegex, 'Not valid phone number'),
    date: date().transform(parseDateString).max(today, "Error day")
        .test('Age', 'Date must be more than 18 years', date => today.getYear() - parseDateString(null, date).getYear() >= 18)
        .test('Age', 'Date must be more than 150 years', date => today.getYear() - parseDateString(null, date).getYear() <= 150),
})//.shape({
//     phoneNumbers: Yup.array().of(
//         Yup.object().shape(
//             {
//                 primaryPh: Yup.string().min(2, "Min 2 chars").required('Required'),
//                 secondaryPh: Yup.string().required('Required'),
//             }
//         )
//     ),
// }
// )

const validateComments = value => {
    let error
    if (!value) {
        error = 'Required'
    }
    return error
}

function SimpleForms() {
    const [formValues, setFormValues] = useState(null)
    return (
        <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        // validateOnChange={false}
        // validateOnBlur={false}
        // validateOnMount
        >
            {formik => {
                console.log('Formik props', formik)
                return (
                    <Form className="w-50 m-4">
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <Field type='text' id='name' name='name' />
                            <ErrorMessage name='name' component={TextError} />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <Field type='email' id='email' name='email' />
                            <ErrorMessage name='email'>
                                {error => <div className='error'>{error}</div>}
                            </ErrorMessage>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='channel'>Channel</label>
                            <Field
                                type='text'
                                id='channel'
                                name='channel'
                                placeholder='YouTube channel name'
                            />
                            <ErrorMessage name='channel' />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='comments'>Comments</label>
                            <Field
                                as='textarea'
                                id='comments'
                                name='comments'
                                validate={validateComments}
                            />
                            <ErrorMessage name='comments' component={TextError} />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='address'>Address</label>
                            <FastField name='address'>
                                {({ field, form, meta }) => {
                                    // console.log('Field render')
                                    return (
                                        <div>
                                            <input type='text' {...field} />
                                            {meta.touched && meta.error ? (
                                                <div>{meta.error}</div>
                                            ) : null}
                                        </div>
                                    )
                                }}
                            </FastField>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='facebook'>Facebook profile</label>
                            <Field type='text' id='facebook' name='social.facebook' />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='twitter'>Twitter profile</label>
                            <Field type='text' id='twitter' name='social.twitter' />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='primaryPh'>Primary phone number</label>
                            <Field type='tel' id='primaryPh' name='primaryPh' />
                            <ErrorMessage name='primaryPh' component={TextError} />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='secondaryPh'>Secondary phone number</label>
                            <Field type='tel' id='secondaryPh' name='secondaryPh' />
                            <ErrorMessage name='secondaryPh' component={TextError} />
                        </div>


                        <div className='form-group'>
                            <label htmlFor='date'>Date</label>
                            <Field type='text' id='date' name='date' />
                            {/* <DatePickerField id="date" name="date" />  With picker ErrorMessage do not works */}
                            <ErrorMessage name='date' component={TextError} />
                        </div>


                        <div className='form-group' >
                            <label>List of phone numbers</label>
                            <FieldArray name='phNumbers'>
                                {fieldArrayProps => {
                                    const { push, remove, form } = fieldArrayProps
                                    const { values } = form
                                    const { phNumbers } = values
                                    // console.log('fieldArrayProps', fieldArrayProps)
                                    // console.log('Form errors', form.errors)
                                    return (
                                        <div>
                                            {phNumbers.map((phNumber, index) => (
                                                <div key={index}>
                                                    <Field name={`phNumbers[${index}]`} />
                                                    {index > 0 && (
                                                        <button type='button' onClick={() => remove(index)}>
                                                            -
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            <button type='button' onClick={() => push('')}>
                                                +
                                            </button>
                                        </div>
                                    )
                                }}
                            </FieldArray>
                        </div>
                        {/* <button
              type='button'
              onClick={() => formik.validateField('comments')}
            >
              Validate comments
            </button>
            <button
              type='button'
              onClick={() => formik.setFieldTouched('comments')}
            >
              Visit comments
            </button>
            <button type='button' onClick={() => formik.validateForm()}>
              Validate all
            </button>
            <button
              type='button'
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true
                })
              }
            >
              Visit all
            </button> */}
                        <button type='button' onClick={() => setFormValues(savedValues)}>
                            Load saved data
                        </button>
                        <button type='reset'>Reset</button>
                        <button
                            type='submit'
                            disabled={!formik.isValid || formik.isSubmitting}
                        >
                            Submit
                        </button>
                    </Form >
                )
            }}
        </Formik >
    )
}

export default SimpleForms