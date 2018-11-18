import React from "react";
import {Container, Row, Col} from 'react-grid-system';
import EditMovieModal from './EditMovieModal';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ConfirmDialog from './ConfirmDialog';

export default (props) => {
    return (
        <Container style={{lineHeight: '32px'}}>
            <Row justify="center">
                <EditMovieModal
                    {...props}
                />
                <ConfirmDialog
                    {...props}
                />
                {props.movies.map((element) => (
                    <Col md={3} key={element.imdbID}>
                        <Card className="Movie Card">
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Movie Poster"
                                    className="Movie Poster"
                                    height="400"
                                    image={element.Poster}
                                    title="Movie Poster"/>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" style={{fontSize: "18px"}}>
                                        Title: {element.Title}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2" style={{fontSize: "18px"}}>
                                        Year: {element.Year}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2" style={{fontSize: "18px"}}>
                                        Runtime: {element.Runtime}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2" style={{fontSize: "18px"}}>
                                        Genre: {element.Genre}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2" style={{fontSize: "18px"}}>
                                        Director: {element.Director}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions style={{justifyContent: 'center'}}>
                                <Button size="small" color="primary" onClick={() => props.openEditMovieModal(element)}>
                                    Edit
                                </Button>
                                <Button size="small" color="primary"
                                        onClick={() => props.removeConfirmDialogClickOpen(element)}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}