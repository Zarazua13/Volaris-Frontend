import { useState } from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ScrollArea } from './ui/scroll-area'

interface LocationCombobox {
  label: string
  value: string
}

interface Props {
 locations: LocationCombobox[] 
 location: string,
 setLocation: (location: string) => void
}

export function LocationsCombobox ({ locations = [], location, setLocation }:Props) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {location
            ? locations.find(l => l.value === location)?.label
            : 'Buscar ubicación...'}
          <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Buscar ubicación...' className='h-9' />
          <ScrollArea className='h-96'>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {locations.map(l => (
                <CommandItem
                  key={l.value}
                  value={l.value}
                  onSelect={() => {
                    setLocation(location === l.value ? '' : l.value)
                    setOpen(false)
                  }}
                >
                  {l.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      location === l.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
