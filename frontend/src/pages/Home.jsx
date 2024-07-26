
// import { useEffect, useState } from 'react';
// import axios from 'axios';

import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from "@mui/icons-material/Add";
const Home = () => {
  // const [blogs, setBlogs] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/v1/blog/all-blog')
  //     .then(response => setBlogs(response.data.blogs))
  //     .catch(error => console.error('Error fetching blogs:', error));
  // }, []);

  return (
    // <div>
    //   <h1>All Blogs</h1>
    //   <ul>
    //     {blogs.map(blog => (
    //       <li key={blog._id}>
    //         <h2>{blog.title}</h2>
    //         <p>{blog.description}</p>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <>
    <div className="container7">
  <div className="box7">
          <h1>
            <span style={{ color: "#D6FB41	" }}>Create.</span>
            <br />
            <span style={{ color: "#E3FF73	" }}>Your.</span>
            <br />
            <span style={{ color: "#F1FFB9" }}>Blogs.</span>
          </h1>
          <p>
          Publish your passions your way. <br />
          create a unique and beautiful blog.
          </p>
          <div className="box7btn">
            <h6 style={{ color: "#FFFF66	" }}>
              <AddIcon /> Create Blogs
            </h6>
            <h6 style={{ color: "#FFFF66" }}>
              <FavoriteIcon /> Get Started
            </h6>
          </div>
        </div>
      </div>
      {/* 2nd */}
      <div>
      <div className="container">
        <div className="box">
          <h1>
            From idea <br /> to production <br />
            <span>in record time</span>
          </h1>
          <h6 style={{ color: "rgb(187, 189, 89)" }}>
            {"\uD83E\uDC90"} {"\uD83E\uDC92"} Try for free
          </h6>
        </div>
      </div>
    </div>
    {/* 3d */}
    <div className="AboutContainer4">
        <div className="Aboutbox4">
          <div className="AboutBoxcontainer">
            <div className="SmallBox">
              <h1>
                <span style={{ color: "#D6FB41	" }}>Accessible</span>
              </h1>
            </div>
            <div className="SmallBox">
              <p>
                We’re making Blogger accessible to all, empowering everyone
                to be a creator.
              </p>
            </div>
          </div>
          <div className="AboutBoxcontainer">
            <div className="SmallBox">
              <p >
                We provide people with the means to encourage and help each
                other.
              </p>
            </div>
            <div className="SmallBox">
              <h1>
                <span style={{ color: "#E3FF73	" }}>Collaborative</span>
              </h1>
            </div>
          </div>
          <div className="AboutBoxcontainer">
            <div className="SmallBox">
              <h1>
                <span style={{ color: "#F1FFB9" }}>Empowering</span>
              </h1>
            </div>
            <div className="SmallBox">
              <p>
                We enable creators to feel like they can build without limits.
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Home;
