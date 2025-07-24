
import { toast } from 'react-toastify';

const notify = {
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
  info: (msg) => toast.info(msg),
  warn: (msg) => toast.warn(msg),
  custom: (msg, options) => toast(msg, options),
};

export default notify;