import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import styles from './TaskModal.module.css';

export function TaskModal({ task, onSave, onClose, loading }) {
  const isEdit = !!task?.id;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isDone, setIsDone] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    setTitle(task?.title ?? '');
    setContent(task?.content ?? '');
    setIsDone(task?.is_done ?? false);
    setTimeout(() => titleRef.current?.focus(), 50);
  }, [task]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) { titleRef.current?.focus(); return; }
    onSave({ title: title.trim(), content: content.trim() || null, is_done: isDone });
  }

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdrop} role="dialog" aria-modal="true" aria-label={isEdit ? 'Edit task' : 'New task'}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{isEdit ? 'Edit task' : 'New task'}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="task-title">Title</label>
            <input
              id="task-title"
              ref={titleRef}
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="task-content">Description</label>
            <textarea
              id="task-content"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Add details (optional)"
              rows={3}
            />
          </div>

          <div className={styles.checkRow}>
            <input
              id="task-done"
              type="checkbox"
              checked={isDone}
              onChange={e => setIsDone(e.target.checked)}
            />
            <label htmlFor="task-done">Mark as done</label>
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.btnCancel} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.btnSubmit} disabled={loading}>
              {loading ? 'Saving…' : isEdit ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
