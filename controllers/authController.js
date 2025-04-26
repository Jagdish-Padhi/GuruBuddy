import Teacher from "../models/teacher.js";
 
const sendToken = (res, teacher) => {
  const token = teacher.generateJWT();
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    
    maxAge: 24 * 60 * 60 * 1000,
  });
};

//loading login page
export const renderLogin = (req, res) => {
  res.render("login", {
    scsMsg: null,
    errMsg: null,
    layout: false,
  });
};

// loading signUp page
export const renderSignup = (req, res) => {
  res.render("signUp", { layout: false, scsMsg: null, errMsg: null });
};

//for signUp 
export const signup = async (req, res) => {
  try {
    const { TeacherName, Subject, email, password } = req.body;
    const teacher = new Teacher({ TeacherName, Subject, email, password });
    await teacher.save();
    sendToken(res, teacher);
    return res.render("home", {
      scsMsg: "User account created successfully",
      errMsg: null,
      title: "Home",
    });
  } catch (error) {
    return res.render("signUp", {
      scsMsg: null,
      errMsg: "User already exists please login!",
      layout: false,
    });
  }
};

//for login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.render("login", {
        scsMsg: null,
        errMsg: "User does not exists!",
        layout: false,
      });
    } else if (!(await teacher.comparePassword(password))) {
      return res.render("login", {
        scsMsg: null,
        errMsg: "Incorrect password!",
        layout: false,
      });
    }
    sendToken(res, teacher);
    return res.render("home", {
      scsMsg: "You are logged in successfully!",
      errMsg: null,
      title: "Home"
    });
  } catch (error) {
    return res.render("login", {
      scsMsg: null,
      errMsg: "Something went wrong!",
      layout: false,
    });
  }
};

//for logOut
export const logout = (req, res) => {
  res.clearCookie("token");
  res.render("login", {
    layout: false,
    scsMsg: "Logged out successfully!",
    errMsg: null,
  });
};
