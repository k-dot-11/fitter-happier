"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const workoutTypes = [
    {
        value: "cardio",
        label: "Cardio",
    },
    {
        value: "strength",
        label: "Strength Training",
    },
    {
        value: "flexibility",
        label: "Flexibility",
    },
    {
        value: "balance",
        label: "Balance",
    },
    {
        value: "hiit",
        label: "HIIT",
    },
];


export function Combobox({handleValueChange , value}: {handleValueChange: (value: string) => void , value : string}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild >
        <Button
          variant="outline" 

          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {value
            ? workoutTypes.find((framework) => framework.value === value)?.label
            : "Select workout type..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search workout..." className="h-9" />
          <CommandList>
            <CommandEmpty>No workout found.</CommandEmpty>
            <CommandGroup>
              {workoutTypes.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    handleValueChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
