import React from "react";
import {Container, Row, Col} from 'react-grid-system';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default (props) => {
    return (
        <Container fluid>
            <Row>
                {props.movies.map((element) => (
                    <Col md={4} key={element.imdbID}>
                        <Card className="Movie Card">
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Movie Poster"
                                    className="Movie Poster"
                                    height="500"
                                    image={element.Poster}
                                    title="Movie Poster"/>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {element.Title}
                                    </Typography>
                                    <Typography component="p">
                                        {element.Year}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Edit
                                </Button>
                                <Button size="small" color="primary" onClick={() => props.removeMovie(element)}>
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