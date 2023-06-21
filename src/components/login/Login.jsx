import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { FormGroup } from "@mui/material";
import { Label } from "@mui/icons-material";

const Login = () => {
    const LoginSchema = Yup.object().shape({
        eail: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().required("Required"),
    });

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {}}
        >
            <Form>
                <FormGroup>
                    <Label>Email</Label>
                    <Field name="email" />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Field name="password" />
                </FormGroup>
                <button type="submit">Login</button>
            </Form>
        </Formik>
    );
};

export default Login;
