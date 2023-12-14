// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { Ctx } from "../context/Context";
// import { useSelector } from "@/storage/store";

// const PrivateRoute = ({ children }) => {
//   const { ls } = React.useContext(Ctx);
//   const location = useLocation();
//   const token = useSelector((state) => state.token.token);

//   if (token) {
//     return children;
//   } else if (ls.getItem("token")) {
//     return children;
//   } else {
//     return <Navigate to="/login" state={location.pathname} />;
//   }
// };

// export default PrivateRoute;
