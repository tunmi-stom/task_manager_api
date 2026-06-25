import { useState } from 'react';
import { Settings, Check } from 'lucide-react';
import { getBaseUrl, setBaseUrl } from '../api/tasks';
import styles from './SettingsBar.module.css';

export function SettingsBar({ onUrlChange }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(getBaseUrl());

  function save() {
    setBaseUrl(draft);
    onUrlChange();
    setOpen(false);
  }

  return (
    <div className={styles.wrap}>
      <button
        className={styles.trigger}
        onClick={() => { setDraft(getBaseUrl()); setOpen(o => !o); }}
        aria-label="API settings"
      >
        <Settings size={15} />
        <span>{getBaseUrl()}</span>
      </button>

      {open && (
        <div className={styles.popover}>
          <label className={styles.label}>API base URL</label>
          <div className={styles.row}>
            <input
              type="text"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && save()}
              placeholder="http://localhost:8000"
              autoFocus
            />
            <button className={styles.saveBtn} onClick={save} aria-label="Save">
              <Check size={14} />
            </button>
          </div>
          <p className={styles.hint}>Saved to localStorage. Changes reload the task list.</p>
        </div>
      )}
    </div>
  );
}
