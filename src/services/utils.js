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

export { toastErrorNotification };
