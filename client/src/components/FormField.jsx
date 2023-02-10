import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { withStyles } from '@mui/styles';

const styles = {
    root: {
        background: '#D9D9D9',
    },
    input: {
        color: '#666666',
    },
};

const FormField = styled(TextField)(({ theme }) => ({
    [theme.breakpoints.only('xs')]: {
        column: true,
        width: '75%',
    },
}));

export default withStyles(styles)(FormField);
