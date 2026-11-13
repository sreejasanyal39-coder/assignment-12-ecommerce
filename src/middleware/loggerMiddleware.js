// Custom Redux Middleware to inspect dispatched actions and asynchronous behavior
export const actionLogs = [];
const listeners = new Set();

export const subscribeToActions = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export const customLoggerMiddleware = (storeAPI) => (next) => (action) => {
  const timestamp = new Date().toLocaleTimeString();
  const prevState = storeAPI.getState();
  
  // Forward action to next middleware / reducer
  const result = next(action);
  
  const nextState = storeAPI.getState();
  
  const logEntry = {
    id: Math.random().toString(36).substring(2, 9),
    timestamp,
    type: action.type,
    payload: action.payload,
    prevState,
    nextState,
  };
  
  // Keep last 40 logs
  actionLogs.unshift(logEntry);
  if (actionLogs.length > 40) actionLogs.pop();
  
  // Notify UI subscribers
  listeners.forEach(fn => fn(logEntry));
  
  // Also console log for standard devtools inspection
  console.groupCollapsed(`%cRedux Action: ${action.type} @ ${timestamp}`, 'color: #6366f1; font-weight: bold;');
  console.log('%cPrev State:', 'color: #94a3b8;', prevState);
  console.log('%cAction:', 'color: #38bdf8;', action);
  console.log('%cNext State:', 'color: #22c55e;', nextState);
  console.groupEnd();
  
  return result;
};

