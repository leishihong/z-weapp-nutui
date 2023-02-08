export type PopupPlacement = "top" | "right" | "bottom" | "left"

export type PopupClosePlacement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export interface IFooterBtnList {
  title: string;
  type?: any;
  btnCls?: string;
  onClick?: () => void;
}