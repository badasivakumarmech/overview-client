import React from "react";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
// import logo from "../src/All Images/pab bottom-logo (1).jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import sideimage from "../All Images/Logo133.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import siva from "../All Images/Siva Image.jpeg";
import Sidebar from "../Sidebar";

const Learning = () => {
  const [subscriptionType, setSubscriptionType] = useState("");

  const handleSubscriptionChange = (e) => {
    setsubscription(e.target.value);
  };

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [addblogslist, setAddblogslist] = useState([]);
  const [addblogslist1, setAddblogslist1] = useState([]);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showInstitutionsOptions, setShowInstitutionsOptions] = useState(false);
  const [institutetypeCounts, setInstitutetypeCounts] = useState({});

  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };
  useEffect(() => {
    fetchblogs();
    fetchblogs1();
    if (token == undefined) {
      navigate("/");
    }
  }, []);

  const fetchblogs1 = async () => {
    const api = "http://localhost:4010/DisplayAllVideos";
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk"; // Replace with your actual authentication token

    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = response.data;
      setAddblogslist1(data);

      const institutetypeCounts = {};
      data.forEach((item) => {
        const VideofolderName = item.VideofolderName;
        if (institutetypeCounts[VideofolderName]) {
          institutetypeCounts[VideofolderName] += 1;
        } else {
          institutetypeCounts[VideofolderName] = 1;
        }
      });

      setInstitutetypeCounts(institutetypeCounts);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  console.log(institutetypeCounts);

  const fetchblogs = async () => {
    const api = "http://localhost:4010/alllearningpathsDetails";
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk";
    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setAddblogslist(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  //Add Institute

  const [learningPathTitle, setlearningPathTitle] = useState("");
  const [relevantSkillTags, setrelevantSkillTags] = useState("");
  const [coverLetter, setcoverLetter] = useState("");
  const [difficultyLevel, setdifficultyLevel] = useState("");
  const [subscription, setsubscription] = useState("");
  const [price, setprice] = useState("");
  const [discount, setdiscount] = useState("");
  const [AboutLearnPath, setAboutLearnPath] = useState("");
  const [authorName, setauthorName] = useState("");
  const [hours, sethours] = useState("");
  const [minutes, setminutes] = useState("");
  const [learningimg, setlearningimg] = useState("");
  const [fileName, setfileName] = useState("");
  const [requirements, setrequirements] = useState("");

  const [data1, setdata1] = useState([]);

  const AddPathDetails1 = {
    learningPathTitle: learningPathTitle,
    relevantSkillTags: relevantSkillTags,
    coverLetter: coverLetter,
    difficultyLevel: difficultyLevel,
    subscription: subscription,
    price: price,
    discount: discount,
    AboutLearnPath: AboutLearnPath,
    authorName: authorName,
    hours: hours,
    minutes: minutes,
    learningimg: learningimg,
    fileName: fileName,
    requirements: requirements,
  };
  console.log(AddPathDetails1);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (
      learningPathTitle &&
      relevantSkillTags &&
      coverLetter &&
      difficultyLevel &&
      subscription &&
      AboutLearnPath &&
      authorName &&
      hours &&
      minutes &&
      learningimg &&
      fileName &&
      requirements !== ""
    ) {
      const headers = {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk", // Replace with your actual token
      };

      const AddPathDetails = {
        learningPathTitle: learningPathTitle,
        relevantSkillTags: relevantSkillTags,
        coverLetter: coverLetter,
        difficultyLevel: difficultyLevel,
        subscription: subscription,
        price: price,
        discount: discount,
        AboutLearnPath: AboutLearnPath,
        authorName: authorName,
        hours: hours,
        minutes: minutes,
        learningimg: learningimg,
        fileName: fileName,
        requirements: requirements,
      };

      axios
        .post("http://localhost:4010/addlearningpath", AddPathDetails, {
          headers,
        })
        .then((response) => {
          setdata1(response.data);

          console.log(response.data);
          if (response.status === 200) {
            const currentTime = new Date().toLocaleTimeString();
            const savedTimes =
              JSON.parse(localStorage.getItem("savedTimes")) || [];

            savedTimes.push(currentTime);
            localStorage.setItem("savedTimes", JSON.stringify(savedTimes));
            toast.success("Path Created Successfully", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setTimeout(function () {
              navigate("/Learn");
            }, 3000);

            fetchblogs();
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            toast.warning("Path Already Registered", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else {
            console.log(error.message);
          }
        });
    } else {
      toast.warning("Enter the Required Details");
    }
  };

  console.log(data1);

  const handleDelete = async (id) => {
    try {
      if (!id) {
        setError("Invalid ID provided for deletion.");
        return;
      }
      console.log("Deleting institute with ID:", id);
      const response = await axios.delete(
        "http://localhost:4010/deleteVideo/" + id
      );
      if (response.status === 200) {
        toast.success("Success: Institute deleted", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        fetchblogs();

        const updatedListLength = addblogslist.length - 1;
        console.log("Updated list length:", updatedListLength);
      } else {
        console.log(response.data);
        alert("Error: " + response.data);
        setError("An error occurred while deleting the institute.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while deleting the institute.");
    }
  };

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    menuBtnChange();
  };

  const menuBtnChange = () => {
    const sidebar = document.querySelector(".sidebar");

    if (sidebar) {
      const closeBtn = document.querySelector("#btn");
      const searchBtn = document.querySelector(".bx-search");

      if (sidebar.classList.contains("open")) {
        closeBtn?.classList.replace("bx-menu", "bx-menu-alt-right");
      } else {
        closeBtn?.classList.replace("bx-menu-alt-right", "bx-menu");
      }
    } else {
      console.error("Sidebar element not found");
    }
  };
  // Corporate Office
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className=" ">
            <div className="row">
              {isOpen && (
                <div className=" col-12 col-lg-3 col-md-12 sectioncard121">
                  <Sidebar />
                </div>
              )}
              <div
                className={`my-3 col-12 col-md-${isOpen ? 12 : 9} col-lg-${
                  isOpen ? 9 : 12
                }`}
              >
                <div className="">
                  <i
                    className="fa-solid fa-bars bars d-lg-block d-none"
                    onClick={toggleSidebar}
                  ></i>
                  <div class="">
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
                      theme="light"
                    />
                    <div>
                      <div className="batch_card p-3">
                        <div>
                          <p>Learning Path</p>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Learning Path"
                            style={{ border: "1px solid #dee2e6" }}
                            onChange={(e) =>
                              setlearningPathTitle(e.target.value)
                            }
                            value={learningPathTitle}
                          />
                        </div>
                      </div>
                      <div className="batch_card p-3">
                        <div>
                          <p>Tags</p>
                          <select
                            className="p-1 form-control"
                            onChange={(e) =>
                              setrelevantSkillTags(e.target.value)
                            }
                          >
                            <option value="">--Select Relavent Tags --</option>
                            <option value="AWS">AWS</option>
                            <option value="Database">Database</option>
                            <option value="DataScience">DataScience</option>
                            <option value="DevOps">DevOps</option>
                            <option value="Mobile App Developement">
                              Mobile App Developement
                            </option>
                            <option value="Programming">Programming</option>
                            <option value="Scripting">Scripting</option>
                            <option value="Software Testing">
                              Software Testing
                            </option>
                            <option value="Test Preparation">
                              Test Preparation
                            </option>
                            <option value="Web Development">
                              Web Development
                            </option>
                            <option value="Web Services">Web Services</option>
                            <option value="Verbal and Communication">
                              Verbal and Communication
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="batch_card p-3">
                        <div>
                          <p>Cover Letter</p>
                          {/* <input type="text" className="form-control"/> */}
                          <textarea
                            className="form-control"
                            rows={4}
                            onChange={(e) => setcoverLetter(e.target.value)}
                            value={coverLetter}
                          ></textarea>
                        </div>
                      </div>
                      <div className="batch_card p-3">
                        <div>
                          <p>Defficulty</p>
                          <select
                            className="p-1 form-control"
                            onChange={(e) => setdifficultyLevel(e.target.value)}
                            value={difficultyLevel}
                          >
                            <option value="">--Select Defficulty --</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                        </div>
                      </div>
                      <div className="batch_card p-3">
                        <div>
                          <p>Subcription</p>
                          {/* <select
                            className="p-1 form-control"
                            onChange={(e) => setsubscription(e.target.value)}
                          >
                            <option value="">--Select Subcription --</option>
                            <option value="Free">Free</option>
                            <option value="Paid">Paid</option>
                          </select> */}
                          <select
                            className="p-1 form-control"
                            onChange={(e) => setsubscription(e.target.value)}
                            value={subscription}
                          >
                            <option value="">--Select Subscription--</option>
                            <option value="Free">Free</option>
                            <option value="Paid">Paid</option>
                          </select>
                        </div>
                      </div>
                      {/* {subscriptionType === "Paid" && (
                        <div>
                          <div className="batch_card p-3">
                            <div>
                              <p>Price</p>
                              <input
                                type="number"
                                className="form-control"
                                onChange={(e) => setprice(e.target.value)}
                                value={price}
                              />
                            </div>
                          </div>
                          <div className="batch_card p-3">
                            <div>
                              <p>Discount</p>
                              <input
                                type="number"
                                className="form-control"
                                onChange={(e) => setdiscount(e.target.value)}
                                value={discount}
                              />
                            </div>
                          </div>
                        </div>
                      )} */}
                      {subscription === "Paid" && (
                        <div>
                          <div className="batch_card p-3">
                            <div>
                              <p>Price</p>
                              <input
                                type="number"
                                className="form-control"
                                onChange={(e) => setprice(e.target.value)}
                                value={price}
                              />
                            </div>
                          </div>
                          <div className="batch_card p-3">
                            <div>
                              <p>Discount</p>
                              <input
                                type="number"
                                className="form-control"
                                onChange={(e) => setdiscount(e.target.value)}
                                value={discount}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="batch_card p-3">
                        <div>
                          <p>About This Learning Path</p>
                          <textarea
                            className="form-control"
                            rows={6}
                            onChange={(e) => setAboutLearnPath(e.target.value)}
                            value={AboutLearnPath}
                          ></textarea>
                        </div>
                      </div>
                      <div className="batch_card p-3">
                        <div>
                          <p>Author</p>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="author"
                            style={{ border: "1px solid #dee2e6" }}
                            onChange={(e) => setauthorName(e.target.value)}
                            value={authorName}
                          />
                        </div>
                      </div>
                      <div className="batch_card p-3">
                        <div className="row">
                          <div className="col-lg-3">
                            <div>
                              <p>Hours</p>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="author"
                                onChange={(e) => sethours(e.target.value)}
                                value={hours}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div>
                              <p>Minutes</p>
                              <input
                                type="number"
                                className="form-control"
                                onChange={(e) => setminutes(e.target.value)}
                                value={minutes}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div>
                              <p>Learning Page</p>
                              <input
                                type="file"
                                className="form-control"
                                placeholder="author"
                                onChange={(e) => setlearningimg(e.target.value)}
                                value={learningimg}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="batch_card p-3">
                        <div className="batch_flex mb-4">
                          <p>What You'll Learn</p>
                          <div>
                            <button className="year"> + Add</button>
                          </div>
                        </div>
                        <div>
                          <input
                            type="text"
                            className="form-control"
                            style={{ border: "1px solid #dee2e6" }}
                            onChange={(e) => setfileName(e.target.value)}
                            value={fileName}
                          />
                        </div>
                      </div>
                      <div className="batch_card p-3">
                        <div className="batch_flex mb-4">
                          <p>Requirement</p>
                          <div>
                            <button className="year"> + Add</button>
                          </div>
                        </div>
                        <div>
                          <input
                            type="text"
                            className="form-control"
                            style={{ border: "1px solid #dee2e6" }}
                            onChange={(e) => setrequirements(e.target.value)}
                            value={requirements}
                          />
                        </div>
                      </div>
                      <div>
                        <button className="create_btn" onClick={onSubmitForm}>
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;
