import { useState } from 'react';
import { parseURLComponents } from '../utils/diffUtils';
import '../styles/UrlDiffTool.css';

export const UrlDiffTool: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState<string>('https://example.com/old-path');
  const [newUrl, setNewUrl] = useState<string>('');
  const [showDiff, setShowDiff] = useState<boolean>(false);

  const handleUpdateUrl = () => {
    if (newUrl.trim()) {
      if (newUrl !== currentUrl) {
        setShowDiff(true);
      } else {
        alert('The new URL is the same as the current URL. No changes to display.');
        setShowDiff(false);
      }
    } else {
      alert('Please enter a new URL.');
    }
  };

  const handleConfirmUpdate = () => {
    setCurrentUrl(newUrl);
    setNewUrl('');
    setShowDiff(false);
  };

  const handleReset = () => {
    setNewUrl('');
    setShowDiff(false);
  };

  return (
    <div className="url-diff-tool">
      <div className="container">
        <h1>URL Diff Tool</h1>

        <div className="input-section">
          <div className="url-display">
            <label>Current URL:</label>
            <div className="url-box current">{currentUrl}</div>
          </div>

          <div className="url-input">
            <label htmlFor="new-url">New URL:</label>
            <input
              id="new-url"
              type="text"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="Enter a new URL to compare"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleUpdateUrl();
                }
              }}
            />
          </div>

          <div className="button-group">
            <button
              onClick={handleUpdateUrl}
              className="btn btn-primary"
              disabled={!newUrl.trim()}
            >
              Compare URLs
            </button>
            {showDiff && (
              <>
                <button
                  onClick={handleConfirmUpdate}
                  className="btn btn-success"
                >
                  Apply Changes
                </button>
                <button
                  onClick={handleReset}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {showDiff && newUrl.trim() && (
          <div className="diff-section">
            <h2>URL Comparison</h2>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>URL 1</th>
                  <th>URL 2</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {parseURLComponents(currentUrl, newUrl).map((component, index) => (
                  <tr
                    key={index}
                    className={component.isSame ? 'row-same' : 'row-different'}
                  >
                    <td className="param-name">{component.name}</td>
                    <td className={`param-value ${component.isSame ? 'value-same' : 'value-different'}`}>
                      {component.value1 || '—'}
                    </td>
                    <td className={`param-value ${component.isSame ? 'value-same' : 'value-different'}`}>
                      {component.value2 || '—'}
                    </td>
                    <td className={`status ${component.isSame ? 'status-same' : 'status-different'}`}>
                      {component.isSame ? 'Same' : 'Different'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
