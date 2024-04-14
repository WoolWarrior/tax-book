import { Event, Item, Amendment } from '../types/event';

let events: Event[] = [];
let amendments: Amendment[] = [];

export const addEvent = (event: Event) => {
  // Apply any pending amendments
  const pendingAmendments = amendments.filter(am => am.invoiceId === event.invoiceId);
  pendingAmendments.forEach(am => {
    const item = event.items?.find(it => it.itemId === am.itemId);
    if (item) {
      item.cost = am.cost;
      item.taxRate = am.taxRate;
    } else if (event.items) {
      event.items.push({ itemId: am.itemId, cost: am.cost, taxRate: am.taxRate });
    }
  });

  events.push(event);
};

export const amendSale = (amendment: Amendment) => {
  const event = events.find(e => e.invoiceId === amendment.invoiceId);
  if (event) {
    const item = event.items?.find(it => it.itemId === amendment.itemId);
    if (item) {
      item.cost = amendment.cost;
      item.taxRate = amendment.taxRate;
    } else if (event.items) {
      event.items.push({ itemId: amendment.itemId, cost: amendment.cost, taxRate: amendment.taxRate });
    }
  } else {
    // Store amendment for future processing
    amendments.push(amendment);
  }
};

export const getEvents = () => events;
export const getAmendments = () => amendments;
