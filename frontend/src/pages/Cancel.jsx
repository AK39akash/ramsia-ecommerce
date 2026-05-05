import { useEffect, useContext } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Cancel = () => {

  const { backendUrl, token } = useContext(ShopContext);
  const [params] = useSearchParams();

  const navigate = useNavigate();

  const orderId = params.get("orderId");

  useEffect(() => {


    if (!orderId) {
      window.location.replace("/cart");
      return;
    }
    

    const cancelOrder = async () => {

        console.log("Calling cancel API with:", orderId);


        try {
            
            await axios.post(
              backendUrl + "/api/order/cancel",
              { orderId },
              { 
                headers: { 
                  Authorization: `Bearer ${token || localStorage.getItem("token")}` 
                } 
              }
            );

            console.log("Cancel success");

        } catch (error) {
            
            console.log("Cancel failed:", error);
        } 

        window.location.replace("/cart");

    };

    cancelOrder();

  }, []);

  

  return (
    <div className="text-center mt-28">
        <h1>Payment Cancelled</h1>
        <p>Redirecting to cart...</p>
        
    </div>

  ) 
};

export default Cancel;
