import { useEffect, useState } from 'react'
import { motion, useAnimation, Variants, AnimationControls } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export const animationVariants = {
  Visible: 'visible',
  Hidden: 'hidden'
}

interface ScrollAnimatedDivProps {
  children: React.ReactNode;
  variants: Variants;
  initial: string;
  inViewCallback: (control: AnimationControls) => void;
  containerClassName: string;
  renderOnce?: boolean;
}

export const ScrollAnimatedDiv = ({
  variants,
  initial = animationVariants.Hidden,
  inViewCallback,
  children,
  containerClassName,
  renderOnce = true
}: ScrollAnimatedDivProps) => {
  const animationControl = useAnimation()

  const [oncePerMount, setOncePerMount] = useState(false)

  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView && !oncePerMount) {
      setOncePerMount(renderOnce)

      inViewCallback(animationControl)
    }
  }, [animationControl, inView])

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial={initial}
      animate={animationControl}
      className={containerClassName}>
      {children}
    </motion.div>
  )
}
