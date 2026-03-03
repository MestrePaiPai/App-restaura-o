import { z } from 'zod';

export const orderSchema = z.object({
  items: z.array(
    z.object({
      menuItemId: z.string(),
      qty: z.number().int().positive(),
      notes: z.string().max(280).optional()
    })
  ).min(1)
});

export const paymentSchema = z.object({
  method: z.enum(['CASH', 'MBWAY', 'MULTIBANCO']),
  customerPhone: z.string().optional()
});
