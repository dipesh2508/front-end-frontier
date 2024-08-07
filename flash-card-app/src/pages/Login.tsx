import React, { useEffect } from "react";
import axios from "axios";
import { apiUrl } from "@/lib/constants";
import { Link, useNavigate } from "react-router-dom";
import LogInForm from "@/components/forms/LogInForm";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const checkValidToken = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        navigate("/profile");
      }
    } catch (error: any) {
      console.log("Invalid token");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkValidToken();
    }
  });

  return (
    <div className="flex items-center flex-col justify-center h-screen gap-8 bg-gray-100">
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-center">Log In</CardTitle>
        </CardHeader>

        <LogInForm />
        <CardFooter className="mt-4 p-0">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
