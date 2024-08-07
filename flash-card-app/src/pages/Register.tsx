import React, { useEffect } from "react";
import axios from "axios";
import { apiUrl } from "@/lib/constants";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/components/forms/RegisterForm";

const Register: React.FC = () => {
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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-center">Register</CardTitle>
        </CardHeader>

        <RegisterForm />
        <CardFooter className="mt-4 p-0">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Log In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
