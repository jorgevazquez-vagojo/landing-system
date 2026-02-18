export type TriggerType = 'exit_intent' | 'scroll_percent' | 'time_delay' | 'click' | 'page_load';

export interface PopupTrigger {
  type: TriggerType;
  value?: number;
  selector?: string;
}

export interface PopupConfig {
  id: string;
  type: 'MODAL' | 'SLIDE_IN' | 'STICKY_BAR' | 'FULLSCREEN';
  content: {
    title?: string;
    body?: string;
    ctaText?: string;
    ctaUrl?: string;
    image?: string;
    formFields?: string[];
  };
  style: {
    backgroundColor?: string;
    textColor?: string;
    ctaColor?: string;
    position?: 'center' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    overlay?: boolean;
    borderRadius?: string;
    maxWidth?: string;
  };
  triggers: PopupTrigger[];
  targeting: {
    showOnce?: boolean;
    frequency?: 'once' | 'session' | 'always';
    excludePages?: string[];
    includePages?: string[];
    devices?: ('desktop' | 'tablet' | 'mobile')[];
  };
}

export function shouldShowPopup(popupId: string, targeting: PopupConfig['targeting']): boolean {
  if (typeof window === 'undefined') return false;

  const freq = targeting.frequency || 'once';
  if (freq === 'once') {
    const shown = document.cookie.includes(`ls_popup_${popupId}=shown`);
    if (shown) return false;
  } else if (freq === 'session') {
    const shown = sessionStorage.getItem(`ls_popup_${popupId}`);
    if (shown) return false;
  }

  if (targeting.devices && targeting.devices.length > 0) {
    const width = window.innerWidth;
    const device = width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop';
    if (!targeting.devices.includes(device)) return false;
  }

  return true;
}

export function markPopupShown(popupId: string, frequency: string): void {
  if (typeof window === 'undefined') return;
  if (frequency === 'once') {
    document.cookie = `ls_popup_${popupId}=shown;path=/;max-age=${30 * 24 * 60 * 60};SameSite=Lax`;
  } else if (frequency === 'session') {
    sessionStorage.setItem(`ls_popup_${popupId}`, 'shown');
  }
}
