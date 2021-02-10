import React from 'react';
import '../Museek.css';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';

const Artist = ({ artist }) => {
    return (
        <div className="results">
            <Grid container spacing={10}>
                <Grid container item xs={12} spacing={3}>
                    {
                        artist.data && artist.data.map(e => (
                            <Grid key={e.id} item xs={3}>
                                <Card style={{ minWidth: "275" }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {e.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            This is a second text space.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default Artist
