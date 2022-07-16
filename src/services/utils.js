import { isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const toastErrorNotification = {
  show(customText, error) {
    customText += error?.status ? ` Code: ${error.status}.` : '';
    customText += error?.data ? ` Message: ${JSON.stringify(error.data)}.` : '';

    const toastId = toast.error(customText, {
      toastId: `id-${customText.length}-${error?.status ?? 1}`,
    });
    return toastId;
  },
  hide(toastId) {
    toast.dismiss(toastId);
  },
};

const rtkQueryErrorLogger = _ => next => action => {
  if (isRejectedWithValue(action)) {
    toastErrorNotification.show('Error server connection.', action.payload);
  }

  return next(action);
};

export { toastErrorNotification, rtkQueryErrorLogger };
