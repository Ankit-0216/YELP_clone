import React from "react";
import Header from "../components/Header";
import Addrestaurant from "../components/Addrestaurant";
import RestaurantList from "../components/RestaurantList";

const Home = () => {
  return (
    <div>
      <Header />
      <Addrestaurant />
      <RestaurantList />
    </div>
  );
};

export default Home;
