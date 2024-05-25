import {
  BrandListServices,
  CategoryListServices,
  SliderListServices,
  ListByBrandServices,
  ListByCategoryServices,
  ListBySimillerServices,
  ListByKeywordServices,
  ListByRemarkServices,
  ReviewListServices,
  ProductDetailsServices,
  CreateReviewService
} from "../services/ProductServices.js";

export const ProductBrandList = async (req, res) => {
  let result = await BrandListServices()
  res.status(200).json(result)
};

export const ProductCategoryList = async (req, res) => {
    let result = await CategoryListServices()
  res.status(200).json(result)
};

export const ProductSliderList = async (req, res) => {
    let result = await SliderListServices()
  res.status(200).json(result)
};





export const ProductListByBrand = async (req, res) => {
    let result = await ListByBrandServices(req)
    res.status(200).json(result)
};

export const ProductListByCategory = async (req, res) => {
    let result = await ListByCategoryServices(req)
    res.status(200).json(result)
};

export const ProductListByRemark = async (req, res) => {
  let result = await ListByRemarkServices(req)
  res.status(200).json(result)
};






export const ProductListBySimiller = async (req, res) => {
    let result = await ListBySimillerServices(req)
    res.status(200).json(result)
};

export const ProductListByKeyword = async (req, res) => {
  let result = await ListByKeywordServices(req)
  res.status(200).json(result)
};

export const ProductDetails = async (req, res) => {
  let result = await ProductDetailsServices(req)
  res.status(200).json(result)
};

export const ProductReviewList = async (req, res) => {
  let result = await ReviewListServices(req)
  res.status(200).json(result)
};


export const CreateReview=async(req,res)=>{
  let result=await CreateReviewService(req);
  return res.status(200).json(result)
}