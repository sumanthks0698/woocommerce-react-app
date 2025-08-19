// Parse text-based rules into MongoDB query
export const parseRules = (rulesText) => {
  const lines = rulesText.split('\n').filter(line => line.trim());
  const query = {};
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    
    // Parse: field operator value
    const match = trimmedLine.match(/^(\w+)\s*(=|!=|>=|<=|>|<)\s*(.+)$/);
    if (!match) {
      throw new Error(`Invalid rule format: "${trimmedLine}". Expected: field operator value`);
    }
    
    const [, field, operator, rawValue] = match;
    const value = parseValue(rawValue.trim(), field);
    
    // Validate field
    const validFields = ['id', 'title', 'price', 'stock_status', 'stock_quantity', 'category', 'tags', 'on_sale', 'created_at'];
    if (!validFields.includes(field)) {
      throw new Error(`Invalid field: "${field}". Valid fields: ${validFields.join(', ')}`);
    }
    
    // Convert operator to MongoDB query
    switch (operator) {
      case '=':
        if (field === 'tags') {
          query[field] = { $in: [value] };
        } else {
          query[field] = value;
        }
        break;
      case '!=':
        if (field === 'tags') {
          query[field] = { $nin: [value] };
        } else {
          query[field] = { $ne: value };
        }
        break;
      case '>':
        query[field] = { $gt: value };
        break;
      case '<':
        query[field] = { $lt: value };
        break;
      case '>=':
        query[field] = { $gte: value };
        break;
      case '<=':
        query[field] = { $lte: value };
        break;
      default:
        throw new Error(`Unsupported operator: ${operator}`);
    }
  }
  
  return query;
};

// Parse value based on field type
const parseValue = (value, field) => {
  // Remove quotes if present
  const cleanValue = value.replace(/^["']|["']$/g, '');
  
  // Numeric fields
  if (['id', 'price', 'stock_quantity'].includes(field)) {
    const numValue = parseFloat(cleanValue);
    if (isNaN(numValue)) {
      throw new Error(`Invalid numeric value for ${field}: ${value}`);
    }
    return numValue;
  }
  
  // Boolean fields
  if (field === 'on_sale') {
    if (cleanValue.toLowerCase() === 'true') return true;
    if (cleanValue.toLowerCase() === 'false') return false;
    throw new Error(`Invalid boolean value for ${field}: ${value}. Use true or false`);
  }
  
  // String fields
  return cleanValue;
};