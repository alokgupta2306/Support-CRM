import express from 'express';
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
} from '../controllers/ticketController.js';

const router = express.Router();

// Base route: /api/tickets
router.route('/')
  .post(createTicket)
  .get(getTickets);

// Single ticket route: /api/tickets/:ticket_id
router.route('/:ticket_id')
  .get(getTicketById)
  .put(updateTicket);

export default router;