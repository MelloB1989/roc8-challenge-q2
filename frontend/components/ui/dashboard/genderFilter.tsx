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

export default function GenderFilter() {
  return (
    <Select>
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
