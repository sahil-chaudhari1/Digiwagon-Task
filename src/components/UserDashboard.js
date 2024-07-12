import React, { useState } from 'react';
import { Button, Box, TextField, Snackbar, IconButton } from '@mui/material';
import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import '../Style/UserDashboard.css';

const validationSchema = Yup.object({
  productName: Yup.string().required('Required'),
  productDescription: Yup.string().required('Required'),
  variants: Yup.array().of(
    Yup.object({
      variantName: Yup.string().required('Required'),
      variantAmount: Yup.number().required('Required'),
    })
  ),
});

function UserDashboard() {
  const [showAlert, setShowAlert] = useState(false);

  const handleFormSubmit = (values, { resetForm }) => {
    const existingData = JSON.parse(localStorage.getItem('formData')) || [];
    existingData.push(values);
    localStorage.setItem('formData', JSON.stringify(existingData));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    resetForm();
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>User Dashboard</h1>
      <Formik
        initialValues={{ productName: '', productDescription: '', variants: [{ variantName: '', variantAmount: '' }] }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, errors, touched }) => (
          <Form className="MaterialForm">
            <Box mb={2}>
              <Field
                as={TextField}
                name="productName"
                label="Product Name"
                fullWidth
                error={touched.productName && !!errors.productName}
                helperText={touched.productName && errors.productName}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                name="productDescription"
                label="Product Description"
                fullWidth
                error={touched.productDescription && !!errors.productDescription}
                helperText={touched.productDescription && errors.productDescription}
              />
            </Box>
            <FieldArray name="variants">
              {({ push, remove }) => (
                <div>
                  {values.variants.map((variant, index) => (
                    <div key={index} className="variant-row">
                      <Field
                        as={TextField}
                        name={`variants[${index}].variantName`}
                        label="Variant Name"
                        error={touched.variants?.[index]?.variantName && !!errors.variants?.[index]?.variantName}
                        helperText={touched.variants?.[index]?.variantName && errors.variants?.[index]?.variantName}
                      />
                      <Field
                        as={TextField}
                        name={`variants[${index}].variantAmount`}
                        label="Variant Amount"
                        error={touched.variants?.[index]?.variantAmount && !!errors.variants?.[index]?.variantAmount}
                        helperText={touched.variants?.[index]?.variantAmount && errors.variants?.[index]?.variantAmount}
                      />
                      <IconButton onClick={() => remove(index)} className="remove-icon">
                        <CloseIcon />
                      </IconButton>
                    </div>
                  ))}
                  <Button type="button" variant="contained" onClick={() => push({ variantName: '', variantAmount: '' })}>
                    Add Variant
                  </Button>
                </div>
              )}
            </FieldArray>
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Snackbar open={showAlert} message="Form submitted successfully!" autoHideDuration={3000} />
    </div>
  );
}

export default UserDashboard;

