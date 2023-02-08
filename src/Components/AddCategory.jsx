import React, { useEffect, useState } from "react";
import "../Styles/addCategory.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import AdminRequest from "../Requests/AdminRequests";
const AddCategory = () => {
  const user = useSelector((state) => state?.Admin?.All_User);
  const { Seller, Category } = useSelector((state) => state?.Utils) || [];
  const [addCategory, setAddcategory] = useState({
    userId: null,
    category: null,
  });

  const [addSubCategory, setAddSubcategory] = useState({
    userId: null,
    categoryId: null,
    sellerId: null,
    subCategory: null,
  });
  const onCategoryInput = (e) => {
    setAddcategory({ ...addCategory, [e.target.name]: e.target.value });
  };
  const onSubCategoryInput = (e) => {
    setAddSubcategory({ ...addSubCategory, [e.target.name]: e.target.value });
  };
  const categorySubmit = (e) => {
    e.preventDefault();
    if (!addCategory.category) toast.error("Please Enter Category");
    else if (!addCategory.userId) toast.error("Please Choose User");
    else {
      axios
        .post(AdminRequest?.CATEGORY, addCategory)
        .then((res) => {
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          toast.error("something went wrong");
        });
    }
  };
  const SubCategorySubmit = (e) => {
    e.preventDefault();
    if (!addSubCategory?.userId) {
      toast.error("Please Chosse User");
    } else if (!addSubCategory?.sellerId) {
      toast.error("Please Chosse seller");
    } else if (!addSubCategory?.categoryId) {
      toast.error("Please Chosse Category");
    } else {
      axios
        .post(AdminRequest?.SUBCATEGORY, addSubCategory)
        .then((res) => {
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          toast.error("something went wrong");
        });
      console.log(addSubCategory);
    }
  };
  return (
    <>
      <section className="add-category">
        <div>
          <h2>Add Main Category</h2>
          <form>
            <input
              onChange={onCategoryInput}
              name="category"
              type="text"
              placeholder="Enter Category name"
            />
            <select onChange={onCategoryInput} name="userId" id="">
              <option value="">Choose User</option>
              {user
                ?.filter((i) => i?.type == "Admin")
                .map((item) => {
                  return <option value={item?._id}>{item?.username}</option>;
                })}
            </select>
            <input
              className="addBtn"
              type="button"
              value="Add"
              onClick={categorySubmit}
            />
          </form>
        </div>
        <div>
          <h2>Add Sub Category</h2>
          <form>
            <div>
              {" "}
              <label htmlFor="subcategory">Sub Category Name</label> <br />
              <input
                type="text"
                name="subCategory"
                placeholder="Enter Sub Category name"
                onChange={onSubCategoryInput}
              />
              <select onChange={onSubCategoryInput} name="categoryId">
                <option>Choose Category</option>
                {Category.map((item) => {
                  return <option value={item?._id}>{item?.category}</option>;
                })}
              </select>
            </div>
            <div>
              <select onChange={onSubCategoryInput} name="userId">
                <option value="">Choose User</option>
                {user
                  ?.filter((i) => i?.type == "Admin")
                  .map((item) => {
                    return <option value={item?._id}>{item?.username}</option>;
                  })}
              </select>
              <select onChange={onSubCategoryInput} name="sellerId" id="">
                <option>Choose Seller</option>
                {Seller.map((item) => {
                  return (
                    <option value={item?.seller?._id}>
                      {item?.seller?.sellerName}
                    </option>
                  );
                })}
              </select>
              <input
                className="addBtn"
                type="button"
                value="Add"
                onClick={SubCategorySubmit}
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddCategory;
