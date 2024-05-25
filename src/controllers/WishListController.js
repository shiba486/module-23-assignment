

import {
  SaveWishListService,
  RemoveWishListServices,
  WishListService,
} from "../services/WishListServices.js";

export const SaveWishList = async (req, res) => {
  let result = await SaveWishListService(req);
  res.status(200).json(result);
};

export const RemoveWishList = async (req, res) => {
  let result = await RemoveWishListServices(req);
  res.status(200).json(result);
};

export const WishList = async (req, res) => {
  let result = await WishListService(req);
  res.status(200).json(result);
};
