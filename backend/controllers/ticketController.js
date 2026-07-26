import Ticket from '../models/Ticket.js';
import Note from '../models/Note.js';

// Helper function to auto-generate custom sequential Ticket IDs (e.g. TKT-001)
const generateTicketId = async () => {
  const lastTicket = await Ticket.findOne().sort({ created_at: -1 });
  if (!lastTicket || !lastTicket.ticket_id) {
    return 'TKT-001';
  }

  // Extract numeric part from TKT-XXX
  const lastIdNum = parseInt(lastTicket.ticket_id.replace('TKT-', ''), 10);
  if (isNaN(lastIdNum)) {
    return 'TKT-001';
  }

  const nextIdNum = lastIdNum + 1;
  return `TKT-${String(nextIdNum).padStart(3, '0')}`;
};

// @desc    Create a new ticket
// @route   POST /api/tickets
export const createTicket = async (req, res, next) => {
  try {
    const { customer_name, customer_email, subject, description } = req.body;

    if (!customer_name || !customer_email || !subject || !description) {
      res.status(400);
      throw new Error('Please fill in all required fields');
    }

    const ticket_id = await generateTicketId();

    const ticket = await Ticket.create({
      ticket_id,
      customer_name,
      customer_email,
      subject,
      description,
    });

    res.status(201).json(ticket);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tickets with optional search and status filter
// @route   GET /api/tickets
export const getTickets = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    let query = {};

    // Filter by status if provided
    if (status && status !== 'All') {
      query.status = status;
    }

    // Search across customer_name, customer_email, ticket_id, subject, description
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { ticket_id: searchRegex },
        { customer_name: searchRegex },
        { customer_email: searchRegex },
        { subject: searchRegex },
        { description: searchRegex },
      ];
    }

    const tickets = await Ticket.find(query).sort({ created_at: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single ticket details with notes
// @route   GET /api/tickets/:ticket_id
export const getTicketById = async (req, res, next) => {
  try {
    const { ticket_id } = req.params;

    const ticket = await Ticket.findOne({ ticket_id });

    if (!ticket) {
      res.status(404);
      throw new Error('Ticket not found');
    }

    const notes = await Note.find({ ticket_id }).sort({ created_at: -1 });

    res.status(200).json({
      ...ticket.toObject(),
      notes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update ticket status and/or add a note
// @route   PUT /api/tickets/:ticket_id
export const updateTicket = async (req, res, next) => {
  try {
    const { ticket_id } = req.params;
    const { status, note_text } = req.body;

    const ticket = await Ticket.findOne({ ticket_id });

    if (!ticket) {
      res.status(404);
      throw new Error('Ticket not found');
    }

    // Update status if provided
    if (status) {
      ticket.status = status;
      await ticket.save();
    }

    // Append note if provided
    let newNote = null;
    if (note_text && note_text.trim() !== '') {
      newNote = await Note.create({
        ticket_id,
        note_text: note_text.trim(),
      });
    }

    const updatedNotes = await Note.find({ ticket_id }).sort({ created_at: -1 });

    res.status(200).json({
      ticket,
      notes: updatedNotes,
      message: 'Ticket updated successfully',
    });
  } catch (error) {
    next(error);
  }
};