import React from 'react';
import { BrowserRouter, Routes, Router, Route } from 'react-router-dom';
import Home from './components/Home';
import BlogDetails from './components/blogDetails';
import Addblog from './components/Addblog';

const LayoutRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home /> } />
        <Route path="/blogDetails/:blogId"  element={<BlogDetails />}  />
        <Route path='/add blogs' element={<Addblog />} />
      </Routes>
    </div>
  )
}
export default LayoutRoutes;