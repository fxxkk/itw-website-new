import type { GlobalConfig } from 'payload/types'

import link from '../fields/link'

import { CollectionConfig } from 'payload/types';

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'copyright',
      label: 'Copyright',
      type: 'text',
    },
    {
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
}

const FooterLinks: CollectionConfig = {
  slug: 'footer-links',
  fields: [
    {
      name: 'link',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'textColor',
      type: 'text',  // Ändere den Typ zu 'text'
      required: true,
      label: 'Textfarbe (Hex-Wert)',
      validate: (value) => {
        const isValidHex = /^#([0-9A-F]{3}){1,2}$/i.test(value);
        if (!isValidHex) {
          return 'Bitte geben Sie einen gültigen Hex-Wert für die Farbe ein.';
        }
        return true;
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',  // Ändere den Typ zu 'text'
      required: true,
      label: 'Hintergrundfarbe (Hex-Wert)',
      validate: (value, { textColor }) => {
        const isValidHex = /^#([0-9A-F]{3}){1,2}$/i.test(value);
        if (!isValidHex) {
          return 'Bitte geben Sie einen gültigen Hex-Wert für die Farbe ein.';
        }
        if (value === textColor) {
          return 'Die Hintergrundfarbe darf nicht mit der Textfarbe übereinstimmen.';
        }
        return true;
      },
    },
  ],
};

export default FooterLinks;