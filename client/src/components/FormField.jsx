import { FormControl, Typography, TextField, InputAdornment } from '@mui/material';

import '../App.css';

export default function FormField({
    label,
    icon: Icon,
    handleChange,
    value,
    sx,
    fullWidth,
    children,
    ...props
}) {
    return (
        <FormControl variant='standard' fullWidth={fullWidth} required sx={sx}>
            <Typography>{label}</Typography>
            {Icon ? (
                <TextField
                    {...props}
                    className='form-field'
                    onChange={handleChange}
                    value={value}
                    sx={{
                        input: {
                            color: '#666666',
                        },
                        '& .MuiOutlinedInput-root': {
                            paddingLeft: 0,
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment
                                sx={{
                                    margin: 0,
                                    padding: '0 8px',
                                }}
                                position='start'
                            >
                                <Icon />
                            </InputAdornment>
                        ),
                    }}
                >
                    {children}
                </TextField>
            ) : (
                <TextField
                    {...props}
                    className='form-field'
                    onChange={handleChange}
                    value={value}
                    sx={{
                        input: {
                            color: '#666666',
                        },
                        '& .MuiOutlinedInput-root': {
                            paddingLeft: 0,
                        },
                    }}
                >
                    {children}
                </TextField>
            )}
        </FormControl>
    );
}
