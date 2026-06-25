import { useState, useEffect, useCallback } from 'react';
import { Plus, RefreshCw, CheckSquare, ListTodo, AlertCircle } from 'lucide-react';
import { tasksApi } from './api/tasks';
import { TaskCard } from './components/TaskCard';
import { TaskModal } from './components/TaskModal';
import { SettingsBar } from './components/SettingsBar';
import { ToastContainer } from './components/Toast';
import { useToast } from './hooks/useToast';
import styles from './App.module.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [modal, setModal] = useState(null); // null | { mode: 'create' | 'edit', task?: object }
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'done'
  const { toasts, addToast, removeToast } = useToast();

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tasksApi.list();
      setTasks(Array.isArray(data) ? data : data ? [data] : []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  async function handleSave(payload) {
    setSaving(true);
    try {
      if (modal.mode === 'create') {
        const created = await tasksApi.create(payload);
        if (created?.id != null) {
          setTasks(prev => [created, ...prev]);
        } else {
          await loadTasks();
        }
        addToast('Task created');
      } else {
        const id = modal.task.id;
        await tasksApi.update(id, payload);
        setTasks(prev => prev.map(t => t.id === id ? { ...t, ...payload } : t));
        addToast('Task updated');
      }
      setModal(null);
    } catch (e) {
      addToast(e.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(task) {
    const updated = { title: task.title, content: task.content, is_done: !task.is_done };
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, is_done: !t.is_done } : t));
    try {
      await tasksApi.update(task.id, updated);
    } catch (e) {
      setTasks(prev => prev.map(t => t.id === task.id ? task : t));
      addToast(e.message, 'error');
    }
  }

  async function handleDelete(id) {
    setDeletingId(id);
    try {
      await tasksApi.delete(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      addToast('Task deleted');
    } catch (e) {
      addToast(e.message, 'error');
    } finally {
      setDeletingId(null);
    }
  }

  const filtered = tasks.filter(t => {
    if (filter === 'active') return !t.is_done;
    if (filter === 'done') return t.is_done;
    return true;
  });

  const doneCount = tasks.filter(t => t.is_done).length;
  const activeCount = tasks.length - doneCount;

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <CheckSquare size={20} strokeWidth={2} />
          <span>Task Manager</span>
        </div>
        <SettingsBar onUrlChange={loadTasks} />
      </header>

      <main className={styles.main}>
        <div className={styles.toolbar}>
          <div className={styles.stats}>
            <span className={styles.statChip}>{activeCount} active</span>
            <span className={styles.statChip}>{doneCount} done</span>
          </div>

          <div className={styles.toolbarRight}>
            <div className={styles.filters} role="group" aria-label="Filter tasks">
              {['all', 'active', 'done'].map(f => (
                <button
                  key={f}
                  className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            <button
              className={styles.iconBtn}
              onClick={loadTasks}
              disabled={loading}
              aria-label="Refresh"
            >
              <RefreshCw size={15} className={loading ? styles.spinning : ''} />
            </button>

            <button
              className={styles.primaryBtn}
              onClick={() => setModal({ mode: 'create' })}
            >
              <Plus size={15} />
              New task
            </button>
          </div>
        </div>

        {error && (
          <div className={styles.errorBanner}>
            <AlertCircle size={15} />
            <span>{error}</span>
            <button onClick={loadTasks}>Retry</button>
          </div>
        )}

        {!error && filtered.length === 0 && (
          <div className={styles.empty}>
            <ListTodo size={36} strokeWidth={1.5} />
            <p>
              {loading
                ? 'Loading tasks…'
                : filter !== 'all'
                  ? `No ${filter} tasks`
                  : 'No tasks yet — create one!'}
            </p>
            {!loading && filter === 'all' && (
              <button
                className={styles.primaryBtn}
                onClick={() => setModal({ mode: 'create' })}
              >
                <Plus size={15} /> New task
              </button>
            )}
          </div>
        )}

        <div className={styles.taskList}>
          {filtered.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onEdit={t => setModal({ mode: 'edit', task: t })}
              onDelete={handleDelete}
              deleting={deletingId === task.id}
            />
          ))}
        </div>
      </main>

      {modal && (
        <TaskModal
          task={modal.task}
          onSave={handleSave}
          onClose={() => setModal(null)}
          loading={saving}
        />
      )}

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
