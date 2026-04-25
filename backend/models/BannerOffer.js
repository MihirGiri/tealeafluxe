import mongoose from "mongoose";

const bannerOfferSchema = new mongoose.Schema(
  {
    discount: {
      type: String,
      required: true,
    },
    minAmount: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BannerOffer", bannerOfferSchema);
