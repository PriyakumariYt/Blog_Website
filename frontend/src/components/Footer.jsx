
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      sx={{
        backgroundColor: 'gray.700',
        py: 12,
        px: { xs: 6, sm: 10 },
        color: 'white',
        fontFamily: 'sans-serif'
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight="bold">Contact Us</Typography>
        <Typography variant="body2" mt={2}>
          Subscribe to our newsletter and stay up to date with the latest news,
          updates, and exclusive offers. Get valuable insights. Join our community today!
        </Typography>
        <Box
          sx={{
            backgroundColor: 'gray.100',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 1,
            mt: 4,
            border: 1,
            borderColor: 'gray.300',
            '&:focus-within': { borderColor: 'gray.700' },
            px: 2,
            py: 1
          }}
        >
          <TextField
            type="email"
            placeholder="Enter your email"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                color: '#333',
                placeholderColor: 'gray.500',
                backgroundColor: 'transparent',
                fontSize: '0.875rem',
                px: 1,
                py: 1.5,
              }
            }}
            fullWidth
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'gray.700',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.875rem',
              borderRadius: 1,
              px: 3,
              py: 1,
              ml: 1,
              '&:hover': {
                backgroundColor: 'gray.800',
                transition: 'all 0.3s ease',
              }
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
