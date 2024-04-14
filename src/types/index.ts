export type Sale = {
  date: string;
  invoiceId: string;
  items: Item[];
};

export type Item = {
  itemId: string;
  cost: number;
  taxRate: number;
};

export type TaxPayment = {
  date: string;
  amount: number;
};

// export type Event = Sales | TaxPayment;

export type Amendment = {
  date: string;
  invoiceId: string;
  itemId: string;
  cost: number;
  taxRate: number;
};
