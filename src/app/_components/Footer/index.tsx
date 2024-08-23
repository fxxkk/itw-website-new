import React from 'react'
import Link from 'next/link'

import { Footer as FooterType } from '../../../payload/payload-types'
import { fetchFooter } from '../../_api/fetchGlobals'
import FooterComponent from './FooterComponent'

type FooterProps = {
  footerLinks: {
    id: string;
    url: string;
    link: string;
    textColor: string;
    backgroundColor: string;
  }[];
};

export async function Footer({ footerLinks }: FooterProps) {
    // Sicherstellen, dass footerLinks existiert und ein Array ist
  if (!footerLinks || footerLinks.length === 0) {
    return null; // oder eine alternative Komponente wie ein Ladeindikator
  }
  let footer: FooterType | null = null

  try {
    footer = await fetchFooter()
  } catch (error) {
    console.log(error)
  }

  const navItems = footer?.navItems || []

  return (
    <>
      <FooterComponent footer={footer} />
      {footerLinks.map((link) => (
        <a
          key={link.id}
          href={link.url}
          style={{
            color: link.textColor,
            backgroundColor: link.backgroundColor,
            padding: '10px',
            textDecoration: 'none',
          }}
        >
          {link.link}
        </a>
      ))}
    </>
  )
}
