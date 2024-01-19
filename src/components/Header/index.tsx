import * as Dialog from '@radix-ui/react-dialog'
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

import logoImg from '../../assets/logo.svg'
import { TransactionContext } from '../../contexts/TransactionsContext'
import { NewTransactionModal } from '../NewTransactionModal'
import { useContextSelector } from 'use-context-selector'

export function Header() {
  const [open, closedModal] = useContextSelector(
    TransactionContext,
    (context) => {
      return [context.open, context.closedModal]
    },
  )

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root open={open} onOpenChange={closedModal}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
