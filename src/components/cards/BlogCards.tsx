import * as React from 'react';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import image from '../../icons/image.svg';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid() {
  return (
    <Box
      sx={{
        p: 1,
        maxWidth: '330px',
        minHeight: '100px',
        flexGrow: 1,
        display: 'flex',
      }}
    >
      <ButtonBase>
        <Img alt='complex' src={image} />
      </ButtonBase>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left', ml: '8px'}}>
              <Box sx={{ color: '#21B8F9', fontSize: '12px' }}>E-Commerce</Box>
              <Box sx={{ color: '#103B66', fontSize: '15px' }}>Some dummy data</Box>
              <Box>
                <Link
                  href='/'
                  variant='body1'
                  sx={{
                    textDecoration: 'underline',
                    fontSize: '12px',
                    color: '#103B66',
                    '&:hover': {
                      color: '#798e97',
                    },
                  }}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  Estimated Reading: 4mins
                </Link>
              </Box>
          </Box>
    </Box>
  );
}
