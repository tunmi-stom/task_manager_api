import { CheckCircle, AlertCircle, X } from 'lucide-react';
import styles from './Toast.module.css';

export function ToastContainer({ toasts, onRemove }) {
  return (
    <div className={styles.container} role="status" aria-live="polite">
      {toasts.map(toast => (
        <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.type === 'success'
            ? <CheckCircle size={15} />
            : <AlertCircle size={15} />}
          <span>{toast.message}</span>
          <button
            className={styles.close}
            onClick={() => onRemove(toast.id)}
            aria-label="Dismiss"
          >
            <X size={13} />
          </button>
        </div>
      ))}
    </div>
  );
}
