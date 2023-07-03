import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import CardCategorias from '../../cardCategorias/CardCategorias';
import "../CategoriesCarousel/carrusel.css"
const CategoriesCarousel = ({ items }) => {
  const itemsPerPage =4;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePrevClick = () => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? totalPages - 1 : prevPage - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) =>
      prevPage === totalPages - 1 ? 0 : prevPage + 1,
    );
  };

  return (
    <Box className="contenedorCarrusel carrusel-container"
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <IconButton onClick={handlePrevClick} >
        <KeyboardArrowLeft />
      </IconButton>
      <Grid container spacing={3} >
      {items.slice(startIndex, endIndex).map((item, index) => (
        <Grid item xs={12} sm={6} md={3}  key={index} className="carrusel-item" >
            <CardCategorias
              key={item.id}
              id={item.id}
              title={item.titulo}
              urlImg={item.urlImg}/>
          </Grid>
        ))}
      </Grid>
      <IconButton onClick={handleNextClick} >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
};

CategoriesCarousel.propTypes = {
  items: PropTypes.array.isRequired,
};

export default CategoriesCarousel;
