"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDashStore } from "@/app/states/dashboard";

export default function GenderFilter() {
  const { setFilters, filters } = useDashStore();
  const handleGenderChange = (value: string) => {
    setFilters({
      ...filters,
      gender: parseInt(value),
    });
  };
  return (
    <Select onValueChange={handleGenderChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Gender</SelectLabel>
          <SelectItem value="1">Male</SelectItem>
          <SelectItem value="0">Female</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
