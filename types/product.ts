export type Category = "holidays" | "literacy" | "design";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  coverImage: string;
  previewImages: string[];
  fileUrl?: string;
};

export type CategoryOption = {
  value: Category | "all";
  label: string;
};

export type FormPayload = {
  formType: "newsletter" | "contact" | "purchase-lead";
  name?: string;
  email: string;
  phone?: string;
  message?: string;
  productId?: string;
  source: "ganenet-beclick";
  timestamp: string;
};
