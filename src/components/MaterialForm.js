import React, { useState } from 'react';
import { Button, Box, TextField, IconButton, InputAdornment, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  role: Yup.string().required('Required'),
});

function MaterialForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleFormSubmit = values => {
    if (values.role === 'Admin' && values.email === 'sahilchaudhari162@gmail.com' && values.password === 'sahil@0001') {
      localStorage.setItem('user', JSON.stringify(values)); 
      window.location.href = '/admin-dashboard'; 
    } else if (values.role === 'User') {
      localStorage.setItem('user', JSON.stringify(values)); 
      window.location.href = '/user-dashboard'; 
    } else {
      setLoginError(true); 
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Login Page</h2>
      <Formik
        initialValues={{ email: '', password: '', role: '' }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ errors, touched }) => (
          <Form className="MaterialForm">
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Field
                  as={Select}
                  name="role"
                  label="Role"
                  error={touched.role && !!errors.role}
                >
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </Field>
              </FormControl>
              {touched.role && errors.role && (
                <div style={{ color: 'red', marginTop: '5px' }}>{errors.role}</div>
              )}
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                name="email"
                type="email"
                label="Email"
                fullWidth
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                fullWidth
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            {loginError && (
              <p style={{ color: 'red', marginBottom: '10px' }}>Invalid credentials. Please try again.</p>
            )}
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default MaterialForm;


