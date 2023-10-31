import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { toast } from "react-toastify";
import { GiIndianPalace } from "react-icons/gi";
import { AiOutlineGlobal } from "react-icons/ai";

export default function Popup({ open, setOpen, step, setStep }) {
  const [country, setCountry] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [enteredOTP, setEnteredOTP] = useState();
  const [otp, setOtp] = useState();
  const handleChangeDomestic = () => {
    setCountry("domestic")
  };
  const handleChangeInternational = () =>{
    setCountry("international")
  }

  const [showEnterOTP, setShowEnterOTP] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleClosePopup = () => {
    setOpen(false);
  };
  const handleVerify1 = () => {
    if (form.email === "" || form.phone === "" || form.name === "") {
      toast.error("Please fill all the fields");
    } else if (form.phone.length === 10) {
      const otp = Math.floor(1000 + Math.random() * 9000);
      axios
        .get(
          `https://2factor.in/API/V1/${import.meta.env.VITE_2FACTOR_API_KEY}/SMS/${
            form.phone
          }/${otp}/OTP1`
        )
        .then((res) => {
          toast.success("OTP sent successfully");
          setOtp(otp);
          setOpen(true);
          setStep(2);
          setShowEnterOTP(true);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
        });
    } else {
      toast.error("Number should be 10 digit");
    }
  };
  const handleVerify2 = () => {
    if (enteredOTP.length === 4) {
      axios
        .get(
          `https://2factor.in/API/V1/${
            import.meta.env.VITE_2FACTOR_API_KEY
          }/SMS/VERIFY3/${form.phone}/${enteredOTP}`
        )
        .then((res) => {
          console.log(res);
          if(res.data.Status === "Success"){
            toast.success("OTP Verified successfully");
            setVerified(true);
          } else if(res.data.Status=== "Error"){
            toast.error("Invalid OTP") 
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong");
        });
    } else {
      toast.error("Number should be 4 digit");
    }
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    console.log(country);
    setStep(2);
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    const userData = {
      Name: form.name,
      Email: form.email,
      Mobile: form.phone,
      Country: country,
    };
    axios
      .post(`${import.meta.env.VITE_SHEET_URI}`, userData)
      .then((res) => {
        console.log(res);
        toast.success("Data has added successfully");
        setOpen(false);
        setForm({
          name: "",
          email: "",
          phone: "",
        })
        setCountry("")
        setEnteredOTP()
        setOtp()
        setShowEnterOTP(false)
        setStep(0)
        setVerified(false)
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div>
      <div
        className={`${
          open ? "flex" : "hidden"
        } justify-center items-center duration-500 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-[#00000066] h-full w-full`}
      >
        <div
          className={` flex flex-col fixed z-50 justify-center gap-3 bg-white px-12 pt-12 pb-11 rounded-lg `}
        >
          {step === 1 ? (
            <form
              className=" flex flex-col gap-3 rounded min-[300px]:w-[200px] min-[400px]:w-[300px] sm:w-[400px]"
              onSubmit={handleSubmit1}
            >
              <h1 className=" font-bold text-stone-700 text-[27px] text-center font-sans">Country</h1>
              <div className=" grid grid-cols-2 gap-4 mb-3">
                <div onClick={handleChangeDomestic} className={` flex items-center justify-center gap-2 border ${country==="domestic" ? " border-[#829af8] bg-[#5071f7] text-slate-50" : "border-slate-400 bg-slate-50 text-stone-700"} duration-300 rounded py-1.5 px-2 font-semibold cursor-pointer`}>
                  <span><GiIndianPalace /></span>
                  <span className=" mt-0.5">Domestic</span>
                </div>
                <div onClick={handleChangeInternational} className={` flex items-center justify-center gap-2 border ${country==="international" ? "border-[#829af8] bg-[#5071f7] text-slate-50" : "border-slate-400 bg-slate-50 text-stone-700"} duration-300 rounded py-1.5 px-2 font-semibold cursor-pointer`}>
                  <span><AiOutlineGlobal /></span>
                  <span className=" mt-0.5">International</span>
                </div>
              </div>
              {/* <FormControl required>
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
              </FormControl> */}

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
              className=" flex flex-col gap-3 rounded min-[300px]:w-[200px] min-[400px]:w-[300px] sm:w-[400px]"
              onSubmit={handleSubmit2}
            >
              <div className=" flex flex-col gap-1.5 ">
                <input
                  className=" focus:outline-none py-1.5 px-2 rounded border border-stone-400 w-full text-stone-800"
                  type="text"
                  placeholder="Name "
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <input
                  className=" focus:outline-none py-1.5 px-2 rounded border border-stone-400 w-full text-stone-800"
                  type="Email"
                  placeholder="Email "
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <div className=" flex justify-center items-center gap-1">
                  <input
                    className=" focus:outline-none py-1.5 px-2 rounded border border-stone-400 w-full text-stone-800"
                    type="number"
                    placeholder="Mobile No "
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    required
                  />
                  <div
                    className="group/button overflow-hidden relative font-medium py-1.5 max-[410px]:px-1 px-6 text-center rounded text-[#fafafa] bg-gradient-to-r from-[#3E64FB] to-[#2C4DCF] w-40 cursor-pointer"
                    onClick={handleVerify1}
                  >
                    <div className="duration-300 group-hover/button:-translate-y-8 max-[410px]:ml-4">
                      Get OTP
                    </div>
                    <div className="absolute invisible duration-300 group-hover/button:-translate-y-6 group-hover/button:visible max-[410px]:ml-4 ml-2">
                      Get OTP
                    </div>
                  </div>
                </div>
                {showEnterOTP && (
                  <div className=" flex justify-center items-center gap-1">
                    <input
                      className=" focus:outline-none py-1.5 px-2 rounded border border-stone-400 w-full text-stone-800"
                      type="number"
                      placeholder="OTP "
                      value={enteredOTP}
                      onChange={(e) => setEnteredOTP(e.target.value)}
                      required
                    />
                    <div
                      className="group/button overflow-hidden relative font-medium py-1.5 pl-6 pr-8 text-center rounded text-[#fafafa] bg-gradient-to-r from-[#3E64FB] to-[#2C4DCF] cursor-pointer"
                      onClick={handleVerify2}
                    >
                      <div className="duration-300 group-hover/button:-translate-y-8 ">
                        Verify
                      </div>
                      <div className="absolute invisible duration-300 group-hover/button:-translate-y-6 group-hover/button:visible">
                        Verify
                      </div>
                    </div>
                  </div>
                )}
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
        </div>
      </div>
    </div>
  );
}
