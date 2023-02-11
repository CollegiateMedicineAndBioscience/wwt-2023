import { FormControl, Typography, TextField, InputAdornment } from '@mui/material';

import '../App.css';

export default function FormField({ name, icon: Icon, handleChange, value, sx, ...props }) {
    return (
        <FormControl variant='standard' fullWidth required sx={sx}>
            <Typography>{name}</Typography>
            {Icon ? (
                <TextField
                    {...props}
                    className='form-field'
                    onChange={handleChange}
                    value={value}
                    sx={{
                        input: {
                            color: '#666666',
                            padding: '1rem',
                            borderRadius: '10',
                        },
                        '& .MuiOutlinedInput-root': {
                            paddingLeft: 0,
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment
                                sx={{
                                    backgroundColor: (theme) => theme.palette.divider,
                                    padding: '27.5px 14px',
                                    margin: 0,
                                }}
                                position='start'
                            >
                                <Icon />
                            </InputAdornment>
                        ),
                    }}
                />
            ) : (
                <TextField
                    {...props}
                    className='form-field'
                    onChange={handleChange}
                    value={value}
                    sx={{
                        input: {
                            color: '#666666',
                            padding: '1rem',
                            borderRadius: '10',
                        },
                        '& .MuiOutlinedInput-root': {
                            paddingLeft: 0,
                        },
                    }}
                />
            )}
        </FormControl>
    );
}
