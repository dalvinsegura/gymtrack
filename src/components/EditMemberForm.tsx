
import React, { useState } from 'react';
import { useMembers } from '../hooks/useMembers';
import { Member, PLAN_TYPES } from '../types/member';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface EditMemberFormProps {
  member: Member;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditMemberForm = ({ member, onSuccess, onCancel }: EditMemberFormProps) => {
  const { updateMember, assignPlan } = useMembers();
  const [formData, setFormData] = useState({
    name: member.name,
    email: member.email,
    phone: member.phone,
    birthDate: member.birthDate,
    emergencyContact: member.emergencyContact,
    emergencyPhone: member.emergencyPhone,
    address: member.address,
  });
  const [selectedPlan, setSelectedPlan] = useState(
    PLAN_TYPES.find(p => p.name === member.plan.name)?.id || ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Update member data
      updateMember(member.id, formData);
      
      // Update plan if changed
      const currentPlanType = PLAN_TYPES.find(p => p.name === member.plan.name);
      if (selectedPlan && currentPlanType?.id !== selectedPlan) {
        assignPlan(member.id, selectedPlan);
      }
      
      toast.success('Miembro actualizado exitosamente');
      onSuccess();
    } catch (error) {
      toast.error('Error al actualizar el miembro');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Editar Miembro: {member.name}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Nombre Completo *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="email">Correo Electrónico *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Teléfono *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="birthDate">Fecha de Nacimiento *</Label>
            <Input
              id="birthDate"
              name="birthDate"
              type="date"
              required
              value={formData.birthDate}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="emergencyContact">Contacto de Emergencia *</Label>
            <Input
              id="emergencyContact"
              name="emergencyContact"
              type="text"
              required
              value={formData.emergencyContact}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="emergencyPhone">Teléfono de Emergencia *</Label>
            <Input
              id="emergencyPhone"
              name="emergencyPhone"
              type="tel"
              required
              value={formData.emergencyPhone}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="address">Dirección *</Label>
          <Input
            id="address"
            name="address"
            type="text"
            required
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label>Plan de Membresía</Label>
          <Select value={selectedPlan} onValueChange={setSelectedPlan}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Selecciona un plan" />
            </SelectTrigger>
            <SelectContent>
              {PLAN_TYPES.map((plan) => (
                <SelectItem key={plan.id} value={plan.id}>
                  {plan.name} - ${plan.price} ({plan.duration} {plan.duration === 1 ? 'mes' : 'meses'})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Información del Plan Actual</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Plan:</strong> {member.plan.name}</p>
            <p><strong>Precio:</strong> ${member.plan.price}</p>
            <p><strong>Inicio:</strong> {new Date(member.plan.startDate).toLocaleDateString()}</p>
            <p><strong>Vencimiento:</strong> {new Date(member.plan.endDate).toLocaleDateString()}</p>
            <p><strong>Estado:</strong> {member.status}</p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            {isSubmitting ? 'Actualizando...' : 'Actualizar Miembro'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditMemberForm;
