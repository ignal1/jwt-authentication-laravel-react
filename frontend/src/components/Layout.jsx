import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomLink from "./CustomLink";

const Layout = () => {
  return (
    <div className="wrapper">
      <header className="header">
        <div className="header_container container">
          <CustomLink to="/">Posts</CustomLink>
          <CustomLink to="/posts">Login</CustomLink>
          <CustomLink to="/about">Register</CustomLink>
        </div>
      </header>

      <main className="page">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="footer">&copy; JWT Authorization 2023</footer>
    </div>
  )
}

export default Layout;