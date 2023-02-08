import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AdminOptionAction, ProductsAction } from "../Redux/Actions/Action";
import AdminRequest from "../Requests/AdminRequests";

const AddProduct = () => {
  const EditProduct = useSelector((state) => state?.Utils?.EditProduct);
  const { Seller, subCategory, Category } =
    useSelector((state) => state?.Utils) || [];
  const [category, setCategory] = useState([]);
  const [disabled, setDidabled] = useState(false);
  const [productImage, setProductImage] = useState();
  const [editProduct, setEditProduct] = useState(
    EditProduct ? EditProduct : null
  );
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    productName: null,
    mrp: null,
    price: null,
    discount: null,
    description: null,
    categoryId: null,
    subCategoryId: null,
    sellerID: null,
  });
  const onCategoryChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    setCategory(subCategory.filter((i) => i.categoryId == e.target.value));
    console.log(category);
  };

  const imageChange = (e) => {
    let img = document.getElementById("img");
    let selectedImage = document.getElementById("selectImage");
    img.src = URL.createObjectURL(e.target.files[0]);
    setProductImage(e.target.files[0]);
    selectedImage.style.display = "none";
    img.style.display = "inline-block";
  };

  const onInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const AddProducts = () => {
    console.log(product);
    const Product = new FormData();
    product.price = product.mrp - (product.mrp * product.discount) / 100;
    Product.append("productImage", productImage);
    Product.append("productName", product.productName);
    Product.append("categoryId", product.categoryId);
    Product.append("subCategoryId", product.subCategoryId);
    Product.append("price", product.price);
    Product.append("sellerID", product.sellerID);
    Product.append("mrp", product.mrp);
    Product.append("discount", product.discount);
    Product.append("description", product.description);
    Product.append("disabled", disabled);
    axios
      .post(AdminRequest.ADD_PRODUCT, Product)
      .then((response) => {
        console.log(response);
        if (response.data?.message) {
          toast.success("Product Added successfully!!");
          axios
            .get(AdminRequest.GET_ALL_PRODUCTS)
            .then((response) => {
              dispatch(ProductsAction(response.data));
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          toast.error("Enter valid data");
        }
      })
      .catch((error) => {
        toast.success("Something Went Wrong");
      });
  };
  const EditProducts = (id) => {
    editProduct.price =
      editProduct.mrp - (editProduct.mrp * editProduct.discount) / 100;
    axios
      .put(AdminRequest.EDIT_PRODUCT + id, editProduct)
      .then((response) => {
        if (response.data) {
          axios
            .get(AdminRequest.GET_ALL_PRODUCTS)
            .then((response) => {
              dispatch(ProductsAction(response.data));
              dispatch(AdminOptionAction("product"));
              toast.success("Product Edited Successfully");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onEditInput = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };
  return (
    <>
      {(EditProduct !== null) | undefined ? (
        <>
          <section className="add-product">
            <section className="add-prod-detail">
              <div id="selectImage">
                <img
                  id="img"
                  src={
                    AdminRequest.GET_PRODUCT_IMAGE + EditProduct?.productImage
                  }
                  height="200px"
                  width="200px"
                />
              </div>
              <div>
                <label htmlFor="category">Main Category Name</label> <br />
                <select
                  name="categoryId"
                  id="mainCategory"
                  defaultValue={EditProduct?.mainCategory}
                  onChange={onEditInput}
                >
                  <option style={{ color: "black" }}>Food</option>
                  <option style={{ color: "black" }}>Grocery</option>
                </select>
                <label htmlFor="category">Category Name</label> <br />
                <select
                  name="subCategoryId"
                  id="category"
                  defaultValue={EditProduct?.category}
                  onChange={onEditInput}
                >
                  {Category?.map((item, i) => {
                    return (
                      <option key={i} style={{ color: "black" }}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label htmlFor="title">Product Name</label> <br />
                <input
                  name="productName"
                  type="text"
                  id="productName"
                  onChange={onEditInput}
                  defaultValue={EditProduct?.productName}
                />
              </div>
              <div className="price">
                <div>
                  <label htmlFor="mrp">MRP</label>
                  <input
                    onChange={onEditInput}
                    name="mrp"
                    type="number"
                    id="mrp"
                    defaultValue={EditProduct?.mrp}
                  />
                </div>
                <div>
                  <label htmlFor="discount">Discount</label>
                  <input
                    onChange={onEditInput}
                    name="discount"
                    type="number"
                    id="discount"
                    defaultValue={EditProduct?.discount}
                  />
                </div>
                <div>
                  <label htmlFor="price">Price</label>
                  <input
                    name="price"
                    type="number"
                    id="price"
                    value={
                      editProduct.mrp -
                      (editProduct.mrp * editProduct.discount) / 100
                    }
                    // defaultValue={EditProduct?.price}
                  />
                </div>
              </div>
            </section>
            <section className="add-prod-detail">
              <div></div>
              <div>
                <label htmlFor="brand">Brand Name</label> <br />
                <input
                  onChange={onEditInput}
                  type="text"
                  name="brand"
                  id="brand"
                />
              </div>

              <div>
                <label htmlFor="xyz">Shop Keeper</label> <br />
                <select name="sellerID" id="sellerName" onChange={onEditInput}>
                  {Seller?.map((i) => {
                    return (
                      <>
                        <option
                          key={i?.seller?._id}
                          style={{ color: "black" }}
                          value={i?.seller?._id}
                        >
                          {i?.seller?.sellerName}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
              <div>
                <label htmlFor="desc">Description</label> <br />
                <textarea
                  name="description"
                  id=""
                  onChange={onEditInput}
                  defaultValue={EditProduct?.description}
                ></textarea>
              </div>
              <div>
                <input
                  style={{ background: "orange", color: "white" }}
                  type="submit"
                  value="Edit Product"
                  onClick={() => EditProducts(EditProduct?._id)}
                />
              </div>
            </section>
          </section>
        </>
      ) : (
        <>
          <>
            <section className="add-product">
              <section className="add-prod-detail">
                <div id="selectImage">
                  <label htmlFor="image">Browse Image</label> <br />
                  <input
                    onChange={imageChange}
                    type="file"
                    hidden
                    name="image"
                    id="image"
                  />
                </div>
                <img id="img" />
                <div>
                  <label htmlFor="title">Product Name</label> <br />
                  <input
                    name="productName"
                    type="text"
                    id="productName"
                    onChange={onInput}
                  />
                </div>
                <div>
                  <label htmlFor="xyz">Shop Keeper</label> <br />
                  <select name="sellerID" id="sellerName" onChange={onInput}>
                    {Seller.map((item) => {
                      return (
                        <option
                          style={{ color: "black" }}
                          value={item?.seller?._id}
                        >
                          {item?.seller?.sellerName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label htmlFor="category">Main Category Name</label> <br />
                  <select
                    name="categoryId"
                    id="mainCategory"
                    defaultValue={EditProduct?.mainCategory}
                    onChange={onCategoryChange}
                  >
                    <option style={{ color: "black" }}>
                      Select Main Category
                    </option>
                    {Category?.map((item) => {
                      return (
                        <option value={item?._id} style={{ color: "black" }}>
                          {item?.category}
                        </option>
                      );
                    })}
                  </select>
                  <label htmlFor="category">Category Name</label> <br />
                  <select
                    name="subCategoryId"
                    id="category"
                    defaultValue={EditProduct?.category}
                    onChange={onInput}
                  >
                    <option style={{ color: "black" }}>
                      Select sub Category
                    </option>
                    {category.map((item) => {
                      return (
                        <option value={item?._id} style={{ color: "black" }}>
                          {item?.subCategory}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </section>
              <section className="add-prod-detail">
                <div></div>
                <div>
                  <label htmlFor="brand">Brand Name</label> <br />
                  <input
                    onChange={onInput}
                    type="text"
                    name="brand"
                    id="brand"
                  />
                </div>

                <div>
                  <label htmlFor="desc">Description</label> <br />
                  <textarea
                    name="description"
                    id=""
                    onChange={onInput}
                  ></textarea>
                </div>
                <div className="price">
                  <div>
                    <label htmlFor="mrp">MRP</label>
                    <input
                      onChange={onInput}
                      name="mrp"
                      type="number"
                      id="mrp"
                    />
                  </div>
                  <div>
                    <label htmlFor="discount">Discount</label>
                    <input
                      onChange={onInput}
                      name="discount"
                      type="number"
                      id="discount"
                    />
                  </div>
                  <div>
                    <label htmlFor="price">Price</label>
                    <input
                      name="price"
                      type="number"
                      id="price"
                      value={
                        product.mrp - (product.mrp * product.discount) / 100
                      }
                    />
                  </div>
                </div>
                <div>
                  <input
                    style={{ background: "red", color: "white" }}
                    type="submit"
                    value="Add Product"
                    onClick={() => AddProducts()}
                  />
                </div>
              </section>
            </section>
          </>
        </>
      )}
    </>
  );
};

export default AddProduct;
