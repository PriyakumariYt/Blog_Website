import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const { user } = useAuth();
const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 

    try {
      const response = await axios.post('https://blog-website-backend-ashy.vercel.app/api/v1/blog/create-blog', {
        title,
        description,
        image,
        user: user?._id 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Blog created:', response.data);
   
      setTitle('');
      setDescription('');
      setImage('');
navigate('/myblogs')
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <Container maxWidth="sm" >
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Blog
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            value={image}
            onChange={(e) => setImage(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Create
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateBlog;
