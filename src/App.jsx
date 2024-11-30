import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Authprovider } from './Context/AuthContext';
import PublicRoute from './RouteCheckers/PublicRoute';
import ProtectedRoute from './RouteCheckers/ProtectedRoute';
import Signup from './Authentication/Signup';
import Login from './Authentication/Login';
import Dashboard from './Pages/Dashboard';
import Blog from './Pages/Blog';
import Profile from './Pages/Profile';
import About from './Pages/About';
import Layout from './Components/Layout';
import Contact from './Pages/Contact';
import CreateBlog from './Pages/CreateBlog';
import MyBlogs from './Pages/MyBlogs';
import BlogDetails from './Pages/BlogDetails';
import UpdateBlog from './Pages/UpdateBlog';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <Authprovider>
      <Router>
        <Routes>
          <Route element={<PublicRoute redirectTo="/blog" />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute redirectTo="/login" />}>
            <Route element={<Layout />}>
              <Route path="/blog" element={<Blog />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/CreateBlog" element={<CreateBlog />} />
              <Route path="/MyBlog" element={<MyBlogs />} />
              <Route path="/Blog/:id" element={<BlogDetails />} />
              <Route path="/Edit-Blog/:id" element={<UpdateBlog />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Authprovider>
  );
}

export default App;
