// parse text rules into structured conditions
function parseRules(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const allowed = new Set(['id','title','price','stock_status','stock_quantity','category','tags','on_sale','created_at']);
  const conditions = [];

  const lineRegex = /^(\w+)\s*(==|=|!=|>=|<=|>|<|contains)\s*(.+)$/i;

  for (const line of lines) {
    const m = line.match(lineRegex);
    if (!m) {
      return { error: `Invalid rule syntax: "${line}"` };
    }
    let [, field, op, rawVal] = m;
    field = field.toLowerCase();
    if (!allowed.has(field)) return { error: `Unsupported field: ${field}` };

    rawVal = rawVal.trim();
    // strip quotes if present
    if ((rawVal.startsWith('"') && rawVal.endsWith('"')) || (rawVal.startsWith("'") && rawVal.endsWith("'"))) {
      rawVal = rawVal.slice(1, -1);
    }

    // type conversion
    let value;
    if (/^(true|false)$/i.test(rawVal)) {
      value = rawVal.toLowerCase() === 'true';
    } else if (/^[+-]?\d+(\.\d+)?$/.test(rawVal)) {
      value = parseFloat(rawVal);
    } else {
      value = rawVal;
    }

    conditions.push({ field, op: op.toLowerCase(), value });
  }

  return { conditions };
}

module.exports = { parseRules };
