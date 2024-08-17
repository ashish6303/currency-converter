import React from 'react';
import TextField from '@mui/material/TextField';

const CustomTextField = ({ darkMode, ...props }) => {
    return (
        <TextField
            {...props}
            sx={{
                '& .MuiInputBase-input': {
                    color: darkMode ? 'white' : 'black',  // Change input text color
                },
                '& .MuiFormLabel-root': {
                    color: darkMode ? 'white' : 'black',  // Label color
                },
                '& .MuiInputBase-colorPrimary': {
                    backgroundColor: darkMode ? '#333' : 'white', // Adjust background color for the primary variant
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: darkMode ? 'white' : '#3f50b5',  // Border color
                    },
                    '&:hover fieldset': {
                        borderColor: darkMode ? 'white' : '#3f50b5',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: darkMode ? 'white' : '#3f50b5',
                    }
                },
                '& .MuiAutocomplete-endAdornment': {
                    '& .MuiIconButton-root': {
                        color: darkMode ? 'white' : 'black', // Icon color
                    },
                    '& .MuiSvgIcon-root': {
                        color: darkMode ? 'white' : 'black', // SVG icon color
                    },
                },
            }}
        />
    );
};

export default CustomTextField;
