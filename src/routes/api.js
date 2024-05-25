import { Router } from "express";
import {
  ProductBrandList,
  ProductCategoryList,
  ProductSliderList,
  ProductListByBrand,
  ProductListByCategory,
  ProductListBySimiller,
  ProductListByKeyword,
  ProductListByRemark,
  ProductDetails,
  ProductReviewList,
  CreateReview
} from "../controllers/ProductController.js";

import {
  UserOtp,
  VerifyOTP,
  UserLogout,
  CreateProfile,
  UpdateProfile,
  ReadProfile,
} from "../controllers/UserController.js";

import { authVerification } from "./../middlewares/authVerification.js";

import {
  SaveWishList,
  RemoveWishList,
  WishList,
} from "./../controllers/WishListController.js";

import {
  SaveList,
  RemoveCartList,
  CartList,
} from "./../controllers/CartController.js";


import {FeaturesList} from "./../controllers/FeatureController.js"

const router = Router();


// Product Routes
router.get("/ProductBrandList", ProductBrandList);
router.get("/ProductCategoryList", ProductCategoryList);
router.get("/ProductSliderList", ProductSliderList);
router.get("/ProductListByBrand/:BrandID", ProductListByBrand);
router.get("/ProductListByCategory/:CategoryID", ProductListByCategory);
router.get("/ProductListByRemark/:Remark", ProductListByRemark);
router.get("/ProductListBySimiller/:CategoryID", ProductListBySimiller);
router.get("/ProductListByKeyword/:Keyword", ProductListByKeyword);
router.get("/ProductDetails/:ProductID", ProductDetails);
router.get("/ProductReviewList/:ProductID", ProductReviewList);

//USER ROUTE
router.get("/UserOTP/:email", UserOtp);
router.get("/VerifyLogin/:email/:otp", VerifyOTP);
router.get("/UserLogout", authVerification, UserLogout);

router.post("/CreateProfile", authVerification, CreateProfile);
router.post("/UpdateProfile", authVerification, UpdateProfile);
router.get("/ReadProfile", authVerification, ReadProfile);

//WISH ROUTE
router.post("/SaveWishList", authVerification, SaveWishList);
router.post("/RemoveWishList", authVerification, RemoveWishList);
router.get("/WishList", authVerification, WishList);


//CARTS ROUTE

router.post("/SaveList", authVerification, SaveList);

router.post("/RemoveCartList", authVerification, RemoveCartList);
router.get("/CartList", authVerification, CartList);


export default router