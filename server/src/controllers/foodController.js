import FoodItem from '../models/FoodItem.js';

/**
 * Create food item
 */
export async function createFood(req, res, next) {
  try {
    const { name, category, quantity, unit, expiryDate, notes } = req.body;
    if (!name || !category) return res.status(400).json({ error: 'Name and category required' });
    const item = new FoodItem({ name, category, quantity, unit, expiryDate, notes });
    await item.save();
    res.status(201).json(item);
  } catch (err) { next(err); }
}

/**
 * List food items (filter, search, paginate)
 */
export async function listFood(req, res, next) {
  try {
    const { page = 1, limit = 10, category, q } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (q) filter.name = new RegExp(q, 'i');
    const items = await FoodItem.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(items);
  } catch (err) { next(err); }
}

/**
 * Get by id
 */
export async function getFood(req, res, next) {
  try {
    const item = await FoodItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) { next(err); }
}

/**
 * Update item
 */
export async function updateFood(req, res, next) {
  try {
    const item = await FoodItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) { next(err); }
}

/**
 * Delete item
 */
export async function deleteFood(req, res, next) {
  try {
    const item = await FoodItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
}
