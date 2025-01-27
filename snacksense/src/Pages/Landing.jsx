import React from 'react'
import { Link } from 'react-router-dom'
export default function Landing() {
  return (
    <div>
      <Link to="/register"><button type="button" class="btn btn-primary m-3">Register</button></Link>
      <Link to="/login"><button type="button" class="btn btn-primary m-3">Login</button></Link>
    </div>
  )
}
