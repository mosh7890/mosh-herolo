import React from 'react';
import {Container} from "react-grid-system";
import AddMovieModal from './AddMovieModal';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddIcon from '@material-ui/icons/Add';
import SortIcon from '@material-ui/icons/Sort';


export default (props) => {
    return (
        <Container style={{lineHeight: '32px'}}>
            <AddMovieModal
                {...props}
            />
            <BottomNavigation
                value={0}
                showLabels
            >
                <BottomNavigationAction label="ADD MOVIE" icon={<AddIcon/>} onClick={() => props.openAddMovieModal()}
                />
                <BottomNavigationAction label="SORT" icon={<SortIcon/>} onClick={() => props.sortMovies()}/>
            </BottomNavigation>
        </Container>
    )
}