import { Router, Request, Response } from 'express';
import { UserService } from '../services/userService.js';
import { CreateUserDto, UpdateUserDto } from '@repo/types';

const router: Router = Router();
const userService = new UserService();

// GET /api/users - Get all users
router.get('/', (req: Request, res: Response) => {
  try {
    const users = userService.getAllUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = userService.getUserById(id as string);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
});

// POST /api/users - Create a new user
router.post('/', (req: Request, res: Response) => {
  try {
    const userData: CreateUserDto = req.body;

    // Validate required fields
    if (!userData.name || !userData.email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name and email are required' 
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email format' 
      });
    }

    const newUser = userService.createUser(userData);
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    if (error instanceof Error && error.message.includes('already exists')) {
      return res.status(409).json({ 
        success: false, 
        error: error.message 
      });
    }
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
});

// PUT /api/users/:id - Update a user
router.put('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userData: UpdateUserDto = req.body;

    // Validate email format if provided
    if (userData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid email format' 
        });
      }
    }

    const updatedUser = userService.updateUser(id as string, userData);

    if (!updatedUser) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    res.json({ success: true, data: updatedUser });
  } catch (error) {
    if (error instanceof Error && error.message.includes('already exists')) {
      return res.status(409).json({ 
        success: false,   
        error: error.message 
      });
    }
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
});

// DELETE /api/users/:id - Delete a user
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = userService.deleteUser(id as string);

    if (!deleted) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
});

export default router;

