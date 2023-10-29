import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";

export default function Popup({ open, setOpen, step, setStep }) {
  const [country, setCountry] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  })
  const [enteredOTP, setEnteredOTP] = useState()
  const [otp, setOtp] = useState()
  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  const [showEnterOTP, setShowEnterOTP] = useState(false)
  const [verified, setVerified] = useState(false);

  const handleClosePopup = () => {
    setOpen(false);
  };
  const handleVerify1 = () => {
    if(form.phone.length===10){
      const otp = Math.floor(1000 + Math.random() * 9000);
      axios.get(`https://2factor.in/API/V1/20334469-768f-11ee-addf-0200cd936042/SMS/${form.phone}/${otp}/OTP1`)
        .then((res)=>{
          // if(res.success === true){
            setOtp(otp)
            setOpen(true)
            setStep(2)
            setShowEnterOTP(true)
          //   console.log(res.message)
          // } else if(res.success === false){
          //   console.log(res.message)
          // }     
          console.log(res)
        })
        .catch(err=>{
          console.log(err)
        })
    } else{
      console.log("Number should be 10 digit")
    }
  }
  const handleVerify2 = () => {
    if(enteredOTP.length===4){
      axios.get(`https://2factor.in/API/V1/20334469-768f-11ee-addf-0200cd936042/SMS/VERIFY3/${form.phone}/${enteredOTP}`)
        .then(res=>{
          console.log(res);
          console.log("successfully otp verified", enteredOTP)
          console.log(form)
          console.log(country)
        })
      // axios.post("http://localhost:4000/api/verify-otp", {mobileNumber:form.phone, otp})
      //   .then((res)=>{
      //     if(res.success === true){
      //       setVerified(true)
      //       console.log(res.message)
      //     }else if(res.success === false){
      //       console.log(res.message)
      //     }       
      //     console.log(res)
      //   })
      //   .catch(err=>{
      //     console.log(err)
      //   })
    } else{
      console.log("Number should be 4 digit")
    }
  }
  
  const handleSubmit1 = (e) => {
    e.preventDefault();
    console.log(country);
    setStep(2);
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    handleClosePopup()
  };

  return (
    <div>
      <Dialog
        open={open}
        // onClose={handleClosePopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {step === 1 ? (
          <form
            className=" flex flex-col gap-3 pt-11 pb-9 px-10 rounded"
            onSubmit={handleSubmit1}
          >
            <FormControl sx={{ minWidth: 400 }} required>
              <InputLabel id="demo-simple-select-helper-label">
                Country
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={country}
                label="Country"
                onChange={handleChange}
              >
                <MenuItem value={"international"}>International</MenuItem>
                <MenuItem value={"domestic"}>Domestic</MenuItem>
              </Select>
            </FormControl>

            <div className="grid grid-cols-2 justify-center items-center gap-2 mt-1">
              <button
                className=" border border-[#3E64FB] py-1.5 px-2 rounded bg-[#fafafa] font-semibold text-[#526ede] hover:bg-[#526ede] hover:text-[#fafafa] duration-300"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
              <button
                type="submit"
                className=" border border-[#3E64FB] py-1.5 px-2 rounded text-[#fafafa] font-semibold bg-[#526ede] hover:text-[#526ede] hover:bg-[#fafafa] duration-300"
              >
                Next
              </button>
            </div>
          </form>
        ) : (
          <form
            className=" flex flex-col gap-3 pt-11 pb-9 px-10 rounded"
            onSubmit={handleSubmit2}
          >
            <div className=" flex flex-col gap-1.5 w-96">
              <input
                className=" focus:outline-none py-1.5 px-2 rounded border border-stone-400 w-full text-stone-800"
                type="text"
                placeholder="Name "
                value={form.name}
                onChange={(e)=>setForm({...form, name:e.target.value})}
                required
              />
              <input
                className=" focus:outline-none py-1.5 px-2 rounded border border-stone-400 w-full text-stone-800"
                type="Email"
                placeholder="Email "
                value={form.email}
                onChange={(e)=>setForm({...form, email:e.target.value})}
                required
              />
              <div className=" flex justify-center items-center gap-1">
                <input
                  className=" focus:outline-none py-1.5 px-2 rounded border border-stone-400 w-full text-stone-800"
                  type="number"
                  placeholder="Mobile No "
                  value={form.phone}
                  onChange={(e)=>setForm({...form, phone:e.target.value})}
                  required
                />
                <button className="group/button overflow-hidden relative font-medium py-1.5 px-6 rounded text-[#fafafa] bg-gradient-to-r from-[#3E64FB] to-[#2C4DCF] w-40" onClick={handleVerify1}>
                  <div className="duration-300 group-hover/button:-translate-y-8 ">
                    Get OTP
                  </div>
                  <div className="absolute invisible duration-300 group-hover/button:-translate-y-6 group-hover/button:visible ml-2">
                    Get OTP
                  </div>
                </button>
              </div>
              {
                showEnterOTP && (
                  <div className=" flex justify-center items-center gap-1">
                    <input
                      className=" focus:outline-none py-1.5 px-2 rounded border border-stone-400 w-full text-stone-800"
                      type="number"
                      placeholder="OTP "
                      value={enteredOTP}
                      onChange={(e)=>setEnteredOTP(e.target.value)}
                      required
                    />
                    <button className="group/button overflow-hidden relative font-medium py-1.5 pl-6 pr-8 rounded text-[#fafafa] bg-gradient-to-r from-[#3E64FB] to-[#2C4DCF]" onClick={handleVerify2}>
                      <div className="duration-300 group-hover/button:-translate-y-8 ">
                        Verify
                      </div>
                      <div className="absolute invisible duration-300 group-hover/button:-translate-y-6 group-hover/button:visible">
                        Verify
                      </div>
                    </button>
                  </div>
                )
              }
            </div>
            <div className="grid grid-cols-2 justify-center items-center gap-2 mt-1">
              <button
                className=" border border-[#3E64FB] py-1.5 px-2 rounded bg-[#fafafa] font-semibold text-[#526ede] hover:bg-[#526ede] hover:text-[#fafafa] duration-300"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
              <button
                disabled={verified ? false : true}
                type="submit"
                className=" border border-[#3E64FB] py-1.5 px-2 rounded text-[#fafafa] font-semibold bg-[#526ede] hover:text-[#526ede] hover:bg-[#fafafa] duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </Dialog>
    </div>
  );
}
