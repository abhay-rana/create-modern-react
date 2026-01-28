import toast from 'react-hot-toast';

type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

// Track the current toast ID to dismiss before showing new one
let currentToastId: string | undefined;

/**
 * Alertify Service - Wrapper around react-hot-toast
 * Auto-dismisses previous toast before showing new one
 *
 * @example
 * Alertify.success('User created successfully');
 * Alertify.error('Failed to save changes');
 * Alertify.info('Please wait...');
 */
export const Alertify = {
  /**
   * Show a success toast
   */
  success(message: string, position: ToastPosition = 'bottom-right') {
    if (currentToastId) {
      toast.dismiss(currentToastId);
    }
    currentToastId = toast.success(message, { position });
    return currentToastId;
  },

  /**
   * Show an error toast
   */
  error(message: string, position: ToastPosition = 'bottom-right') {
    if (currentToastId) {
      toast.dismiss(currentToastId);
    }
    currentToastId = toast.error(message, { position });
    return currentToastId;
  },

  /**
   * Show an info toast (default style)
   */
  info(message: string, position: ToastPosition = 'bottom-right') {
    if (currentToastId) {
      toast.dismiss(currentToastId);
    }
    currentToastId = toast(message, {
      position,
      icon: 'ℹ️',
    });
    return currentToastId;
  },

  /**
   * Show a loading toast (returns a function to update/dismiss it)
   */
  loading(message: string, position: ToastPosition = 'bottom-right') {
    if (currentToastId) {
      toast.dismiss(currentToastId);
    }
    currentToastId = toast.loading(message, { position });
    return {
      id: currentToastId,
      success: (successMessage: string) => {
        toast.success(successMessage, { id: currentToastId });
      },
      error: (errorMessage: string) => {
        toast.error(errorMessage, { id: currentToastId });
      },
      dismiss: () => {
        toast.dismiss(currentToastId);
      },
    };
  },

  /**
   * Dismiss all toasts
   */
  dismissAll() {
    toast.dismiss();
    currentToastId = undefined;
  },

  /**
   * Dismiss a specific toast
   */
  dismiss(toastId?: string) {
    toast.dismiss(toastId || currentToastId);
    if (!toastId || toastId === currentToastId) {
      currentToastId = undefined;
    }
  },
};

export default Alertify;
