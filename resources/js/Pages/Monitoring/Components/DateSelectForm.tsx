"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/Components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"
import { Link, router } from "@inertiajs/react"

const FormSchema = z.object({
  month: z.number().optional(),
  year: z.number().optional(),
})

export function DateSelectForm({availableYears}: {availableYears: number[]}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        month: undefined,
        year: undefined,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("change date")
    router.get(route("monitoring.index", ));
  }

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 mt-1 me-1">
        {/* Year Field */}
        <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
                <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value ? field.value.toString() : ""}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {availableYears.map((year, index) => (
                        <SelectItem key={index + 1} value={year.toString()}>
                            {year}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
        />

        {/* Month Field */}
        <FormField
          control={form.control}
          name="month"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value ? field.value.toString() : ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {months.map((month, index) => (
                    <SelectItem key={index + 1} value={month} onClick={() => form.handleSubmit(onSubmit)()}>
                        {month}
                    </SelectItem>
                ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
