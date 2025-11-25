import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/product`
      );
      console.log(response.data);
      setProduct(response.data);
      return response.data;
    }
    // const data = fetchData();
    // console.log(data);
    fetchData();
  });

  return <div className="flex flex-wrap gap-5 m-auto mt-10">
    {product.map((e) => (
        <div key={e._id} className="p-2 rounded" >
            <img src={e.imageUrl} alt="product_image" className="h-50 " />
            <p>Price : ${e.price}</p>
            <p>Rating : ${e.rating}</p>
        </div>
    ))}
  </div>;
};

export default Dashboard;
