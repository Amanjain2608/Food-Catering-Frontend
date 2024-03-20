import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousal from "../components/Carousal";


function Home() {
  const[search,setSearch]=useState('');
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "Post",
      headers: {
        "content-type": "application/json",
      },
    });
    response = await response.json();
    setfoodItem(response[0]);
    setfoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade"  style={{objectFit:"contain !important"}} >
      <div className="carousel-inner"  id="carousal" >
        <div className="carousel-caption" style={{ zIndex: "10" }}>
          <div className="input-group" style={{display:"inline"}}>
            <div id="search-autocomplete" className="form-outline">
              <input type="search" id="form1" className="form-control" placeholder="Search here" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
            </div>
          </div>
        </div>
        <div className="carousel-item active">
          <img
            src="https://www.herwholesomekitchen.com/wp-content/uploads/2021/02/cobbsaladrecipe-1.jpg"
            className="d-block w-100"
            alt="..."
            style={{filter:"brightness(30%)"}}
          />
        </div>

        <div className="carousel-item">
          <img
            src="https://media.istockphoto.com/id/1349067702/photo/greek-salad-with-vinaigrette-dressing-topped-with-grilled-chicken.jpg?s=612x612&w=0&k=20&c=Y5mZbUb_uAPK90lGEM2pwxt_jxd7-8Uz_CdZ_Ikn4HU="
            className="d-block w-100"
            style={{filter:"brightness(30%)"}}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://static.toiimg.com/thumb/58910127.cms?width=1200&height=900"
            className="d-block w-100"
            alt="..."
            style={{filter:"brightness(30%)"}}
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
      </div>
      <div className="container m-3">
        {foodCat !== []
          ? foodCat?.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data.id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== [] ? (
                    foodItem
                      .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())) )
                      .map((filterItems) => {
                        // console.log(filterItems);
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3 m-3"
                          >
                            <Card
                             foodItems ={filterItems} 
                             options={filterItems.options[0]}
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div>No such data found </div>
                  )}
                </div>
              );
            })
          : " "}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
