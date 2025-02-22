import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Department } from "../columns"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export function SelectDepartment({ departments, selectedDep
 }: { departments: Department[], selectedDep: number }) {
  const router = useRouter();
  const [selectedDepartment, setSelectedDepartment] = useState<string>(selectedDep.toString());
  const [selectedDepartmentName, setSelectedDepartmentName] = useState<string>("בחר מחלקה");


  useEffect(() => {
    setSelectedDepartment(selectedDep.toString());
    const department = departments.find(d => d.id === selectedDep);
    if (department) {
      setSelectedDepartmentName(department.department_name + " " + department.project_type);
    }
  }, [selectedDep, departments]);

  const handleValueChange = (value: string) => {
    setSelectedDepartment(value);
    const department = departments.find(d => d.id.toString() === value);
    if (department) {
      setSelectedDepartmentName(department.department_name + " " + department.project_type  );
    }
    router.push(`/projects?department_id=${value}`);
  };

  return (
      <Select value={selectedDepartment} onValueChange={handleValueChange}>
        <SelectTrigger dir="rtl" className="w-full">
          <SelectValue placeholder="בחר מחלקה">
            {selectedDepartmentName}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup dir="rtl">
            {departments.sort((a, b) => a.department_name.localeCompare(b.department_name)).map((department) => (
              <SelectItem 
                dir="rtl" 
                key={department.id} 
                value={department.id.toString()}
              >
                {department.department_name} {department.project_type}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
  )
}