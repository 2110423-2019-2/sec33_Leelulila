import * as Yup from 'yup'

export const RegistrationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .lowercase("Your email must be in lowercase")
        .required('Email is required.'),
    password: Yup.string()
        .min(6, "Your password must be more than 5 characters")
        .max(18, "Your password must be less than 18 characters!!")
        .required('Password is required.'),
    confirmPassword: Yup.string()
        .min(6, "Your password must be more than 5 characters")
        .max(18, "Your password must be less than 18 characters!!")
        .required('Password is required.')
        .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value;
        }),
    firstName: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required.'),
    lastName: Yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('This field is required.'),
    gender: Yup.mixed()
        .oneOf(['female', 'male', 'other'])
        .required('This field is required.'),
    salary: Yup.number()
        .min(6000, 'Too small!')
        .max(9999999, 'Too Much!')
        .required('This field is required.'),
    birthday: Yup.date()
        .max(new Date(), "Future Date is not valid")
        .required('This field is required.'),
});

export const CreateJobSchema = Yup.object().shape({
    JobName: Yup.string()
        .min(1, "Too Short!")
        .max(20, "Too Long")
        .required('This field is required.'),
    JobDetail: Yup.string()
        .min(3, 'Too Short!')
        .required('This field is required.'),
    Wages: Yup.number()
        .min(100, 'Wages must be more than 100฿')
        .max(9999, 'Wages must be less than 10,000฿')
        .required('This field is required.'),
    Amount: Yup.number()
        .min(1, 'Amount must be more than 1 person')
        .max(100, "Amount must be less than 100 people")
        .required('This field is required.'),
    Location: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Location is required.'),
    BeginTime: Yup.date()
        .required('Begin time is required.'),
    EndTime: Yup.date()
        .required('End time is required.'),
    Date: Yup.date()
        .min(new Date(), 'Work Date must not be in the past')
        .required('Work Date is required.'),
    CurrentEmployee: Yup.array()
        .of(Yup.string().email()),
    CurrentAcceptedEmployee: Yup.array()
        .of(Yup.string().email()),
    Employer: Yup.string()
        .email("Invalid email")
        .required("Employer's email is required."),
    Status: Yup.string()
        .min(2, 'Too Short!'),
    TFvector: Yup.array()
        .of(Yup.number())
});
