import { Paper, Typography, Grid, ButtonGroup, TextField, Button } from '@mui/material';

export default function Item({
    item,
    quantity,
    handleIncrease,
    handleDecrease,
    handleChange,
    handlePlaceOrder,
}) {
    return (
        <Paper sx={{ padding: '2vh', margin: '1vh 0' }}>
            <Grid container spacing={2}>
                <Grid item md={10}>
                    <Typography variant='h5'>
                        {item.name} - x{item.ids.length} Available
                    </Typography>
                    <Typography>From: {item.owner.name}</Typography>
                    <Typography>Location: {item.owner.organization.address}</Typography>
                </Grid>
                <Grid item container md={2} justifyContent='flex-end' alignItems='flex-end'>
                    <ButtonGroup row>
                        <Button variant='contained' size='small' onClick={handleDecrease}>
                            <b>-</b>
                        </Button>
                        <TextField
                            variant='outlined'
                            type='number'
                            value={quantity}
                            onChange={handleChange}
                            sx={{ width: '6vw' }}
                        />
                        <Button variant='contained' size='small' onClick={handleIncrease}>
                            <b>+</b>
                        </Button>
                        <Button variant='contained' size='small' onClick={handlePlaceOrder}>
                            Order
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Paper>
    );
}
