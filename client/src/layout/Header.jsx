import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkProfileUpdate } from "../store/features/shareSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNavItem, setShowNavItem] = useState(true);
  const [udataProfilePic, setUpdateProfilePic] = useState("");
  const [refreshProfilePicValue, setRefreshProfilePicValue] = useState(false);
  const profilePicValue = useSelector((state) => state.userDetail.profilePicUpdate);

  const getProfilePic = useSelector((state) => state.userDetail.loginUserData);
  // const {
  //   user: {
  //     avatar: { url },
  //   },
  // } = getProfilePic;
  // getProfilePic.user.avatar.url;

  const handleLogin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginUserData");
    localStorage.removeItem("profilePic");
    navigate("/");
  };

  let tokenId = JSON.parse(localStorage.getItem("loginUserData"));
  useEffect(() => {
    if (tokenId) {
      setShowNavItem(false);
    } else {
      setShowNavItem(true);
    }
  }, [tokenId]);

  const pic = localStorage.getItem("profilePic");
  useEffect(() => {
    if (localStorage.getItem("profilePic")) {
      setRefreshProfilePicValue(true);
      if (pic) {
        setUpdateProfilePic(pic);
      }
    }
  }, [pic, profilePicValue]);

  if (refreshProfilePicValue) {
    dispatch(checkProfileUpdate(false));
    setRefreshProfilePicValue(false);
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!showNavItem && <img src={udataProfilePic ? udataProfilePic : getProfilePic.user.avatar.url} alt="" style={{ width: 100, height: 100, borderRadius: "50%" }} />}
      {showNavItem ? (
        <>
          <h6>
            <Link to="/register">Register</Link>
          </h6>
          <h6>
            <Link to="/login">Login</Link>
          </h6>
        </>
      ) : (
        <h6>
          <Link to="/" onClick={handleLogin}>
            Logout
          </Link>
        </h6>
      )}
    </div>
  );
};

export default Header;
