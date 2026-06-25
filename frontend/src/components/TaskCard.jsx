import { Check, Pencil, Trash2 } from 'lucide-react';
import styles from './TaskCard.module.css';

export function TaskCard({ task, onToggle, onEdit, onDelete, deleting }) {
  return (
    <div className={`${styles.card} ${task.is_done ? styles.done : ''}`}>
      <button
        className={`${styles.check} ${task.is_done ? styles.checked : ''}`}
        onClick={() => onToggle(task)}
        aria-label={task.is_done ? 'Mark undone' : 'Mark done'}
      >
        {task.is_done && <Check size={11} strokeWidth={3} />}
      </button>

      <div className={styles.body}>
        <p className={styles.title}>{task.title}</p>
        {task.content && <p className={styles.content}>{task.content}</p>}
      </div>

      <div className={styles.meta}>
        <span className={styles.id}>#{task.id}</span>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.actionBtn}
          onClick={() => onEdit(task)}
          aria-label="Edit task"
        >
          <Pencil size={14} />
        </button>
        <button
          className={`${styles.actionBtn} ${styles.danger}`}
          onClick={() => onDelete(task.id)}
          disabled={deleting}
          aria-label="Delete task"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
