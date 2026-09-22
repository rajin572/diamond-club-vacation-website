export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
  isItalic?: boolean;
}

export interface NavFooterColumn {
  id: string;
  title: string;
  links: {
    label: string;
    href: string;
    isExternal?: boolean;
  }[];
}

export interface InquireButtonProps {
  className?: string;
  label?: string;
  openInNewTab?: boolean;
  onClick?: () => void;
}

