import { FC, forwardRef } from 'react';
import styles from '@/styles/components/View.module.scss'
import DefaultHead from './DefaultHead';

interface View {
  header: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
  headTitle?: string;
}

export const View = forwardRef<HTMLDivElement, View>(({
  header,
  footer,
  children,
  headTitle
}, ref) => {
  return (
    <>
      <DefaultHead title={headTitle} />
      <div ref={ref} className={styles.root}>
        {header}
        {children}
        {footer}
      </div>
    </>
  )
})

View.displayName = 'View'