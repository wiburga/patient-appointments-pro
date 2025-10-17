import { useEffect, useState } from "react";
import { AuthGuard } from "@/components/AuthGuard";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Filter } from "lucide-react";
import { z } from "zod";

const appointmentSchema = z.object({
  patient_id: z.string().min(1, "Selecciona un paciente"),
  doctor_id: z.string().min(1, "Selecciona un médico"),
  appointment_date: z.string().min(1, "La fecha es requerida"),
  appointment_time: z.string().min(1, "La hora es requerida"),
  status: z.enum(["scheduled", "completed", "cancelled"]),
  notes: z.string().max(500).optional(),
});

type Appointment = {
  id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  notes: string | null;
  patients: { full_name: string } | null;
  doctors: { full_name: string; specialization: string } | null;
};

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [filterDate, setFilterDate] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("");
  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: "",
    appointment_date: "",
    appointment_time: "",
    status: "scheduled" as "scheduled" | "completed" | "cancelled",
    notes: "",
  });

  const fetchData = async () => {
    const [appointmentsRes, patientsRes, doctorsRes] = await Promise.all([
      supabase
        .from("appointments")
        .select("*, patients(full_name), doctors(full_name, specialization)")
        .order("appointment_date", { ascending: false })
        .order("appointment_time", { ascending: true }),
      supabase.from("patients").select("*").order("full_name"),
      supabase.from("doctors").select("*").order("full_name"),
    ]);

    if (appointmentsRes.error) {
      toast({ title: "Error", description: appointmentsRes.error.message, variant: "destructive" });
    } else {
      setAppointments(appointmentsRes.data || []);
    }

    setPatients(patientsRes.data || []);
    setDoctors(doctorsRes.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setFormData({
      patient_id: "",
      doctor_id: "",
      appointment_date: "",
      appointment_time: "",
      status: "scheduled",
      notes: "",
    });
    setEditingAppointment(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      appointmentSchema.parse(formData);

      const dataToSave = {
        patient_id: formData.patient_id,
        doctor_id: formData.doctor_id,
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        status: formData.status,
        notes: formData.notes || null,
      };

      if (editingAppointment) {
        const { error } = await supabase
          .from("appointments")
          .update(dataToSave)
          .eq("id", editingAppointment.id);

        if (error) throw error;
        toast({ title: "Éxito", description: "Cita actualizada" });
      } else {
        const { error } = await supabase.from("appointments").insert([dataToSave]);
        if (error) throw error;
        toast({ title: "Éxito", description: "Cita creada" });
      }

      setIsOpen(false);
      resetForm();
      fetchData();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Error de validación",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    }
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      patient_id: appointment.patient_id,
      doctor_id: appointment.doctor_id,
      appointment_date: appointment.appointment_date,
      appointment_time: appointment.appointment_time,
      status: appointment.status as any,
      notes: appointment.notes || "",
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta cita?")) return;

    const { error } = await supabase.from("appointments").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Éxito", description: "Cita eliminada" });
      fetchData();
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filterDate && apt.appointment_date !== filterDate) return false;
    if (filterDoctor && apt.doctor_id !== filterDoctor) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      scheduled: "default",
      completed: "secondary",
      cancelled: "destructive",
    };
    const labels: Record<string, string> = {
      scheduled: "Programada",
      completed: "Completada",
      cancelled: "Cancelada",
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Citas</h1>
              <p className="text-muted-foreground mt-2">Gestión de citas médicas</p>
            </div>
            <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nueva Cita
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingAppointment ? "Editar Cita" : "Nueva Cita"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient_id">Paciente *</Label>
                    <Select
                      value={formData.patient_id}
                      onValueChange={(value) => setFormData({ ...formData, patient_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un paciente" />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor_id">Médico *</Label>
                    <Select
                      value={formData.doctor_id}
                      onValueChange={(value) => setFormData({ ...formData, doctor_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un médico" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id}>
                            {doctor.full_name} - {doctor.specialization}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointment_date">Fecha *</Label>
                    <Input
                      id="appointment_date"
                      type="date"
                      value={formData.appointment_date}
                      onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointment_time">Hora *</Label>
                    <Input
                      id="appointment_time"
                      type="time"
                      value={formData.appointment_time}
                      onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Estado</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scheduled">Programada</SelectItem>
                        <SelectItem value="completed">Completada</SelectItem>
                        <SelectItem value="cancelled">Cancelada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notas</Label>
                    <Input
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {editingAppointment ? "Actualizar" : "Crear"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="filter_date">Fecha</Label>
                <Input
                  id="filter_date"
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="filter_doctor">Médico</Label>
                <Select value={filterDoctor} onValueChange={setFilterDoctor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        {doctor.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilterDate("");
                    setFilterDoctor("");
                  }}
                >
                  Limpiar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Citas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Médico</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">
                        {appointment.patients?.full_name || "-"}
                      </TableCell>
                      <TableCell>
                        {appointment.doctors?.full_name || "-"}
                        <br />
                        <span className="text-sm text-muted-foreground">
                          {appointment.doctors?.specialization}
                        </span>
                      </TableCell>
                      <TableCell>{appointment.appointment_date}</TableCell>
                      <TableCell>{appointment.appointment_time}</TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(appointment)}
                          className="mr-2"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(appointment.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </AuthGuard>
  );
};

export default Appointments;
