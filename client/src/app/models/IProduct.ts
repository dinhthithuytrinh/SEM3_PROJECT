export interface IProduct {
  id: number;
  productCode: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  productType: string;
  productBrand: string;
  quantity?: number;
  status: Boolean;
  createdBy: Date;
  updateBy: Date;
}
