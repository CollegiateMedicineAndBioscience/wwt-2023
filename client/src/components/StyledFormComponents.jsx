import { Button, FormGroup, Paper, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const Form = styled(FormGroup)(({ theme }) => ({
    [theme.breakpoints.only('xs')]: {
        column: true,
    },
}));

const StyledTextField = styled(TextField)`
    .MuiInputBase-root {
        background-color: ${({ theme, value }) => !value && theme.palette.form.field};
    }
`;

const FormField = styled(StyledTextField)(({ theme }) => ({
    [theme.breakpoints.only('xs')]: {
        column: true,
        width: '75%',
    },
}));

const FormButton = styled(Button)(({ theme }) => ({
    disableElevation: true,
    color: theme.palette.primary.main,
    [theme.breakpoints.only('xs')]: {
        column: true,
        width: '25%',
    },
}));

export { Form, FormField, FormButton };
