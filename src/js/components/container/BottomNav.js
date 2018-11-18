import React from 'react';
import {Container} from "react-grid-system";
import AddMovieModal from './AddMovieModal';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddIcon from '@material-ui/icons/Add';


export default (props) => {
    return (
        <Container style={{lineHeight: '32px'}}>
            <AddMovieModal
                {...props}
            />
            <BottomNavigation
                value={0}
                showLabels
                onClick={() => props.openAddMovieModal()}
            >
                <BottomNavigationAction label="ADD MOVIE" icon={<AddIcon/>}/>
            </BottomNavigation>
        </Container>
    )
}