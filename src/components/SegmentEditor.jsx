import { useState } from 'react';
import axios from 'axios';

function SegmentEditor({ onResults }) {
  const [rules, setRules] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
    const res = await axios.post('http://localhost:3002/segments/evaluate', {
        conditions: rules
      });
      onResults(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3>Segment Editor</h3>
      <textarea
        rows="5"
        cols="40"
        placeholder={`Example:\nprice > 1000\nstock_status = instock\non_sale = true`}
        value={rules}
        onChange={e => setRules(e.target.value)}
        style={styles.textarea}
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Evaluating...' : 'Submit'}
      </button>
    </div>
  );
}

const styles = {
  container: { margin: '20px 0' },
  textarea: { padding: '8px', fontFamily: 'monospace' }
};

export default SegmentEditor;
