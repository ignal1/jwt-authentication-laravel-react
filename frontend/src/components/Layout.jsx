import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomLink from "./CustomLink";

const Layout = () => {
  return (
    <div className="wrapper">
      <header className="header">
        <div className="header_container container">
          <div className="header_left">
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/posts">Posts</CustomLink>
          </div>
          <div className="header_right">
            <CustomLink to="/login">Login</CustomLink>
            <CustomLink to="/register">Register</CustomLink>
          </div>
        </div>
      </header>

      <main className="page">
        <div className="main_container container">
          <Outlet />
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          &copy; JWT Authorization 2023
        </div>
      </footer>
    </div>
  )
}

export default Layout;