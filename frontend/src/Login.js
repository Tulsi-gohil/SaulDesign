import './App.css';
function Login(){
    return(
        <div>
        <div className=' container mt-5 col-md-4 '>
            <div className= "card p-4" style={{ maxWidth: "400px", width: "100%" }}>
            <h1 className='text-center text-white'>login</h1>
            <form>
                
          {/* Password */}
          <div className="mb-3">
            <label className="form-label text-white">email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-auto">
            <label className="form-label text-white">  Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="   Password"
              required
            />
            <a className='  text-primery' href='foget password '>foget password </a>
             </div>
          <button type="submit " className="btn btn-send w-100">
            Signup
          </button>         
            </form>
        </div>
        </div>
        </div>
    );
}
export default Login;