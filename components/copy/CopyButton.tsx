import { Button } from '@chakra-ui/react'
import type { BoxProps, ButtonProps } from '@chakra-ui/react'

import { CustomIcon } from '@/components/icon/CustomIcon'

import { CopyTemplate } from './CopyTemplate'

interface CopyButtonProps extends ButtonProps {
  isDisable?: boolean
  value: string
  copyLabel?: string
  hasIcon?: boolean
  buttonText?: string
  iconGap?: number
  w?: BoxProps['width']
}

export const CopyButton = ({
  isDisable,
  value,
  size = 'sm',
  copyLabel,
  hasIcon = true,
  variant = 'outline-accent',
  buttonText = 'Copy',
  ml,
  w,
  iconGap,
  ...buttonProps
}: CopyButtonProps) => (
  <CopyTemplate
    value={value}
    copyLabel={copyLabel}
    isDisabled={isDisable}
    ml={ml}
    w={w}
    triggerElement={
      <Button
        w={w}
        isDisabled={isDisable}
        variant={variant}
        size={size}
        float='right'
        {...buttonProps}
        borderRadius={size === 'xs' ? 6 : 8}
        color='gray.400'
      >
        {hasIcon && (
          <CustomIcon
            name='copy'
            boxSize={size === 'xs' ? 3 : 4}
            mr={iconGap}
          />
        )}
        {buttonText}
      </Button>
    }
  />
)
