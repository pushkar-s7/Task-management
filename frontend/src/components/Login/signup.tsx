import './Sign.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
interface FormValues {
    username: string;
    email: string;
    password: string;
}

interface ApiResponse {
    success: boolean;
    message: string;
}

const Signup = () => {
    const navigate = useNavigate();

    const formik = useFormik<FormValues>({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .matches(/^[A-Za-z0-9\s]+$/, 'Name can only contain letters,numbers and spaces')
                .required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string()
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters long'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await fetch('http://localhost:5000/signup', {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(await response.text());
                }
                const result: ApiResponse = await response.json();

                if (result) {
                    toast.success('Registration Successfull', {
                        position: "top-center",
                        autoClose: 1000
                      });
                    navigate('/signin');
                }
            } catch (error: any) {
                console.error('Error submitting form:', error);
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 2000
                  });
            } finally {
                resetForm();
            }
        },
    });

    const handleSignIn = () => {
        navigate('/signin');
    };

    return (
        <div className='signup-form'>
            <div className='signup_form'>
                <form onSubmit={formik.handleSubmit}>
                    <h4>Sign Up</h4>
                    <div className='form-group'>
                        <input
                            type='text'
                            name='username'
                            placeholder='Enter Name'
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className='error'>{formik.errors.username}</div>
                        ) : null}
                    </div>
                    <div className='form-group'>
                        <input
                            type='email'
                            name='email'
                            placeholder='Enter Email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className='error'>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            name='password'
                            placeholder='Enter Password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className='error'>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='button'>
                            Sign Up
                        </button>
                        <p className='p-sign'>
                            If already have account{' '}
                            <button type='button' onClick={handleSignIn}>
                                SignIn
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
