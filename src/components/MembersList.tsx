
import React, { useState } from 'react';
import { useMembers } from '../hooks/useMembers';
import { Member, MembershipStatus } from '../types/member';
import { Edit, Trash2, Calendar, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface MembersListProps {
  onEdit: (member: Member) => void;
}

const MembersList = ({ onEdit }: MembersListProps) => {
  const { members, deleteMember, updateMemberStatus } = useMembers();
  const [filter, setFilter] = useState<string>('all');

  const getStatusBadge = (status: MembershipStatus) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      expired: 'bg-red-100 text-red-800',
      suspended: 'bg-gray-100 text-gray-800',
    };

    const labels = {
      active: 'Activa',
      expired: 'Vencida',
      suspended: 'Suspendida',
    };

    return (
      <Badge className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const handleDelete = async (id: string, memberName: string) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${memberName}?`)) {
      try {
        deleteMember(id);
        toast.success('Miembro eliminado exitosamente');
      } catch (error) {
        toast.error('Error al eliminar el miembro');
      }
    }
  };

  const handleStatusChange = (memberId: string, newStatus: MembershipStatus) => {
    try {
      updateMemberStatus(memberId, newStatus);
      toast.success('Estado actualizado exitosamente');
    } catch (error) {
      toast.error('Error al actualizar el estado');
    }
  };

  const filteredMembers = members.filter(member => {
    if (filter === 'all') return true;
    return member.status === filter;
  });

  const isExpiringSoon = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Lista de Miembros ({filteredMembers.length})
          </h2>
          <div className="flex items-center space-x-4">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="expired">Vencidos</SelectItem>
                <SelectItem value="suspended">Suspendidos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Miembro
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vencimiento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {member.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {member.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {member.phone}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{member.plan.name}</div>
                  <div className="text-sm text-gray-500">${member.plan.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-2">
                    {getStatusBadge(member.status)}
                    <Select
                      value={member.status}
                      onValueChange={(value: MembershipStatus) => 
                        handleStatusChange(member.id, value)
                      }
                    >
                      <SelectTrigger className="w-32 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Activa</SelectItem>
                        <SelectItem value="expired">Vencida</SelectItem>
                        <SelectItem value="suspended">Suspendida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(member.plan.endDate).toLocaleDateString()}
                  </div>
                  {isExpiringSoon(member.plan.endDate) && (
                    <div className="text-xs text-orange-600 font-medium">
                      ¡Vence pronto!
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(member)}
                      className="hover:bg-yellow-50 hover:border-yellow-300"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(member.id, member.name)}
                      className="hover:bg-red-50 hover:border-red-300 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              No hay miembros para mostrar
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersList;
