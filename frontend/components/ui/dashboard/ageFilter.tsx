"use client";
import * as React from "react";
import { useDashStore } from "@/app/states/dashboard";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AgeFilter() {
  const { setFilters, filters } = useDashStore();

  const handleAgeChange = (value: string) => {
    setFilters({
      ...filters,
      age: parseInt(value),
    });
  };

  return (
    <Select onValueChange={handleAgeChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select age" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Age</SelectLabel>
          <SelectItem value="0">15-25</SelectItem>
          <SelectItem value="1">{">25"}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
