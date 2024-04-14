export type Event = {
    eventType: 'SALES' | 'TAX_PAYMENT';
    date: string;
    invoiceId?: string;
    items?: Item[];
    amount?: number;
  };
  
  export type Item = {
    itemId: string;
    cost: number;
    taxRate: number;
  };
  
  export type Amendment = {
    date: string;
    invoiceId: string;
    itemId: string;
    cost: number;
    taxRate: number;
  };
  