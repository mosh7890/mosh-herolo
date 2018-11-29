import React from "react";
import {Container, Row, Col} from 'react-grid-system';
import Dialog_ConfirmDelete from '../dialogs/Dialog_ConfirmDelete';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default (props) => {
    let movieArray = props.movies;

    if (props.sortUp === true && !props.movieModalIsOpen) {
        movieArray.sort((a, b) => (a.Title > b.Title) ? 1 : ((b.Title > a.Title) ? -1 : 0));
    } else if (props.sortUp === false && !props.movieModalIsOpen) {
        movieArray.sort((a, b) => (b.Title > a.Title) ? 1 : ((a.Title > b.Title) ? -1 : 0));
    }

    return (
        <Container style={{paddingTop: "75px"}}>
            <Dialog_ConfirmDelete
                {...props}
            />
            <Row justify="center">
                {movieArray.map((element) => (
                    <Col xs={6} sm={6} md={6} lg={3} xl={3} key={element.imdbID}>
                        <Card style={{borderRadius: 25}}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Movie Poster"
                                    className="Movie Poster"
                                    height="350"
                                    image={element.Poster}
                                    title="Movie Poster"/>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" style={{fontSize: "18px"}}>
                                        {element.Title}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2" style={{fontSize: "18px"}}>
                                        {element.Year}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2" style={{fontSize: "18px"}}>
                                        {element.Runtime}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2" style={{fontSize: "18px"}}>
                                        {element.Genre}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2" style={{fontSize: "18px"}}>
                                        {element.Director}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{justifyContent: 'center'}}>
                                    <Button size="small" color="primary"
                                            onClick={() => props.openMovieModal('Edit', element)}>
                                        Edit
                                    </Button>
                                    <Button size="small" color="primary"
                                            onClick={() => props.removeConfirmDialogClickOpen(element)}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </CardActionArea>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}