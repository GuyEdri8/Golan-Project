'use client'
import OverviewLayout from "../OverviewLayout";
import { useProject } from "@/components/ProjectContext";
import { Button } from "@/components/ui/button";
import { Check, X, Pencil, Trash2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { columns, Funding } from "./columns";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TableCell } from "@/components/ui/table";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ComboboxDemo } from "./combobox";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

type FundingInProject = {
  id: string,
  project_id: number
  funding_source_id:number,
  allocated_amount: number,
  allocated_date: Date,
}
export default function ProjectContact({project, fundings} : {project: any, fundings: any}) {
    console.log(fundings);
    const router = useRouter();
    const queryClient = useQueryClient();
    const {editMode, setEditMode, editing} = useProject();
    const [selected, setSelected] = useState<any>('');
    const [contactEmail, setContactEmail] = useState(project.contact_email);
    const [contactPhone, setContactPhone] = useState(project.contact_phone);

    const updateProjectMutation = useMutation({
        mutationFn: async (data: { contact_email: string, contact_phone: string }) => {
            const response = await fetch(`/api/projects/${project.id}`, {
                method: 'PATCH',
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        },
        onSuccess: () => {
            setEditMode(null);
            queryClient.invalidateQueries({ queryKey: ['project', project.id] });
            router.refresh();
        }
    });

    const handleProjectEdit = () => {
        updateProjectMutation.mutate({ 
            contact_email: contactEmail, 
            contact_phone: contactPhone 
        });
    }

    const handleCancelProjectEdit = () => {
        setEditMode(null);
    }

    const header = (
        <div className="flex justify-between w-full">
            <p>מקורות מימון חיצוניים</p>
            {editMode !== 'contact' ?  
            <>
                <FundingDialog  projectId={project.id} fundingProcess={fundings}/>
            </> :(
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={handleCancelProjectEdit}>
                      <X className="ml-2 h-2 w-2" />
                  </Button>
                  <Button variant="ghost" onClick={handleProjectEdit}>
                    <Check className="ml-2 h-2 w-2" />
                  </Button>
                </div>
            )}
        </div>
    )
    return (
        <OverviewLayout header={editing ? header : "מקורות מימון חיצוניים"}>
                <>
                    <DataTable label={'בחר מקור מימון'} columns={columns} data={fundings} setSelected={setSelected} setGlobalSerc={setContactEmail} GlobalSerc={selected}/>
                </>
        </OverviewLayout>
    )
}




export function FundingDialog({projectId, fundingProcess}: {projectId: string | null, fundingProcess: any}) {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const [newFundingAdded, setNewFundingAdded] = useState<FundingInProject | null>(null);
  const [arrFundings, setArrFundings] = useState<FundingInProject[]>(fundingProcess);

  // Query to fetch funding sources
  const { data: fundings = [], isLoading } = useQuery({
    queryKey: ['fundings'],
    queryFn: async () => {
      const response = await fetch('/api/funding-sources');
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    }
  });

  // Mutation to update fundings
  const updateFundingsMutation = useMutation({
    mutationFn: async (data: { milestones: { milestones: any[] } }) => {
      if (!projectId) throw new Error('No project ID');
      const response = await fetch(`/api/projects/${projectId}/update`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fundings'] });
      setEditingId(null);
      setIsDialogOpen(false);
      router.refresh();
    }
  });

  const handleSave = () => {
    updateFundingsMutation.mutate({
      milestones: {
        milestones: fundings
      }
    });
  };

  const editingFunding = editingId ? arrFundings.find(m => m.id === editingId) || null : null;

  const updateEditingFunding = (updates: Partial<FundingInProject>) => {
    if (!editingId) return;
    setArrFundings(prev => prev.map(m => 
      m.id === editingId ? { ...m, ...updates } : m
    ));
  };

  const handleFundingSourceSelect = (sourceId: string) => {
    if (!editingId) return;
    const selectedFunding = fundings.find(f => f.id.toString() === sourceId);
    if (selectedFunding) {
      updateEditingFunding({ 
        funding_source_id: parseInt(sourceId)
      });
    }
  };

  const handleSaveMileStone = () => {
    setNewFundingAdded(null);
    setEditingId(null);
  };

  const handleCancelNewMilestone = () => {
    setNewFundingAdded(null);
    setArrFundings(arrFundings.filter((m) => m.id !== newFundingAdded?.id));
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setArrFundings(arrFundings.filter((m) => m.id !== id));
  };

  const aviailableFundings = fundings.filter((f: any) => {
    if (editingId === newFundingAdded?.id) {
      return true;
    }
    return !arrFundings.some((m: any) => 
      m.funding_source_id === f.id && m.id !== editingId
    );
  });

  const addNewFunding = () => {
    const newFunding: FundingInProject = {
      id: uuidv4(),
      project_id: parseInt(projectId),
      funding_source_id: 0,
      allocated_amount: 0,
      allocated_date: new Date(),
    };
    setNewFundingAdded(newFunding);
    setArrFundings([...arrFundings, newFunding]);
    setEditingId(newFunding.id);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div dir="rtl">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <Pencil className="h-4 w-4 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-right">ניהול מקורות מימון חיצוניים</DialogTitle>
            <DialogDescription className="text-right">ערוך, הוסף או מחק מקורות מימון חיצוניים לפרויקט.</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
          <div>
    <Button onClick={addNewFunding} className="mb-4">
      <Plus className="h-4 w-4 ml-2" />
      הוסף מקור מימון חיצוני
    </Button>

                {/* We'll wrap the table in a container with fixed height and overflow settings */}
                <div className="border rounded-md">
                  {/* This div controls the scrolling behavior */}
                  <div className="max-h-[150px] overflow-y-auto">
                    <Table>
                      {/* We keep the header fixed by making it sticky */}
                      <TableHeader className="sticky top-0 bg-white z-10">
                        <TableRow>
                          <TableHead className="text-right">מקור המימון</TableHead>
                          <TableHead className="text-right">סכום</TableHead>
                          <TableHead className="text-right">פעולות</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {arrFundings.map((funding) => (
                          <TableRow key={funding.id}>
                            <TableCell>{fundings.find(f => f.id.toString() === funding.funding_source_id.toString())?.source_name}</TableCell>
                            <TableCell>{funding.allocated_amount}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setEditingId(funding.id)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDelete(funding.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

            {editingFunding && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">
                  {editingFunding.id === newFundingAdded?.id ? "הוספת מקור מימון חיצוני חדש" : "עריכת מקור מימון חיצוני"}
                </h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label htmlFor="title">בחר מקור מימון חיצוני</label>
                    <ComboboxDemo 
                      items={aviailableFundings.map(el => ({
                        value: el.id.toString(),
                        label: el.source_name 
                      }))} 
                      name="מקור מימון חיצוני"
                      onSelect={handleFundingSourceSelect}
                      initialValue={editingFunding.funding_source_id?.toString()}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>סכום</label>
                    <Input 
                      type="number" 
                      value={editingFunding.allocated_amount} 
                      onChange={(e) => updateEditingFunding({ allocated_amount: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button onClick={handleCancelNewMilestone} variant="outline">
                      ביטול
                    </Button>
                    <Button onClick={handleSaveMileStone}>עדכן שינויים</Button>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t pt-6 flex justify-center">
              <Button onClick={handleSave}>שמור שינויים</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
