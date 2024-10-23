import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordarray, setpasswordarray] = useState([]);
  const getpasswords = async()=>{

    let req =await fetch("http://localhost:3000/")
    let passwords = await req.json()
  
    
    console.log(passwords)
      setpasswordarray(passwords);
   
  }
  useEffect(() => {
    getpasswords()
  }, []);

  const showpassword = () => {
    // alert("show the password");
    // passwordref.current.type = "text";
    if (ref.current.src.includes("icons/closed.png")) {
      passwordref.current.type = "text";
      ref.current.src = "icons/open.png";
    } else {
      passwordref.current.type = "password";
      ref.current.src = "icons/closed.png";
    }
  };
  // Function to save password
  const savepassword = async () => {
    // Ensure form validation before proceeding
    let flag=1;
    if (form.site.length > 3 && form.password.length > 3 && form.username.length > 3) {
  
      // Check if the current form is in "edit mode" (i.e., the password is being updated)
      if (form.id) {
        // It's an edit, so delete the old entry from the database
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: form.id })  // Use the current form id to delete the old entry
        });
  
        // Remove the old password from the local password array
        setpasswordarray(passwordarray.filter(item => item.id !== form.id));
        flag=2;
        toast.success("Key edited sucessfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
  
      // Generate a new ID only if it's a new entry, otherwise reuse the existing one for edited entries
      const newId = form.id || uuidv4();
  
      // Add the new or edited password to the password array
      const updatedPassword = { ...form, id: newId };
      setpasswordarray([...passwordarray, updatedPassword]);
  
      // Save the new or updated password to the backend via POST request
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPassword)  // Send the updated password with the new or existing ID
      });
  
      // Reset the form fields after saving
      setform({ site: "", username: "", password: "" });
      if(flag===1)toast.success("Key saved succesfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
  
    } else {
      // Show error toast if form fields are invalid
      toast.error("Enter valid key", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      
    }
  };
  
  // Function to delete a password by ID
  const deletepassword = async (id) => {
    console.log("deleting password with id", id);
    let confirmDeletion = confirm("Do you really want to delete this key?");
    if (confirmDeletion) {
      // Delete password from the backend via DELETE request
      const res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
  
      // If deletion is successful, update the password array
      if (res.ok) {
        setpasswordarray(passwordarray.filter(item => item.id !== id));
      } else {
        console.error("Failed to delete password");
      }
      toast.success("Key deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  
  // Function to edit a password by ID
  const editpassword = (id) => {
    console.log("Editing password with ID:", id);
  
    // Set the form with the selected password's data (prefill the form for editing)
    setform({ ...passwordarray.find(item => item.id === id), id });
  
    // Temporarily remove the password from the password array to avoid duplication
    setpasswordarray(passwordarray.filter(item => item.id !== id));
  };
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const copytext = (text) => {
    toast("Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        
      />
      
      
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      {/* <div class="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div> */}
      <div className="p-2 md:px-0 md:mycontainer min-h-[93.8vh]">
        <h1 className="text-xl text font-bold text-center text-white">
          <span className="text-lime-400">&lt; Key</span>
          Keeper
          <span className="text-lime-400">/ &gt;</span>
        </h1>
        <p className="text-lime-300 text-center text-lg">
          Your own password manager
        </p>
        <div className=" flex flex-col p-4 text-black gap-8 items-center">
          <input
            onChange={handlechange}
            value={form.site}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full px-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex  w-full justify-between gap-8">
            <input
              onChange={handlechange}
              value={form.username}
              placeholder="Enter Username "
              className="rounded-full border border-green-500 w-full px-4 py-1 "
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordref}
                onChange={handlechange}
                value={form.password}
                placeholder="Enter Key"
                className="rounded-full border border-green-500 w-full px-4 py-1 "
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-0 px-2 cursor-pointer "
                onClick={showpassword}
              >
                <img
                  ref={ref}
                  className="text-white"
                  width={30}
                  src="icons/closed.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            onClick={savepassword}
            className="flex justify-center items-center bg-green-600 hover:bg-lime-400 rounded-full px-4 py-1 w-fit border border-lime-400"
          >
            <lord-icon
              src="https://cdn.lordicon.com/slmechys.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords  ">
          <h2 className="font-bold text-2xl py-4 text-lime-400">Your Keys</h2>
          {passwordarray.length === 0 && (
            <div className="text-white"> No keys to show</div>
          )}
          {passwordarray.length != 0 && (
            <table className="table-auto text-white w-full rounded-md overflow-hidden">
              <thead className="bg-green-600">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Key</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordarray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="flex items-center justify-center py-2 border border-violet-900 text-center ">
                        <a href="item.site" target="_blank">
                          {item.site}
                        </a>
                        <div
                          className="lordiconcopy invert cursor-pointer"
                          onClick={() => copytext(item.site)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              "padding-top": "5px",
                              "padding-left": "5px",
                            }}
                          ></lord-icon>
                        </div>
                      </td>
                      <td className=" py-2 border border-violet-900 text-center w-32">
                        <div className="flex items-center justify-center">
                          {item.username}
                          <div
                            className="lordiconcopy invert cursor-pointer"
                            onClick={() => copytext(item.username)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                "padding-top": "5px",
                                "padding-left": "5px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-violet-900 text-center w-32">
                        <div className="flex items-center justify-center">
                          {"*".repeat(item.password.length)}
                          <div
                            className="lordiconcopy invert cursor-pointer"
                            onClick={() => copytext(item.password)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                "padding-top": "5px",
                                "padding-left": "5px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-violet-900 text-center w-32">
                        <div className="flex items-center justify-center">
                          <div
                            className="lordiconcopy invert cursor-pointer"
                            
                          >
                            <span onClick={()=>editpassword(item.id)}>

                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                "padding-top": "5px",
                                "padding-left": "5px",
                              }}
                            ></lord-icon>
                            </span>
                            <span onClick={()=>deletepassword(item.id)}>
                            <lord-icon
                              
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                "padding-top": "5px",
                                "padding-left": "5px",
                              }}
                            ></lord-icon>
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default manager;
